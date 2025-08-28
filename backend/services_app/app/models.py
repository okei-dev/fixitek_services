from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.db import models
from uuid import uuid4
from decimal import Decimal


class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)

    @admin.display(ordering=["user__first_name", "user__last_name"])
    def __str__(self):
        return f"{self.user.first_name} - {self.user.last_name}"


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    photo_url = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")
    
class Service(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")
    tags = models.ManyToManyField(Tag, blank=True, related_name="services")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    estimated_time = models.PositiveIntegerField(null=True, blank=True, help_text="Estimated time in minutes")
    description = models.TextField(blank=True)

    photo = models.ImageField(upload_to='service_photos/', blank=True, null=True)


    class Meta:
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["category"]),
        ]
        ordering = ["name"]

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("Service")
        verbose_name_plural = _("Services")


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Cart #{self.id} - {self.items.service}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.service.name}"
    
    def total_price(self):
        return self.service.price * self.quantity 
    
    class Meta:
        unique_together = [["cart", "quantity"]]
    


class Order(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("CONFIRMED", "Confirmed"),
        ("COMPLETED", "Completed"),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateField(auto_now_add=True)
    scheduled_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    notes = models.TextField(blank=True)


    def __str__(self):
        return f"Oder #{self.id} - {self.customer.full_name}"
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name="orderitems")
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal(0.00))


    def __str__(self):
        return f"{self.quantity} x {self.service.name}"
    
