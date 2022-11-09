from django.urls import path
from .views import ArticalApi,GetAllArtical

app_name = "article"

urlpatterns = [
    # single artical
    path('artical-api/<int:id>' , ArticalApi.as_view()  , name="artical"),
    
    #all artical 
    path('all-artical-api' , GetAllArtical.as_view(), name="all-artical")
    
]