from rest_framework import serializers
from .models import User, Product, Category, Order, OrderItem, Cart, CartItem, Payment
from django.contrib.auth.hashers import make_password, check_password
# User Serializer
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password_hash', 'is_admin', 'profile_image', 'created_at', 'updated_at']

#     # We will not expose the password hash to the API
#     extra_kwargs = {
#         'password_hash': {'write_only': True},
#     }

class UserSerializer(serializers.ModelSerializer):
    # Define a field for password input
    password = serializers.CharField(write_only=True, required=False)  # Mark as write-only

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_admin', 'profile_image', 'created_at', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
        }

    def create(self, validated_data):
        # Hash the password before saving
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])

        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Check for password and hash it if present
        password = validated_data.pop('password', None)  # Remove password from validated_data

        # Update the user instance with the rest of the fields
        instance = super().update(instance, validated_data)

        # Hash the new password if it's provided
        if password:
            instance.password = make_password(password)
            instance.save()  # Save the updated instance

        return instance

    def create(self, validated_data):
        # Hash the password before saving the user
        if 'password_hash' in validated_data:
            validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Hash the password before updating the user
        if 'password_hash' in validated_data:
            validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return super().update(instance, validated_data)


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password_hash']

    def create(self, validated_data):
        # Hash password before saving the user
        validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return User.objects.create(**validated_data)

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)

# Product Serializer
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'description', 'price', 'stock', 'category', 'category_name', 'featured', 'image', 'created_at', 'updated_at']

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None  # Handle None case
    
    
# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category', 'created_at', 'updated_at']


# Cart Serializer
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'updated_at']

# class CartItemSerializer(serializers.ModelSerializer):
#     product_name = serializers.ReadOnlyField(source='product.name')
#     product_image = serializers.ReadOnlyField(source='product.image')
#     class Meta:
#         model = CartItem
#         fields = ['id', 'cart', 'product', 'product_name','product_image', 'quantity', 'price_at_addition', 'created_at']
class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_image = serializers.SerializerMethodField()
    product_details = ProductSerializer(source='product', read_only=True)  # Include full product details

    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'product_name', 'product_image', 'product_details', 'quantity', 'price_at_addition', 'created_at']

    def get_product_image(self, obj):
        request = self.context.get('request')
        if obj.product.image:
            return request.build_absolute_uri(obj.product.image.url)
        return None
# Payment Serializer
# class PaymentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Payment
#         fields = ['id', 'user_id' ,  'order', 'payment_method', 'transaction_id', 'payment_date']


# # order serializer

# class OrderItemSerializer(serializers.Serializer):
#     product_id = serializers.IntegerField()
#     quantity = serializers.IntegerField()

# class OrderSerializer(serializers.Serializer):
#     shipping_address = serializers.CharField()
#     billing_address = serializers.CharField()
#     payment_id = serializers.IntegerField()  # Add payment_id to link the payment
#     order_items = OrderItemSerializer(many=True)

#     # def validate_order_items(self, value):
#     #     # Ensure order items are not empty
#     #     if len(value) == 0:
#     #         raise serializers.ValidationError("You must provide at least one item to order.")
#     #     return value

#     # def validate_payment_id(self, value):
#     #     # Ensure the payment ID exists and is valid
#     #     if not Payment.objects.filter(id=value).exists():
#     #         raise serializers.ValidationError("Invalid payment ID.")
#     #     return value

#     def validate(self, attrs):
#         # Optional: Add any additional validation logic here
#         return attrs



# class GetOrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = ['product', 'quantity', 'price_at_purchase']

# # class GetOrderSerializer(serializers.ModelSerializer):
# #     payment_status = serializers.CharField(source='payment.payment_status', default='Not Paid')

# #     class Meta:
# #         model = Order
# #         # fields = ['id', 'user', 'payment_status' , 'shipping_address'  , 'billing_address']  # Include other fields as needed
# #         fields = ['id', 'user', 'payment_status','total_amount', 'status', 'shipping_address', 'billing_address', 'order_date']

