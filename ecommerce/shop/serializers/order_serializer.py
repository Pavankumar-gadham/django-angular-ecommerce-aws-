from rest_framework import serializers
from shop.models.order_model import Order, OrderItem
from shop.models.product_model import Product
from shop.serializers.product_serializer import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price']
        read_only_fields = ['id', 'product', 'price']

    def get_product(self, obj):
        request = self.context.get('request')
        return ProductSerializer(obj.product, context={'request': request}).data

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    order_items = serializers.ListField(
        child=serializers.DictField(), write_only=True
    )
    shipping_address = serializers.JSONField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'items', 'order_items', 'shipping_address', 'created_at']
        read_only_fields = ['id', 'user', 'total_price', 'created_at']


    

