from shop.repositories.product_repository import ProductRepository
from shop.repositories.order_repository import OrderRepository
from shop.repositories.user_repository import UserRepository
from shop.services.product_service import ProductService
from shop.services.order_service import OrderService
from shop.services.user_service import UserService

class DIContainer:
    @staticmethod
    def get_product_service():
        return ProductService(ProductRepository())

    @staticmethod
    def get_order_service():
        return OrderService(OrderRepository(), ProductRepository())
    
    @staticmethod
    def get_user_service():
        return UserService(UserRepository())
