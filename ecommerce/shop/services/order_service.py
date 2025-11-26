from shop.repositories.order_repository import OrderRepository
from shop.repositories.product_repository import ProductRepository

class OrderService:
    def __init__(self, order_repo: OrderRepository, product_repo: ProductRepository):
        self.order_repo = order_repo
        self.product_repo = product_repo

    def create_order(self, user, items, shipping_address):
        order = self.order_repo.create_order(
            user=user,
            total_price=0,
            shipping_address=shipping_address
        )

        total = 0

        for item in items:
            product_id = item.get("product_id")
            quantity = int(item.get("quantity", 1))

            product = self.product_repo.get_product_by_id(product_id)

            if not product or product.stock < quantity:
                order.delete()
                return None

            self.order_repo.create_order_item(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

            total += product.price * quantity
            product.stock -= quantity
            product.save()

        order.total_price = total
        order.save()
        return order
