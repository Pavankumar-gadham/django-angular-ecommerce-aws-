from shop.models.user_model import CustomUser

class UserRepository:
    def create_user(self, username, email, password, role='customer', phone=None):
        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=role,
            phone=phone
        )
        return user

    def get_user_by_username(self, username):
        return CustomUser.objects.filter(username=username).first()

    def get_user_by_id(self, user_id):
        return CustomUser.objects.filter(id=user_id).first()
