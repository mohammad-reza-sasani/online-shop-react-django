import random
from django.forms import ValidationError
from .serializer import  UserModelserializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from .models import User 
from Utils import send_opt_cod
from django.db.models import Q
from accounts import serializer

class RegisterApiView(APIView):            
    def post(self,request):
        # testPrinter(type(request.data["full_name"]))
        data={
            "full_name":[request.data["full_name"],100],            
            "phone_number":[request.data.get("phone_number"),20],            
        }
        # testPrinter(len(data['full_name'][0]))
        if validator_data(data) == True: 
            otp_code = str(random.randint(100000,999999))   
            user = User.objects.filter(phone_number = request.data["phone_number"])
            if  user and user[0].register :
                return Response({"status":"go to login"} , status=status.HTTP_200_OK)

            elif user and not user[0].register :        
                User.objects.filter(phone_number=request.data["phone_number"]).update(otp_code=otp_code)

                if send_opt_cod(request.data['phone_number'] , otp_code):
                    return Response({"status":"send otp code for user and update otp cod"} , status=status.HTTP_200_OK)
                                    
            User.objects.create_user(full_name=request.data['full_name'],phone_number=request.data['phone_number'],password=otp_code,otp_code=otp_code)

            if send_opt_cod(request.data['phone_number'] , otp_code):
                return Response(request.data, status=status.HTTP_200_OK)

        elif validator_data(data) != True :
            return Response(validator_data(data) ,  status=status.HTTP_400_BAD_REQUEST)
        

# def validator_data (data):
#     if data['full_name'] and data['phone_number']:
#         if len(data['full_name']) < 100 and len(data['phone_number']) < 20 :
#             return True            
#         else :
#             return {"error":"length-error"}
#     else :        
#         return {"error":"empty-error"}


def validator_data (data):
    testPrinter(data)
    for name_item,value_item in data.items():            
            if data[name_item][0] :
                if len(data[name_item][0]) < int(data[name_item][1]):
                    pass           
                else :
                    return {"error":f"length-error for {name_item}"}
            else :        
                return {"error":f"empty-error for {name_item}"}
    return True 




class UserRegisterVerifyCod(APIView):
    def post(self,request): 
        data = {
            "phone_number":[request.data.get("phone_number"),20],
            #this otp for password
            "otp_cod":[request.data.get("otp_cod"),10]
        }       
        if validator_data(data):
            pass


def testPrinter (value):
    print("-"*30)
    print(value)
    print("-"*30)
