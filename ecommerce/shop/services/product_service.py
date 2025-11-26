from shop.repositories.product_repository import ProductRepository

class ProductService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    def list_products(self):
        return self.product_repo.get_all_products()

    def get_product(self, product_id):
        return self.product_repo.get_product_by_id(product_id)

    def add_product(self, data):
        return self.product_repo.create_product(data)

    def update_product(self, product_id, data):
        product = self.product_repo.get_product_by_id(product_id)
        if not product:
            return None
        return self.product_repo.update_product(product, data)

    def delete_product(self, product_id):
        product = self.product_repo.get_product_by_id(product_id)
        if not product:
            return None
        return self.product_repo.delete_product(product)