# class GetOrderSerializer(serializers.ModelSerializer):
#     payment_status = serializers.CharField(source='payment.payment_status', default='Not Paid')
#     items = GetOrderItemSerializer(many=True)  # Nested serializer for order items

#     class Meta:
#         model = Order
#         # fields = ['id', 'user', 'payment_status', 'total_amount', 'status', 'shipping_address', 'billing_address', 'order_date' ,  'items']  # Include the or
#         fields = ['id', 'user', 'payment_status', 'items']  # Include the order items and other fields
# class OrderStatusUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ['status']

#     def validate_status(self, value):
#         allowed_statuses = ['pending', 'shipped', 'delivered', 'cancelled']
#         if value not in allowed_statuses:
#             raise serializers.ValidationError(f"Invalid status. Allowed values are: {allowed_statuses}.")
        # return value


# new serializer
# Payment Serializer
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user_id', 'order', 'payment_method', 'transaction_id', 'payment_date']

# Order Item Serializer
class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

# Order Serializer
class OrderSerializer(serializers.Serializer):
    shipping_address = serializers.CharField()
    billing_address = serializers.CharField()
    payment_id = serializers.IntegerField()  # Payment ID to link the payment
    order_items = OrderItemSerializer(many=True)  # Nested serializer for order items

    def validate(self, attrs):
        # Additional validation logic can be added here
        return attrs

# Serializer to Get Order Items
class GetOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price_at_purchase']

# Serializer to Get Order Details
class GetOrderSerializer(serializers.ModelSerializer):
    payment_status = serializers.CharField(source='payment.payment_status', default='Not Paid')
    items = GetOrderItemSerializer(many=True)  # No source needed

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'payment_status', 'total_amount', 'status',
            'shipping_address', 'billing_address', 'order_date', 'items'
        ]

class FullOrderSerializer(serializers.ModelSerializer):
    payment_status = serializers.CharField(source='payment.payment_status', default='Not Paid')
    items = GetOrderItemSerializer(many=True)  # Nested serializer for order items

    class Meta:
        model = Order
        fields = [
            'id', 
            'user', 
            'total_amount', 
            'status', 
            'shipping_address', 
            'billing_address', 
            'order_date', 
            'payment_status',  # Payment status field
            'items'  # Order items field
        ]


class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']

    def validate_status(self, value):
        allowed_statuses = ['pending', 'shipped', 'delivered', 'cancelled']
        if value not in allowed_statuses:
            raise serializers.ValidationError(f"Invalid status. Allowed values are: {allowed_statuses}.")
        return value

    def save(self, **kwargs):
        previous_status = self.instance.status
        new_status = self.validated_data['status']
        
        # Call the parent's save method to update the status
        order = super().save(**kwargs)

        # Check if the status is changed to 'shipped' or 'cancelled' to manage stock
        if previous_status == 'pending' and new_status == 'shipped':
            # Decrease the product stock
            for item in order.items.all():
                product = item.product
                product.stock -= item.quantity
                product.save()

        elif previous_status == 'shipped' and new_status == 'cancelled':
            # Increase the product stock when the order is cancelled
            for item in order.items.all():
                product = item.product
                product.stock += item.quantity
                product.save()

        return order

    
    
class ProductCheckAcceptabilitySerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    requested_quantity = serializers.IntegerField(write_only=True)  # Incoming requested quantity
    price_at_purchase = serializers.FloatField(write_only=True)  # Incoming price at the time of purchase
    is_acceptable = serializers.SerializerMethodField()  # Boolean for acceptability check

    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'description', 'price', 'stock', 'requested_quantity', 'price_at_purchase', 'is_acceptable', 'category_name']

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_is_acceptable(self, obj):
        # Check if requested quantity is less than or equal to available stock
        requested_quantity = self.context['requested_quantity']
        return requested_quantity <= obj.stock  # Return True if acceptable, False otherwise
