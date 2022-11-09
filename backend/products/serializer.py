from .models import Product,CategoryProduct,FilesProduct
from rest_framework import serializers

class ProductModelserializer(serializers.ModelSerializer):        
    class Meta : 
        model=Product                        
        fields = ['id','name','category','sub_category','writer','short_description' ,'description','create','update','free','price','discount_price','discount','image','amount','key_words'] 

    



class FileProductModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=FilesProduct
        fields = ["id","name","file_product"]
        #fields = ['name','description' ] 

class FileProductUnlinkModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=FilesProduct
        fields = ["id","name"]
        #fields = ['name','description' ] 

class CategoriesModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=CategoryProduct        
        fields = ['id','name','image' ] 