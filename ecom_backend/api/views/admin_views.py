# ecommerce/views/admin_views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from ..models import Product, User, Order  # Import the models
from ..serializers import ProductSerializer, UserSerializer, OrderSerializer, CategorySerializer, OrderStatusUpdateSerializer, GetOrderSerializer, ProductCheckAcceptabilitySerializer, FullOrderSerializer
from functools import wraps
from .user_views import jwt_required
from ..models import Category
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Count, Sum
from django.db.models.functions import TruncDay
import logging
from rest_framework.pagination import PageNumberPagination
# Admin access control decorator


def admin_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_admin:
            return JsonResponse({'error': 'Admin access required'}, status=403)
        return func(request, *args, **kwargs)

    return wrapper


# Create Product (Admin Only)
logger = logging.getLogger(__name__)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@jwt_required
@admin_required
def create_product(request):
    serializer = ProductSerializer(data=request.data)

    # Check if the data is valid
    if serializer.is_valid():
        try:
            serializer.save()  # Save the product, including the image if present
            return Response({'message': 'Product created successfully', 'product': serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error saving product: {e}")
            return Response({'error': 'Error saving product.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Log the errors from the serializer
    logger.error(f"Validation errors: {serializer.errors}")

    # Return the errors with more context
    return Response({'error': 'Validation failed', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Update Product (Admin Only)
@api_view(['PUT'])
@jwt_required
@admin_required
def update_product(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    # Allow partial updates of the fields including the image
    serializer = ProductSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Product updated successfully', 'product': serializer.data}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Product (Admin Only)
@api_view(['DELETE'])
@jwt_required
@admin_required
def delete_product(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

# createa catagories


@api_view(['POST'])
@jwt_required
@admin_required
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all categories


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

# Update a category


@api_view(['PUT'])
@jwt_required
@admin_required
def update_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a category


@api_view(['DELETE'])
@jwt_required
@admin_required
def delete_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response({'message': 'Category deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Get All Users (Admin Only)
@api_view(['GET'])
@jwt_required
@admin_required
def list_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get All Orders (Admin Only)
@api_view(['GET'])
@jwt_required
@admin_required
def list_all_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# admin order serializers
@api_view(['PUT'])
@jwt_required  # Ensure the user is authenticated
@admin_required
def update_order_status(request, order_id):
    try:
        # Ensure the order belongs to the authenticated user
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found or you do not have permission to update this order."}, status=status.HTTP_404_NOT_FOUND)

    serializer = OrderStatusUpdateSerializer(order, data=request.data)

    if serializer.is_valid():
        serializer.save()  # Save method will handle the stock update logic
        return Response({"message": "Order status updated successfully.", "order_id": order.id}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@jwt_required
@admin_required
def get_daily_order_summary(request):
    # Group by day, count orders, and sum total amounts
    daily_data = (
        Order.objects
        .annotate(day=TruncDay('order_date'))
        .values('day')
        # Count orders and sum total amount
        .annotate(orders=Count('id'), amount=Sum('total_amount'))
        .order_by('day')
    )

    # Convert queryset to a list of dictionaries for each day
    formatted_data = [
        {
            # Convert day to string format (e.g., 2024-10-09)
            'day': entry['day'].strftime('%Y-%m-%d'),
            'orders': entry['orders'],
            'amount': entry['amount']
        }
        for entry in daily_data
    ]

    return Response(formatted_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@jwt_required  # Ensures the user is authenticated
@admin_required
def all_orders(request):
    # Create a paginator instance
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Set how many orders per page

    # Get all orders from the database
    orders = Order.objects.all()

    # Paginate the orders queryset
    paginated_orders = paginator.paginate_queryset(orders, request)

    # Serialize the paginated orders with FullOrderSerializer
    serializer = FullOrderSerializer(paginated_orders, many=True)

    # Return paginated response with serialized data
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
def check_acceptability(request):
    products = request.data.get('products', [])
    print('products', products)
    results = []
    overall_is_acceptable = True  # Set the initial value as True
    total_order_amount = 0  # To store the total amount at the order
    total_current_amount = 0  # To store the total current amount

    for product_data in products['products']:
        print("product_Data", product_data)
        product_id = product_data.get('product')
        requested_quantity = product_data.get('quantity')
        price_at_purchase = product_data.get('price_at_purchase')

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": f"Product with id {product_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Calculate total amounts for the product
        total_price_at_order = float(price_at_purchase) * requested_quantity
        total_current_price = product.price * requested_quantity

        # Update total amounts
        total_order_amount += total_price_at_order
        total_current_amount += total_current_price

        # Check if the requested quantity is less than or equal to the available stock
        is_acceptable = requested_quantity <= product.stock

        # Append the product details to the results
        results.append({
            "product_id": product.id,
            "name": product.name,
            "requested_quantity": requested_quantity,
            "available_quantity": product.stock,
            "price_at_order": price_at_purchase,
            "total_price_at_order": total_price_at_order,
            "current_price": product.price,
            "total_current_price": total_current_price,
            "is_acceptable": is_acceptable
        })

        # Update `overall_is_acceptable` if any product is not acceptable
        if not is_acceptable:
            overall_is_acceptable = False

    # Return the results along with overall_is_acceptable and total amounts
    return Response({
        "products": results,
        "overall_is_acceptable": overall_is_acceptable,
        "total_order_amount": total_order_amount,
        "total_current_amount": total_current_amount
    }, status=status.HTTP_200_OK)
