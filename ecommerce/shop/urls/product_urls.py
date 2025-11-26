from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from shop.controllers.product_controller import CategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'categories', CategoryViewSet, basename='categories')


urlpatterns = router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
