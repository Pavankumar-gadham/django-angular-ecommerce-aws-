from rest_framework import serializers
from shop.models.user_model import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role', 'phone', 'date_joined']
        read_only_fields = ['date_joined'] 

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data) 
        user.set_password(password)
        user.save()
        return user
