from rest_framework import serializers
from .models import Cart
from products.models import Product

class ProductModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=Product        
        fields = ['name','category','sub_category','free','price','discount_price','discount','image','amount'] 


class AddCartModelserializer(serializers.ModelSerializer):
    
    class Meta : 
        model=Cart        
        fields = ['product','user', 'quantity'] 
        read_only_fields = ['user']


class GetCartModelSerialier(serializers.ModelSerializer):
    product = ProductModelserializer()
    class Meta :
        model=Cart
        fields = ['id','product','user', 'quantity']         
