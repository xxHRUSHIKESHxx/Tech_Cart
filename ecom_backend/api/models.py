from django.db import models #adding comments in modesl.py
from datetime import datetime



class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)  # True if user is admin, False if customer
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)  # Add this line
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    brand = models.CharField(max_length=255)
    featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='products/', null=True, blank=True)  # Image field to store product image
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name





class Category(models.Model):
    name = models.CharField(max_length=255)
    parent_category = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_at_addition = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')])
    shipping_address = models.TextField()
    billing_address = models.TextField()
    order_date = models.DateTimeField(auto_now_add=True)
    payment = models.OneToOneField('Payment', on_delete=models.SET_NULL, null=True, blank=True, related_name='order_payment')  # Add related_name here

    def __str__(self):
        return f"Order {self.id} - {self.status}"


class OrderItem(models.Model):
    # order = models.ForeignKey(Order, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)  # Adding related_name
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

# class Payment(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Allow nulls temporarily
#     order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment_details', null=True, blank=True)
#     amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Set a default value for amount
#     payment_method = models.CharField(max_length=20, choices=[
#         ('credit_card', 'Credit Card'), 
#         ('paypal', 'PayPal'), 
#         ('bank_transfer', 'Bank Transfer'), 
#         ('cash_on_delivery', 'Cash on Delivery')
#     ])
#     payment_status = models.CharField(max_length=10, choices=[
#         ('completed', 'Completed'), 
#         ('pending', 'Pending'), 
#         ('failed', 'Failed')
#     ])
#     transaction_id = models.CharField(max_length=255)
#     payment_date = models.DateTimeField(auto_now_add=True)
    
    

#     def __str__(self):
#         return f"Payment {self.id} - {self.payment_status}"


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Allow nulls temporarily
    payment_method = models.CharField(max_length=20, choices=[('credit_card', 'Credit Card'), ('UPI', 'UPI'), ('bank_transfer', 'Bank Transfer')])
    payment_status = models.CharField(max_length=10, choices=[('completed', 'Completed'), ('pending', 'Pending'), ('failed', 'Failed')])
    transaction_id = models.CharField(max_length=255)
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return f"Payment {self.id} - {self.payment_status}"



