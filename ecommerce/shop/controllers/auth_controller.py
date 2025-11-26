from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny

class LoginController(TokenObtainPairView):
    permission_classes = [AllowAny]

class RefreshTokenController(TokenRefreshView):
    permission_classes = [AllowAny]
