from datetime import timedelta , datetime

import random
from urllib import response
from .serializer import  UserModelserializer,LoginUserSerializer
from rest_framework.response import Response
from rest_framework import status , permissions,generics
from rest_framework.views import APIView 
from .models import Profile, User,PhoneOtp
from Utils import send_opt_cod
from django.db.models import Q
from knox.views import LoginView as knoxLoginView
from knox.auth import TokenAuthentication
from django.contrib.auth import login
from django.core.exceptions import ObjectDoesNotExist


#"this class for Register
# * get 2 data for register {full_name,phone_number}
# 0- if serializer.is_valid() :
#    serializer check len and not empty and *not exists in database 
# 1- create random otp-code , otp code send for user and set for password user
# 2- create User 
# 3- user.save  this method start work profile signal in model 
# this mane if user create , profile for user also create by signals
# 4- create PhoneOtp in database , fields otp = phone_number , otp_code , count_send
# if send_oyp_code  return true : return status 200 
# else return error in send otp code 
# 5- else serializer not is valid : 
# 6- return Response error"
class RegisterApiView(APIView):            
    def post(self,request):
        serializer = UserModelserializer(data=request.data)   
        if serializer.is_valid():
            #this otp send for user and set for password user 
            otp=str(random.randint(100000,999999))
            user = User.objects.create_user(full_name = request.data["full_name"] , phone_number = request.data["phone_number"] , password=otp)
            user.save()
            PhoneOtp.objects.create(user=user,phone_number=request.data['phone_number'],otp_code=otp)            
            if send_opt_cod(request.data["phone_number"],otp):
                return Response(request.data , status=status.HTTP_200_OK)
            else :
                return Response({"result":"error in send otp code"})
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def validator_data (data):    
    for name_item,value_item in data.items():            
            if data[name_item][0] :
                if len(data[name_item][0]) < int(data[name_item][1]):
                    pass           
                else :
                    return {"error":f"length-error for {name_item}"}
            else :        
                return {"error":f"empty-error for {name_item}"}
    return True 


#"this class  Verify otp_code in Register step amd return token
# *this class get 2 data from request phone_number , password(this is otp)
# 1-send data for validator_data for check not null and len
# 2-try get phone_number ; except return 400 bad request
# except mean is this phone_number not exists
# 3- if phoneOtp.otp_code == request.data["password"]
#   phoneOtp.register = True 
#   login(request , user)
#   return token
# 4- else  : return 400 bad request
class UserRegisterVerifyCod(knoxLoginView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self,request):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data['user']
        
        try:
            phoneOtp = PhoneOtp.objects.get(phone_number=request.data["phone_number"])
            testPrinter(phoneOtp.register)
        except ObjectDoesNotExist:
            return Response({"result:phone_number not exists"} , status=status.HTTP_404_NOT_FOUND)
        
        if str(phoneOtp.otp_code)==request.data["password"]:            
            phoneOtp.register = True;
            phoneOtp.save()
                     
            login(request , user)
            # return super().post(request , format=None)
            token = super().post(request , format=None) 
            return Response({"token":token.data['token'] ,'user_id':user.id,'full_name':user.full_name} , status=status.HTTP_200_OK)
            
        else :
            # otp not match
            return Response({"result:otp not exists"} , status=status.HTTP_400_BAD_REQUEST)
    


#"this class send otp code for login 
#take one data from request "phone_number"
#1-if phone_number : 
# make otp random
# try get data from table phoneOtp ; except 400 bad request
#   if self.calculate_date_otp(phone_otp) return true 
#       update phoneOtp.otp_code and update phoneOtp.user.set_password(otp)
#       #phoneOtp have relation by user
#       
#       if send_otp_code(phone_number , otp)  # if send sms 
#           return true
#       else :
#           return problem in send otp  400 bad request
#   else : 
#       return please try agin lader 
#       #its mean user try send sms More than 10
# else :
#       return problem phone number not set in request "


class GetPhoneForSendOtpLogin(APIView):
    def post (self , request ):
        phone_number = request.data["phone_number"];
        print(request.data)
        if phone_number:
            otp=str(random.randint(100000,999999))
            
            try:
                phoneOtp = PhoneOtp.objects.get(phone_number=request.data["phone_number"])
            except ObjectDoesNotExist:
                return Response({"result:phone_number not exists"} , status=status.HTTP_400_BAD_REQUEST)
            
            if self.calculate_date_otp(phoneOtp):                
                phoneOtp.otp_code = otp                      
                phoneOtp.save()
                phoneOtp.user.set_password(otp)
                phoneOtp.user.save()
                                            
                if send_opt_cod(phone_number,otp):
                    return Response({"result":True} , status=status.HTTP_200_OK)
                else :
                    return Response({"result":"problem in send otp code"} , status=status.HTTP_400_BAD_REQUEST)

            else : 
                return Response({"result":"please try agin lader"} , status=status.HTTP_400_BAD_REQUEST)
        else :
            return Response({"result":"problem phone number not set in request"}, status=status.HTTP_400_BAD_REQUEST)

#this method calculate date otp : To manage the number of sms sent
    def calculate_date_otp (self , phoneOtp):
        create_otp = phoneOtp.create_otp
        otp_count = int(phoneOtp.count_send)
        otp_date = create_otp.replace(tzinfo=None)
        now_time = datetime.now()
        calculate_date =now_time-otp_date

        # if user try send sms more then 10 in one day 
        if calculate_date < timedelta(days=1) and otp_count >= 10 :
            return False
        # after one day must rest count send sms 
        elif calculate_date > timedelta(days=1):
            phoneOtp.count_send = 1
            phoneOtp.save()

            return True
        # when sms send count_send + 1 
        else :
            phoneOtp.count_send += 1
            return True



#"this class for login and return token 
# get 2 data for login  {phone_number , password}"
class LoginAPI (knoxLoginView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self , request , format = None):        
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data['user']
        login(request , user)
        # return super().post(request , format=None)
        token = super().post(request , format=None) 
        return Response({"token":token.data['token'] ,'user_id':user.id,'full_name':user.full_name} , status=status.HTTP_200_OK)


class CreateVipApi(APIView):    
    permission_classes = (permissions.IsAuthenticated,)    
    def post(self,request):                        
        vip_type = request.data["vip_type"]
        now_time = datetime.now()
        phone_number = request.user.phone_number
        profile = Profile.objects.get(user__phone_number=phone_number)
        profile.vip_start_date = now_time
        profile.vip = True
        profile.vip_type = int(vip_type)
        profile.save()
        return Response({"result":"vip update"})
        
                


class CheckVipApi(APIView):    
    permission_classes = (permissions.IsAuthenticated,)
    def post(self,request):        
        phone_number = request.user.phone_number
        profile = Profile.objects.get(user__phone_number=phone_number)        
        
        if self.calculate_date_vip(profile) and  profile.vip:
            return Response({"vip":True},status=status.HTTP_200_OK)
        else :
            return Response({"vip":False},status=status.HTTP_200_OK)


    def calculate_date_vip (self , profile):
        type_vip = profile.vip_type
        create_start = profile.vip_start_date 
        vip_date = create_start.replace(tzinfo=None)
        now_time = datetime.now()
        calculate_date =now_time-vip_date

        if calculate_date < timedelta(days=type_vip):
            return True
        else :
            profile.vip = False
            profile.save()
            return False





def testPrinter (value):
    print("-"*30)
    print(value)
    print("-"*30)











