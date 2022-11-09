
from rest_framework.views import APIView 
from rest_framework import status 
from rest_framework.response import Response
from .models import Artical
from rest_framework.response import Response
from accounts.models import Profile, User
from knox.auth import TokenAuthentication
from .serializer import AllArticalModelserializer
from django.shortcuts import get_object_or_404


# user must have vip to access vip artical
# user profile model have vip field

class ArticalApi(APIView):
    authentication_classes = (TokenAuthentication, )
    def get(self , request , id):        
        #get artical 
        artical = get_object_or_404(Artical,id=id)
        #get artical is vip , type is boolean
        vip_artical = artical.vip_artical
        
        
        # this data show when articale is normal or artical is vip and user have vip account
        full_artical = artical.values("title","category","writer","short_description","create","update","description","key_words",)
        
        # this data show when artical is vip and user dont have vip account
        short_artical = artical.values("title","category","writer","short_description","create","update","key_words",)
        
        # check artical is vip 
        if vip_artical : 
            #user is authenticated
            if request.user.is_authenticated :
                # check user have vip by id user
                if Profile.objects.get(user = request.user.id).vip:                        
                    return Response(full_artical, status =status.HTTP_200_OK)
                else :
                    return Response(short_artical , status =status.HTTP_200_OK)
            else :
                return Response(short_artical , status =status.HTTP_200_OK)
        else :
            return Response(full_artical , status =status.HTTP_200_OK)

class GetAllArtical (APIView):
    def get (self,request):
        artical = Artical.objects.all()
        serializers = AllArticalModelserializer(artical,many=True)[:0]
        return Response(serializers.data , status=status.HTTP_200_OK)
        