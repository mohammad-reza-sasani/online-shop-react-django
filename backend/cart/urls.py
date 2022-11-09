from django.urls import path
from .views import AddOrUpdateCart,DeleteCart,GetCart,UpdateCart

app_name = "cart"

urlpatterns = [
    path('add-or-update-cart' , AddOrUpdateCart.as_view() , name="add_cart"),
    path('get-cart' , GetCart.as_view() , name="get_cart"),
    path('delete-cart/<int:id>' , DeleteCart.as_view() , name="delete_cart"),
    path('update-cart/<int:id>/<str:operator>' , UpdateCart.as_view() , name="delete_cart")
]