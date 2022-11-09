from django.urls import path
from .views import GetProductsByCategory,GetAllProductsCategorys,GetProductDetail

app_name = "products"

urlpatterns = [
    
    # path('get-products-by-category-api/<int:category_id>/<int:limit>' , GetProductsByCategory.as_view()  , name="product-by-category"),
    path('get-products-by-category-api/<int:category_id>' , GetProductsByCategory.as_view()  , name="product-by-category"),
            
    path('get-all-category' , GetAllProductsCategorys.as_view(), name="get-all-category"),

    path('get-product-detail-api/<int:id>' , GetProductDetail.as_view()  , name="product-detail")
    
    
]