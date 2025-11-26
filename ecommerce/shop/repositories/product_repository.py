from shop.models.product_model import Product

class ProductRepository:
    def get_all_products(self):
        return Product.objects.all().order_by('-created_at')

    def get_product_by_id(self, product_id):
        return Product.objects.filter(id=product_id).first()

    def create_product(self, data):
        return Product.objects.create(**data)

    def update_product(self, product, data):
        for key, value in data.items():
            setattr(product, key, value)
        product.save()
        return product

    def delete_product(self, product):
        product.delete()
        return True
