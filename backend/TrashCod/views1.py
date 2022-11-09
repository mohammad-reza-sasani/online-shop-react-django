import random
from django.shortcuts import render
from django.views import View
from .serializer import OtpCodModelserializer, UserModelserializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from .models import User , OtpCod
# Create your views here.

class RegisterApiView(APIView):
    def post(self,request):
        
        serializerOtpCod = OtpCodModelserializer(data=request.data)
        serializerUser = UserModelserializer(data=request.data)
        
        if serializerOtpCod.is_valid() and serializerUser.is_valid():
            otp_cod_creator = str(random.randint(100000,999999))      
            OtpCod.objects.create(phone_number=request.data['phone_number'],code=otp_cod_creator)
            testPrinter(request.data['full_name'])
            request.session['user_registration_info'] = {                                
                'full_name' : request.data['full_name'],
                'phone_number':request.data['phone_number'],
                'password': '000000'
            }
            return Response({[serializerOtpCod.data , serializerUser.data]} , status=status.HTTP_200_OK)
        
        if serializerOtpCod.errors and not serializerUser: 
            return Response(serializerOtpCod.errors , status=status.HTTP_400_BAD_REQUEST)    
        elif serializerUser.errors and not serializerOtpCod.errors:
            return Response( serializerUser.errors , status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({[serializerOtpCod.errors, serializerUser.errors]} , status=status.HTTP_400_BAD_REQUEST)


class UserRegisterVerifyCod(APIView):
    def post(self,request):        
        user_session = request.session['user_registration_info']
        testPrinter(user_session)
        if OtpCod.objects.filter(code=request.data['code']).exists():
            user = User.objects.create_user(phone_number=user_session["phone_number"],full_name=user_session["full_name"],password=user_session['password'])            
            return Response({"register":"success"},status=status.HTTP_200_OK)
        else :
            return Response({"register":"code_error"},status=status.HTTP_400_BAD_REQUEST)



def testPrinter (value):
    print("-"*30)
    print(value)
    print("-"*30)