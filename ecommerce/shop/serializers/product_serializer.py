from rest_framework import serializers
from shop.models.product_model import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category 
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

        
    

