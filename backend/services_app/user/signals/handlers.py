from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from app.models import Customer
from app.signals import order_created


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_customer_for_user(sender, instance, created, **kwargs):
    if created and not Customer.objects.filter(user=instance).exists():
        print(f"Creating customer for user {instance.username}")


@receiver(order_created)
def on_order_create(sender, **kwargs):
    print(kwargs['order'])