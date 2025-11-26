from shop.models.order_model import Order, OrderItem

class OrderRepository:
    def get_orders_by_user(self, user):
        return Order.objects.filter(user=user).prefetch_related('items__product')

    def create_order(self, user, total_price, shipping_address):
        return Order.objects.create(
            user=user,
            total_price=total_price,
            shipping_address=shipping_address
        )

    def create_order_item(self, order, product, quantity, price):
        return OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=price
        )
