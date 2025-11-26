from django.urls import path
from shop.controllers.user_controller import RegisterController, ProfileController

urlpatterns = [
    path('register/', RegisterController.as_view(), name='register'),
    path('profile/', ProfileController.as_view(), name='profile'),
]
 