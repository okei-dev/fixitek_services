from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin
)
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import timedelta
from django.utils.timezone import now
from app.pagination import DefaultPagination
from .models import Cart, CartItem, Category, Customer, OrderItem, Service, Order, Tag
from .permissions import ViewCustomerHistoryPermission
from .serializers import AddCartItemSerializer, CartItemSerializer, CartSerializer, CategorySerializer, CreateOrderSerializer, CustomerSerializer, OrderItemSerializer, ServiceSerializer, OrderSerializer, TagSerializer, UpdateCartItemSerializer, UpdateOrderSerializer


    

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    #permission_classes = [permissions.IsAdminUser]


    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response('Ok')
    

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        customer = Customer.objects.get(
            user_id=request.user.id)
        if request.method == 'GET':
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)



class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer



class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
    ordering_fields = ['price', 'updated_at']
    pagination_class = DefaultPagination
    search_fields = ['name', 'category']


    def get_serializer_context(self):
        return {'request': self.request}
    

    def destroy(self, request, *args, **kwargs):
        if Service.objects.filter(service_id=kwargs['pk']).count() > 0:
            return Response({'error':'Cannot be deleted it is associated with an order'}, status=status.HTTP_405_METHOD_NOT_ALLOWED) 
        return super().destroy(request, *args, **kwargs)



class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()



    def delete(self, request, pk):
        category = self.get_object()

        if category.services.count() > 0:
            return Response({'error': 'collection cannot be deleted because it is associated products'},
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



    @action(detail=True, methods=['get'], url_path='services')
    def services(self, request, pk=None):
        try:
            category = self.get_object()
        except Category.DoesNotExist:
            return Response({ 'error': 'Category not found'}, status=404)
        
        services = Service.objects.filter(category=category)
        serializer = ServiceSerializer(services, many=True, context={'request': request})
        return Response(serializer.data)


    @action(detail=True, methods=['get'], url_path='services/(?P<service_pk>[^/.]+)')
    def service_details(self, request, pk=None, service_pk=None):
        try:
            category = self.get_object()
            service = category.services.get(pk=service_pk)
        except Service.DoesNotExist:
            return Response({ 'detail': 'Service not found in the category'}, 
                            status=status.HTTP_404_NOT_FOUND
                            )
        serializer = ServiceSerializer(service)
        return Response(serializer.data)
    

class CartViewSet(CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, viewsets.GenericViewSet):
    http_method_names = ['post', 'get', 'delete']
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.\
            prefetch_related('items__service').\
                all()
    


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer


    def get_queryset(self):
        return CartItem.objects\
            .filter(cart_id=self.kwargs['cart_pk'])\
            .select_related('service')
    

    def get_serializer_context(self):
        return { 'cart_id': self.kwargs['cart_pk']}
    

    def perform_create(self, serializer):
        cart_id = self.kwargs['cart_pk']
        if not Cart.objects.filter(id=cart_id).exists():
            raise ValidationError("Cart does not exist.")
        serializer.save(cart_id=cart_id)


class OrderViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def active(self, request):
        customer = Customer.objects.get(user=request.user)
        orders = Order.objects.filter(customer=customer, status__in=['PENDING', 'CONFIRMED'])

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def pending(self, request):
        customer = Customer.objects.get(user=request.user)
        orders = Order.objects.filter(customer=customer, status__in=['PENDING'])

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def recent(self, request):
        one_month_ago = now() - timedelta(days=30)
        customer = Customer.objects.get(user=request.user)

        recent_orders = Order.objects\
            .filter(customer=customer, created_at__gte=one_month_ago)\
            .order_by('created_at')[:5]
        serializer = OrderSerializer(recent_orders, many=True)

        return Response(serializer.data)


    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        if self.request.method == 'PATCH':
            return UpdateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user:
            return Order.objects.all()

        try:
            customer = Customer.objects.only(
            'id').get(user_id=user.id)
            return Order.objects.filter(customer_id=customer.id)
        except Customer.DoesNotExist:
            return Order.objects.none()
        
    
    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data, 
            context={'request': request}
            )
        
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        response_serializer = OrderSerializer(order)
        
        return Response(response_serializer.data)
    


class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()

