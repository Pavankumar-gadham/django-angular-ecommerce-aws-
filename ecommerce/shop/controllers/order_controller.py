
from rest_framework import viewsets, mixins, permissions, status
from rest_framework.exceptions import ValidationError
from shop.utils.filters import OrderFilter
from rest_framework.response import Response 
from shop.serializers.order_serializer import OrderSerializer
from shop.utils.di_container import DIContainer
from django_filters.rest_framework import DjangoFilterBackend


class OrderViewSet(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.order_service = DIContainer.get_order_service()

    def get_queryset(self):
        user = self.request.user
        qs = self.order_service.order_repo.get_orders_by_user(user)
        print("Frontend fetched orders for user:", user.id, " | Count:", qs.count())
        return qs


    def get_serializer_context(self):
        return {"request": self.request}

    def create(self, request, *args, **kwargs):
        """
        We override create() so DRF returns a FRESH order object after creation.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Perform the creation
        order = self.perform_create(serializer)

        # Return full freshly serialized order
        output = OrderSerializer(order, context={"request": request})
        return Response(output.data, status=status.HTTP_201_CREATED)

    # ------------------------------
    # perform_create (VALIDATION + SERVICE CALL)
    # ------------------------------
    def perform_create(self, serializer):
        items_data = self.request.data.get("order_items", [])
        address_data = self.request.data.get("shipping_address")

        # 1. Validate items
        if not items_data:
            raise ValidationError("order_items cannot be empty.")

        # 2. Validate shipping address
        required_fields = ["full_name", "phone", "address_line", "city", "state", "pincode"]
        if not address_data:
            raise ValidationError("Shipping address is required.")

        for f in required_fields:
            if not address_data.get(f):
                raise ValidationError(f"{f} is required in shipping_address.")

        # 3. Create order via service
        order = self.order_service.create_order(
            user=self.request.user,
            items=items_data,
            shipping_address=address_data
        )

        if not order:
            raise ValidationError("Invalid product or insufficient stock.")

        return order