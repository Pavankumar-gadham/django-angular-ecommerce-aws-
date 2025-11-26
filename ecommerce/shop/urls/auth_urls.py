from django.urls import path
from shop.controllers.auth_controller import LoginController, RefreshTokenController

urlpatterns = [
    path('login/', LoginController.as_view(), name='login'),
    path('refresh/', RefreshTokenController.as_view(), name='token-refresh'),
]
