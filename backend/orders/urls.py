from django.urls import path
from .views import CreateOrders,GetOrders

app_name = "orders"

urlpatterns = [
    path('order-add' , CreateOrders.as_view() , name="order"),
    path('order-get' , GetOrders.as_view() , name="order_get")
]