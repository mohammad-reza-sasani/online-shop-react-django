from cart.models import Cart
from products.models import Product
from .models import Orders,ItemOrder
from rest_framework import serializers



class ProductModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=Product        
        fields = ['name','category','sub_category','create','update','price','discount_price','discount','image'] 



class ItemOrderModelserializer(serializers.ModelSerializer):
    product = ProductModelserializer()
    class Meta : 
        model=ItemOrder        
        fields = ['orders','customer','product','quantity','product'] 


class OrdersModelserializer(serializers.ModelSerializer):
    items = ItemOrderModelserializer(many=True)
    class Meta : 
        model=Orders        
        fields = ['id','customer','first_name','last_name','city','address','postal_code','status_order' ,'items'] 
    
    def save(self, **kwargs):
        return super().save(**kwargs)

class CreateOrderSerializer (serializers.ModelSerializer):
    class Meta:
        model=Orders        
        fields = ['customer','first_name','last_name','city','address','postal_code' ]         
        read_only_fields =('customer',)
  

