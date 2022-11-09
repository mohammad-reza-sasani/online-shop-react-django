import random
from django.shortcuts import render
from django.views import View
from .serializer import  UserModelserializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from .models import User 
from Utils import send_opt_cod
from django.db.models import Q

from accounts import serializer
# Create your views here.

from django.shortcuts import get_object_or_404



class RegisterApiView(APIView):    
        
    def post(self,request):        
        serializerUser = UserModelserializer(data=request.data)                
        # testPrinter(serializerUser.is_valid())        
        print(request.data.get('phone_number',None))
        if serializerUser.is_valid():
            testPrinter(serializerUser)
            otp_code = ''
            testPrinter("if 1")                    
            # user = get_object_or_404(User, phone_number = serializerUser["phone_number"])            
            # user = User.objects.get(phone_number = serializerUser["phone_number"]).exists()
            user = User.objects.filter(phone_number = serializerUser.data["phone_number"]).exists()
            testPrinter(user)
            if  user and user.register :                                
                testPrinter("if 1")            
                return Response({"status":"got to login"} , status=status.HTTP_200_OK)
            elif user and not user.register : 
                otp_code = str(random.randint(100000,999999))    
                testPrinter("if 2")            
                return Response({"status":"send otp code for user and update otp cod"} , status=status.HTTP_200_OK)
            # else :
            testPrinter("if 3")            
            otp_code = str(random.randint(100000,999999))    
            User.objects.create(full_name=request['full_name'],phone_number=request.data['phone_number'],otp_code=otp_code)
            if send_opt_cod(request.data['phone_number'] , otp_code):
                return Response(serializerUser.data , status=status.HTTP_200_OK)
        testPrinter("test")
        return Response( serializerUser.errors , status=status.HTTP_400_BAD_REQUEST)
        


class UserRegisterVerifyCod(APIView):
    def post(self,request):
        pass
        # serializerOtp = OtpCodModelserializer(data = request.data)
        # if serializerOtp.is_valid():
        #     user_session = request.session['user_registration_info']
        #     if OtpCod.objects.filter(Q(phone_number = user_session['phone_number']) & Q(code=request.data['code'])).exists():
        #         user = User.objects.create_user(phone_number=user_session["phone_number"],full_name=user_session["full_name"],password=user_session['password'])            
        #         return Response({"register":"success"},status=status.HTTP_200_OK)
        #     else :
        #         return Response({"register":"code_error"},status=status.HTTP_400_BAD_REQUEST)



def testPrinter (value):
    print("-"*30)
    print(value)
    print("-"*30)
