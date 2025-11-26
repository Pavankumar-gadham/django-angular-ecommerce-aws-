
from rest_framework import viewsets, status, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from shop.models.product_model import Category
from shop.serializers.product_serializer import CategorySerializer, ProductSerializer
from shop.utils.di_container import DIContainer
from shop.utils.pagination import CustomPagination
from shop.utils.filters import ProductFilter  


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    pagination_class = CustomPagination

    def get_serializer_context(self):
        return {'request': self.request}
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = ProductSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = ProductSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.product_service = DIContainer.get_product_service()

    def get_queryset(self):
        queryset = self.product_service.list_products()
        request = self.request

        categories = request.query_params.getlist('category')
        if categories:
            queryset = queryset.filter(category__name__in=categories)

        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        search = request.query_params.get('search')

        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset.distinct()

    def retrieve(self, request, pk=None):
        product = self.product_service.get_product(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)


    def update(self, request, pk=None):
        updated_product = self.product_service.update_product(pk, request.data)
        if not updated_product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(updated_product, context={'request': request})
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
   queryset = Category.objects.all()
   serializer_class = CategorySerializer
   permission_classes = [permissions.AllowAny]
