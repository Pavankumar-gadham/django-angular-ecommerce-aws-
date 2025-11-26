from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from shop.serializers.user_serializer import UserSerializer
from shop.utils.di_container import DIContainer

class RegisterController(APIView):
    permission_classes = [permissions.AllowAny]
    user_service = DIContainer.get_user_service()

    def post(self, request):
        user = self.user_service.register_user(request.data)
        if not user:
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

 
class ProfileController(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
