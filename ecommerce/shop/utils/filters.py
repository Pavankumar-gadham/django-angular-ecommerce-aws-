import django_filters
from django.utils import timezone
from datetime import timedelta
from shop.models.order_model import Order
from shop.models.product_model import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    search = django_filters.CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['min_price', 'max_price', 'search']
        

class OrderFilter(django_filters.FilterSet):
    date_filter = django_filters.CharFilter(method='filter_by_date')

    class Meta:
        model = Order
        fields = ['date_filter']

    def filter_by_date(self, queryset, name, value):
        now = timezone.now()
        today = now.date()
        if value == 'today':
            return queryset.filter(created_at__date=today)
        elif value == 'last7days':
            return queryset.filter(created_at__gte=today - timedelta(days=7))
        elif value == 'last30days':
            return queryset.filter(created_at__gte=today - timedelta(days=30))
        return queryset  
