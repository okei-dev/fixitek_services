from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from django.urls import path, include
from .views import (
    CartItemViewSet, 
    CartViewSet,
    CategoryViewSet, 
    CustomerViewSet, 
    OrderItemViewSet, 
    ServiceViewSet, 
    OrderViewSet
    )


router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')


carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register(r'items', CartItemViewSet, basename='cart-items', )

orders_router = routers.NestedDefaultRouter(router, 'orders', lookup='order')
orders_router.register(r'items', OrderItemViewSet, basename='order-items')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(carts_router.urls)),
    path('', include(orders_router.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
