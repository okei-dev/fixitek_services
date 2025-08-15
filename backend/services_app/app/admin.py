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
    list_display = ["name", "price", "category", "estimated_time", "photo_preview"]
    list_filter = ["category", "tags"]
    search_fields = ["name", "tags" ]
    readonly_fields = ["photo_preview"]

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="100" style="object-fit:cover; border: 1px solid #ccc;" />', obj.photo.url)
        return "No photo"
    
    photo_preview.short_description = "Preview"

