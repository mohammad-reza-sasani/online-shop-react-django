from ...article.models import Artical
from rest_framework import serializers

class ArticalModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=Artical        
        fields = ["title","category", "writer","short_description","description","vip_artical","key_words"] 

class AllArticalModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=Artical        
        fields = ['title','category',"writer",'vip_artical'] 