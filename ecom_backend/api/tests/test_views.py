from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from api.models import User, Cart  # Adjust according to your models
from django.contrib.auth.hashers import make_password

class UserAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()  # Initialize the API client
        self.register_data = {
            'email': 'testuser@example.com',
            'password_hash': 'testpassword123',  # Plain password to be hashed
            'username': 'testuser',
            'is_admin': False
        }
        
    def test_register_success(self):
        """Test user registration with valid data"""
        response = self.client.post('/api/register/', self.register_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User registered successfully and cart created')

    def test_register_user_exists(self):
        """Test user registration with an existing email"""
        # Register the user first
        self.client.post('/api/register/', self.register_data, format='json')

        # Try to register the same user again
        response = self.client.post('/api/register/', self.register_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)  # Adjust based on your serializer's validation errors

    def test_login_success(self):
        """Test login with valid credentials"""
        # Register the user first
        self.client.post('/api/register/', self.register_data, format='json')

        # Now login with the registered user
        response = self.client.post('/api/login/', {
            'email': 'testuser@example.com',
            'password': 'testpassword123'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)  # Check if token is in the response

    def test_login_user_not_found(self):
        """Test login with non-existent user"""
        response = self.client.post('/api/login/', {
            'email': 'nonexistent@example.com',
            'password': 'testpassword123'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found')

    def test_login_invalid_password(self):
        """Test login with wrong password"""
        # Register the user first
        self.client.post('/api/register/', self.register_data, format='json')

        # Now attempt to login with an incorrect password
        response = self.client.post('/api/login/', {
            'email': 'testuser@example.com',
            'password': 'wrongpassword'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid password')


