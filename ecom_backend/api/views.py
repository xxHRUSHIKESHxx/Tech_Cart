# Import views from user_views and admin_views
from views.user_views import *
from views.admin_views import *

# Any additional imports if necessary
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Optionally, you could define some global or common API endpoints here if needed.
@api_view(['GET'])
def index(request):
    return Response({'message': 'Welcome to the E-commerce API'})
