from django.db.models.signals import post_save, post_delete
from django.conf import settings
from django.dispatch import receiver
from app.models import Customer, OrderItem



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_customer_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, "customer"):
        Customer.objects.create(user=instance)


@receiver([post_save, post_delete], sender=OrderItem)
def update_order_total(sender, instance, **kwargs):
    order = instance.order
    order.update_total()