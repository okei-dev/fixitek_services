from django.db.models import Sum
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework import serializers
from .signals import order_created
from user.serializers import UserSerializer
from .models import (Cart, 
                     CartItem, 
                     Category, 
                     Customer, 
                     OrderItem, 
                     Service, 
                     Order, 
                     ServiceImage, 
                     ServiceType, 
                     Tag
                     )


class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'phone', 'user']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'photo_url']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class ServiceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImage
        fields = ['id', 'image', 'is_primary']


class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['id', 'service_type', 'need_moving', 'how_far', 'moving_price', 'related_image']


class ServiceSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    images = ServiceImageSerializer(many=True)
    service_types = ServiceTypeSerializer(many=True)
    category = CategorySerializer()
    class Meta:
        model = Service
        fields = ['id', 'name', 'category', 'description', 'tags', 'price', 'estimated_time', 'images', 'service_types']


class SimpleServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price']


class CartItemSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()


    def get_total_price(self, items: CartItem):
        return items.quantity * items.service.price
    

    class Meta:
        model = CartItem
        fields = ['id', 'service', 'quantity', 'total_price']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    def get_total_price(self, cart: Cart):
        return sum([item.service.price * item.quantity for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price', 'created_at']



class AddCartItemSerializer(serializers.ModelSerializer):
    service_id = serializers.IntegerField()

    def validate_service_id(self, pk):
        if not Service.objects.filter(pk=pk).exists():
            raise serializers.ValidationError('No such service id found.')
        return pk
    
    def save(self, **kwargs):
        # service_id, cart_id, quantity
        cart_id = self.context['cart_id']
        service_id = self.validated_data['service_id']
        quantity = self.validated_data['quantity']

        try:
            cart_item = CartItem.objects.get(cart_id=cart_id, service_id=service_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart_id=cart_id, **self.validated_data)

        return self.instance
    

    class Meta:
        model = CartItem
        fields = ['id', 'service_id', 'quantity']
            

class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']    



class OrderItemSerializer(serializers.ModelSerializer):
    service = SimpleServiceSerializer()
    class Meta:
        model = OrderItem
        fields = ['id', 'service', 'quantity', 'price']



class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    customer = CustomerSerializer()

    class Meta:
        model = Order
        fields = [
            'id', 'customer',  'created_at',
            'scheduled_date', 'status', 'notes', 'items'
        ]


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']




class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()


    def validate_cart_id(self, cart_id):

        cart = Cart.objects.filter(pk=cart_id).first()
        if not cart:
            raise serializers.ValidationError('Invalid cart. Either it doesn\'t exist or it\'s not your cart.')
        
        if not CartItem.objects.filter(cart_id=cart_id).exists():
            raise serializers.ValidationError('Your cart is currently empty.')
        
        return cart_id
    

    def save(self, **kwargs):
        with transaction.atomic():
            request = self.context['request']
            customer = Customer.objects.get(user=request.user)
            cart_id = self.validated_data['cart_id']

            order = Order.objects.create(
                customer=customer,
                status='PENDING',
                )

            cart_items = CartItem.objects\
                .select_related('service')\
                 .filter(cart_id=cart_id)
            
            order_items = []

            total_price = 0

            for item in cart_items:
                if item.service.price is None:
                    raise serializers.ValidationError(f'Service "{item.service.name}" has no price assigned.')
                
                total_price += item.service.price * item.quantity

                order_items.append(
                    OrderItem(
                    order=order,
                    service=item.service,
                    quantity=item.quantity,
                    price=item.service.price,
                ) 
                )

            OrderItem.objects.bulk_create(order_items)

            order.total_price = total_price
            order.save()

            CartItem.objects.filter(cart_id=cart_id).delete()
            Cart.objects.filter(pk=cart_id).delete()

            order_created.send_robust(self.__class__, order=order)

            return order
