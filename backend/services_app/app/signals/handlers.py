from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver
from app.models import Customer



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_customer_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, "customer"):
        Customer.objects.create(user=instance)