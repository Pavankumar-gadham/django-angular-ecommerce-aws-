from shop.repositories.user_repository import UserRepository
from django.contrib.auth.hashers import make_password

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def register_user(self, data):
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'customer')
        phone = data.get('phone')

        if self.user_repo.get_user_by_username(username):
            return None 
        user = self.user_repo.create_user(username, email, password, role, phone)
        return user

    def get_profile(self, user):
        return user
