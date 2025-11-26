from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from shop.models.order_model import Order, OrderItem
from shop.models.product_model import Product, Category
from shop.models.user_model import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'phone')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'phone')}),
    )

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0 
    readonly_fields = ('product', 'quantity', 'price') 

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'created_at')
    inlines = [OrderItemInline] 
    readonly_fields = ('user', 'total_price', 'created_at')

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(Product)
admin.site.register(Category)
