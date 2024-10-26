# ecommerce/views/user_views.py

import jwt
import datetime
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from ..models import User  # Import your custom User model
from functools import wraps
from ..serializers import RegisterSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.pagination import PageNumberPagination
# Import the models
from ..models import Product, User, Order, Cart, CartItem, OrderItem, Payment
from ..serializers import ProductSerializer, UserSerializer, OrderSerializer, CategorySerializer, CartItemSerializer, OrderItemSerializer, GetOrderItemSerializer, GetOrderSerializer, OrderStatusUpdateSerializer
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from django.db import IntegrityError
from rest_framework import generics
# Decorator for JWT authentication


def jwt_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return JsonResponse({'error': 'Token missing'}, status=401)

        try:
            payload = jwt.decode(
                token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        try:
            user = User.objects.get(id=payload['id'])
            request.user = user  # Attach the user to the request object
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        return func(request, *args, **kwargs)

    return wrapper


# Utility function to generate JWT token
def generate_jwt_token(user):
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),  # Token valid for 1 day
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
    return token


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()  # Save user instance

        # Automatically create a cart for the newly registered user
        Cart.objects.create(user=user)

        print('registration successful')
        return Response({'message': 'User registered successfully and cart created'}, status=status.HTTP_201_CREATED)

    print('registration failed')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Login API


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)  # Fetch the user by email
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the provided password matches the stored hashed password
    if not check_password(password, user.password_hash):
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate a JWT token for the authenticated user
    token = generate_jwt_token(user)

    # Fetch the cart associated with the user (assuming one cart per user)
    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found for this user'}, status=status.HTTP_404_NOT_FOUND)

    # Build the profile image URL if it exists
    profile_image_url = request.build_absolute_uri(
        user.profile_image.url) if user.profile_image else None

    # Return the login response with the token, user details, and cart ID
    return Response({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,
            'profile_image': profile_image_url
        },
        'cart': {
            'id': cart.id  # Include the cart ID in the response
        }
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def logout(request):
    try:
        # Extract the refresh token from the request body
        refresh_token = request.data.get('refresh_token')
        print('Refresh token', refresh_token)
        # Check if the refresh token was provided
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@jwt_required
def update_user_profile(request):
    user = request.user  # Get the authenticated user

    # Pass in the data and allow partial updates
    serializer = UserSerializer(user, data=request.data, partial=True)

    # Validate the data and update the user
    if serializer.is_valid():
        serializer.save()  # Save the updated user details
        return Response({'message': 'Profile updated successfully', 'user': serializer.data}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Protected View Example


@api_view(['GET'])
@jwt_required
def protected_view(request):
    return Response({'message': f'Welcome {request.user.username}! You are authenticated.'})


# JWT Verification API
@api_view(['GET'])
def verify_jwt_token(request):
    token = request.headers.get('Authorization')

    if not token:
        raise AuthenticationFailed('Token missing')

    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['id'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Token expired')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Invalid token')

    return Response({'user': {'id': user.id, 'username': user.username, 'email': user.email}})


@api_view(['GET'])
def get_all_products(request):
    # Create a paginator instance
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Set number of items per page

    # Get all products
    products = Product.objects.all()

    # Paginate the product list
    paginated_products = paginator.paginate_queryset(products, request)

    # Serialize the paginated products
    serializer = ProductSerializer(paginated_products, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def get_products_by_category(request, category_id):
    # Create a paginator instance
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Set number of items per page

    # Filter products by category
    products = Product.objects.filter(category__id=category_id)

    # Paginate the product list
    paginated_products = paginator.paginate_queryset(products, request)

    # Serialize the paginated products
    serializer = ProductSerializer(paginated_products, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def search_products(request):
    query = request.query_params.get('q', '')  # Get the search query
    category = request.query_params.get(
        'category', None)  # Optional category filter

    # Create a paginator instance
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Set number of items per page

    # Filter products based on query and category
    # If the query is "Laptop", the search will return all products where the name, brand, or description contains the word "Laptop" (case-insensitive).
    filters = Q(name__icontains=query) | Q(
        brand__icontains=query) | Q(description__icontains=query)

    if category:
        products = Product.objects.filter(
            filters, category__name__iexact=category)
    else:
        products = Product.objects.filter(filters)

    # Paginate the product list
    paginated_products = paginator.paginate_queryset(products, request)

    # Serialize the paginated products
    serializer = ProductSerializer(paginated_products, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def filter_products(request):
    # Extract filter query parameters
    min_price = request.query_params.get('min_price', None)
    max_price = request.query_params.get('max_price', None)
    brand = request.query_params.get('brand', None)
    stock_status = request.query_params.get(
        'stock', None)  # 'available' or 'out_of_stock'
    featured = request.query_params.get('featured', None)  # 'true' or 'false'

    # Create a base query for filtering products
    filters = Q()

    # Apply Price Range Filter
    if min_price and max_price:
        filters &= Q(price__gte=min_price) & Q(price__lte=max_price)

    # Apply Brand Filter
    if brand:
        filters &= Q(brand__iexact=brand)

    # Apply Stock Availability Filter
    if stock_status:
        if stock_status == 'available':
            filters &= Q(stock__gt=0)
        elif stock_status == 'out_of_stock':
            filters &= Q(stock=0)

    # Apply Featured Status Filter
    if featured:
        if featured.lower() == 'true':
            filters &= Q(featured=True)
        elif featured.lower() == 'false':
            filters &= Q(featured=False)

    # Get the filtered products
    products = Product.objects.filter(filters)

    # Paginate the product list
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Set number of items per page
    paginated_products = paginator.paginate_queryset(products, request)

    # Serialize the paginated products
    serializer = ProductSerializer(paginated_products, many=True)

    # Return the paginated response
    return paginator.get_paginated_response(serializer.data)


# cart apis

@api_view(['POST'])
@jwt_required
def add_cart_item(request):
    user = request.user  # Authenticated user from JWT
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')

    # Validate that 'product_id' and 'quantity' are provided
    if not product_id:
        return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure quantity is provided and is not null or empty
    if quantity is None:
        return Response({"error": "Quantity cannot be null."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        quantity = int(quantity)
        if quantity <= 0:
            return Response({"error": "Quantity must be greater than zero."}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Invalid quantity format."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Retrieve or create the user's cart
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if the product exists
        product = Product.objects.get(id=product_id)

        # Check if the item is already in the cart
        try:
            cart_item = CartItem.objects.get(cart=cart, product=product)
            cart_item.price_at_addition = product.price
            cart_item.quantity += quantity  # Update quantity if item already exists
        except CartItem.DoesNotExist:
            # Create a new CartItem if it doesn't exist
            cart_item = CartItem(
                cart=cart,
                product=product,
                quantity=quantity,
                price_at_addition=product.price  # Store price at the time of addition
            )
        cart_item.save()  # Save cart item after updating quantity

        return Response({"message": "Item added to cart."}, status=status.HTTP_201_CREATED)

    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    except IntegrityError as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['PUT'])
# @jwt_required
# def update_cart_item(request):
#     user = request.user  # Authenticated user from JWT
#     product_id = request.data.get('product_id')
#     quantity = request.data.get('quantity')

#     # Validate that 'product_id' and 'quantity' are provided
#     if not product_id:
#         return Response({"error": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

#     if quantity is None:
#         return Response({"error": "Quantity cannot be null."}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         quantity = int(quantity)
#         if quantity < 0:
#             return Response({"error": "Quantity cannot be negative."}, status=status.HTTP_400_BAD_REQUEST)
#     except ValueError:
#         return Response({"error": "Invalid quantity format."}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         # Retrieve the user's cart
#         cart = Cart.objects.get(user=user)

#         # Check if the product exists
#         product = Product.objects.get(id=product_id)

#         # Check if the item is already in the cart
#         cart_item = CartItem.objects.get(cart=cart, product=product)

#         if quantity == 0:
#             cart_item.delete()  # Remove the item if quantity is set to 0
#             return Response({"message": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)

#         cart_item.quantity = quantity  # Update quantity
#         cart_item.price_at_addition = product.price  # Update price if needed
#         cart_item.save()

#         return Response({"message": "Cart item updated."}, status=status.HTTP_200_OK)

#     except Product.DoesNotExist:
#         return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

#     except CartItem.DoesNotExist:
#         return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)

#     except Cart.DoesNotExist:
#         return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

#     except IntegrityError as e:
#         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['DELETE'])
# @jwt_required
# def remove_cart_item(request):
#     user = request.user  # Authenticated user from JWT
#     product_id = request.data.get('product_id')

#     if product_id:  # If product_id is provided, remove that specific item
#         try:
#             # Retrieve the user's cart
#             cart = Cart.objects.get(user=user)

#             # Check if the product exists in the cart
#             cart_item = CartItem.objects.get(cart=cart, product__id=product_id)
#             cart_item.delete()  # Remove the item from the cart

#             return Response({"message": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)

#         except CartItem.DoesNotExist:
#             return Response({"error": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)

#         except Cart.DoesNotExist:
#             return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

#     else:  # If no product_id is provided, remove all items from the cart
#         try:
#             cart = Cart.objects.get(user=user)
#             cart.cartitem_set.all().delete()  # Delete all cart items
#             return Response({"message": "All items removed from cart."}, status=status.HTTP_204_NO_CONTENT)

#         except Cart.DoesNotExist:
#             return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@jwt_required
def get_cart_items(request):
    user = request.user  # Assume user is authenticated

    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({"error": "Cart is empty."}, status=status.HTTP_404_NOT_FOUND)

    cart_items = CartItem.objects.filter(cart=cart)
    # serializer = CartItemSerializer(cart_items, many=True)
    serializer = CartItemSerializer(
        cart_items, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@jwt_required
def delete_cart_item(request, cart_id, product_id):
    user = request.user  # Assume user is authenticated

    try:
        # Fetch the cart associated with the user and cart_id
        cart = Cart.objects.get(id=cart_id, user=user)

        # Try to get the cart item based on the cart and product
        cart_item = CartItem.objects.get(cart=cart, product_id=product_id)

        # Delete the cart item
        cart_item.delete()

        return Response({"message": "Item deleted from cart."}, status=status.HTTP_200_OK)

    except Cart.DoesNotExist:
        return Response({"error": "Cart not found for this user."}, status=status.HTTP_404_NOT_FOUND)

    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@jwt_required
def place_order(request):
    user = request.user  # Get the authenticated user (from JWT or session)
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        shipping_address = serializer.validated_data['shipping_address']
        billing_address = serializer.validated_data['billing_address']
        order_items_data = serializer.validated_data['order_items']
        payment_id = serializer.validated_data.get(
            'payment_id')  # Get payment ID from front end

        # Fetch and validate the payment
        try:
            # Ensure the payment belongs to the user
            payment = Payment.objects.get(id=payment_id, user=user)
        except Payment.DoesNotExist:
            return Response({"error": "Invalid payment ID or payment not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the payment status is 'completed'
        if payment.payment_status != 'completed':
            return Response({"error": "Payment is not completed. Please complete the payment first."}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = 0
        order_items = []

        # Loop through order items and calculate total amount
        for item_data in order_items_data:
            product_id = item_data['product_id']
            quantity = item_data['quantity']

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({"error": f"Product with ID {product_id} not found."}, status=status.HTTP_404_NOT_FOUND)

            if quantity <= 0:
                return Response({"error": "Quantity must be greater than zero."}, status=status.HTTP_400_BAD_REQUEST)

            price_at_purchase = product.price * quantity
            total_amount += price_at_purchase

            # Prepare order items data to be included in the response
            order_items.append({
                "product_id": product.id,
                "product_name": product.name,
                "quantity": quantity,
                "price_at_purchase": product.price,
                "total_price": price_at_purchase
            })

        # Check if the total amount matches the payment amount
        if total_amount != payment.amount:
            return Response({"error": "Payment amount does not match the order total."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the order
        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            billing_address=billing_address,
            total_amount=total_amount,  # Set the correct total amount
            status='pending',  # Default order status
            payment=payment  # Link the payment to the order
        )

        # Create OrderItem instances
        for item_data in order_items_data:
            product = Product.objects.get(id=item_data['product_id'])
            quantity = item_data['quantity']
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_purchase=product.price
            )

        # Prepare the response data
        response_data = {
            "message": "Order placed successfully.",
            "order_id": order.id,
            "total_amount": total_amount,
            "payment_status": payment.payment_status,
            "shipping_address": shipping_address,
            "billing_address": billing_address,
            "order_items": order_items,
            "payment_details": {
                "payment_id": payment.id,
                "payment_status": payment.payment_status,
                "amount": payment.amount,
                # Assuming you have a method field in the Payment model
                "payment_method": payment.payment_method,
                # Assuming you have a transaction_id field
                "transaction_id": payment.transaction_id
            }
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# get all orders
@api_view(['GET'])
@jwt_required
def order_list(request):
    user = request.user  # Get the authenticated user
    orders = Order.objects.filter(user=user)  # Optional: filter orders by user
    serializer = GetOrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@jwt_required
def create_payment(request):
    data = request.data
    # Assuming total_amount is coming from frontend after calculating product price
    user_id = data.get('user_id')
    total_amount = data.get('amount')
    payment_method = data.get('payment_method')
    payment_status = data.get('payment_status')
    transaction_id = data.get('transaction_id')
    # Create the payment
    payment = Payment.objects.create(
        user_id=user_id,
        amount=total_amount,
        payment_method=payment_method,
        payment_status=payment_status,  # Initial status
        transaction_id=transaction_id
    )

    # Return the payment ID and initial status
    return Response({
        "payment_id": payment.id,
        "payment_status": payment.payment_status
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_product_details(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@jwt_required  # Ensure the user is authenticated
def user_cancel_order(request, order_id):
    try:
        # Get the order and ensure it belongs to the authenticated user
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or you do not have permission to update this order."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the current status is 'pending'
    if order.status != 'pending':
        return Response({"error": "You can only cancel orders that are still pending."}, status=status.HTTP_400_BAD_REQUEST)

    # Allow only 'cancelled' status for the user
    request.data['status'] = 'cancelled'
    serializer = OrderStatusUpdateSerializer(order, data=request.data)

    if serializer.is_valid():
        serializer.save()  # Save method will update the status and manage stock
        return Response({"message": "Order cancelled successfully.", "order_id": order.id}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
