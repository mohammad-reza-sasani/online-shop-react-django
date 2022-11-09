from django.contrib import admin
from .models import Orders , ItemOrder

class ItemInline(admin.TabularInline):
    model = ItemOrder
    readonly_fields = ['customer','product',"quantity"]

@admin.register(Orders)
class OrdersAdmin(admin.ModelAdmin):
    list_display = ["customer" , "paid" , "order_date","city"]
    search_fields=["id"]
    inlines = [ItemInline]

@admin.register(ItemOrder)
class ItemOrderAdmin(admin.ModelAdmin):
    list_display = ["orders","customer","product"]