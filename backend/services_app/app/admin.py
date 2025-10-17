from django.utils.html import format_html
from django.contrib import admin
from . import models

admin.sites.site.site_header = "Fixitek Services"

admin.site.register(models.Customer)
admin.site.register(models.Order)


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_filter = ["name", "services__created_at"]


@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "category", "estimated_time"]
    list_filter = ["category", "tags"]
    search_fields = ["name", "tags" ]


@admin.register(models.ServiceImage)
class ServiceImage(admin.ModelAdmin):
    list_display = ["image", "is_primary"]


@admin.register(models.ServiceType)
class ServiceType(admin.ModelAdmin):
    list_display = ["service_type"]

