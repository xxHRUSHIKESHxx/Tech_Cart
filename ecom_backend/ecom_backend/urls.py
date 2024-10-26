from django.urls import path
from api.views.user_views import (
    register, login, protected_view, verify_jwt_token, update_user_profile, logout,
    get_all_products, get_products_by_category, search_products, filter_products, add_cart_item, get_cart_items, delete_cart_item, place_order, order_list, create_payment, get_product_details , user_cancel_order
)
from api.views.admin_views import (
    create_product, update_product, delete_product, list_all_users, list_all_orders,
    get_categories, create_category, update_category, delete_category, update_order_status, get_daily_order_summary, all_orders, check_acceptability
)
from django.conf import settings
from django.conf.urls.static import static

# Authentication routes
auth_urls = [
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/logout/', logout, name='logout'),
    path('api/updateprofile/', update_user_profile, name='update_user_profile'),
    path('api/protected/', protected_view, name='protected_view'),
    path('api/verify-token/', verify_jwt_token, name='verify_jwt_token'),
]

# Product routes
product_urls = [
    path('api/products/', get_all_products, name='get_all_products'),
    path('api/products/search/', search_products, name='search_products'),
    path('api/filter-products/', filter_products, name='filter_products'),
    path('api/category/<int:category_id>/',
         get_products_by_category, name='get_products_by_category'),
    path('api/products/<int:id>/', get_product_details,
         name='get_product_details'),

]

cart_urls = [
    path('api/cart/add/', add_cart_item, name='add_cart_item'),
    path('api/cart/items/', get_cart_items, name='get_cart_items'),
    path('api/cart/<int:cart_id>/items/<int:product_id>/delete/',
         delete_cart_item, name='delete_cart_item'),
    # path('api/cart/update/', update_cart_item,
    #      name='update_cart_item'),  # PUT request to update item
    # path('api/cart/remove/item/', remove_cart_item,
    #      name='remove_all_cart_items'),  # Remove all items
    # path('api/cart/remove/item/<int:product_id>/', remove_cart_item,
    #  name='remove_cart_item_by_id'),  # Remove specific item
]

# Category routes
category_urls = [
    path('api/categories/', get_categories, name='get_categories'),
    path('api/categories/create/', create_category, name='create_category'),
    path('api/categories/update/<int:category_id>/',
         update_category, name='update_category'),
    path('api/categories/delete/<int:category_id>/',
         delete_category, name='delete_category'),
]

# Admin routes (Users and Orders)
admin_urls = [
    path('api/admin/users/', list_all_users, name='list_all_users'),
    path('api/admin/orders/', list_all_orders, name='list_all_orders'),
]

# Product management for admin
admin_product_urls = [
    path('api/admin/products/', create_product, name='create_product'),
    path('api/admin/products/<int:id>/', update_product, name='update_product'),
    path('api/admin/products/<int:id>/delete/',
         delete_product, name='delete_product'),
]


order_apis = [
    path('api/place-order/', place_order, name='place_order'),
    path('api/orders/', order_list, name='order-list'),
    path('api/all-orders/', all_orders, name='all_orders'),
    path('api/orders/<int:order_id>/status/', update_order_status,
         name='update-order-status'),  # admin
    path('api/orders/daily-summary/', get_daily_order_summary,
         name='daily-order-summary'),  # admin
    path('api/check-acceptability/', check_acceptability,
         name='check-acceptability'),
     path('api/orders/<int:order_id>/cancel/', user_cancel_order, name='user_cancel_order'),
]

payment_apis = [
    path('api/create-payment', create_payment, name='create_payment')
]


# Merge all URL lists into a single urlpatterns list
urlpatterns = auth_urls + product_urls + category_urls + admin_urls + \
    admin_product_urls + cart_urls + order_apis + payment_apis

# Serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
