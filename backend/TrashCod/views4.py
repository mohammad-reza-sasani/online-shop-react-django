from datetime import timedelta , datetime
import random
from .serializer import  UserModelserializer,LoginUserSerializer
from rest_framework.response import Response
from rest_framework import status , permissions,generics
from rest_framework.views import APIView 
from .models import User,PhoneOtp
from Utils import send_opt_cod
from django.db.models import Q
from knox.views import LoginView as knoxLoginView
from knox.auth import TokenAuthentication
from django.contrib.auth import login


#"this class for Register
# * get 2 data for register {full_name,phone_number}
# 0- if serializer.is_valid() :
#    serializer check len and not empty and *not exists in database 
# 1- create random otp-code , otp code send for user and set for password user
# 2- create User 
# 3- user.save  this method start work profile signal in model 
# this mane if user create , profile for user also create by signals
# 4- create PhoneOtp in database , fields otp = phone_number , otp_code , count_send
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


#"this class  Verify otp_code in Register step
# *this class get 2 data from request phone_number , password(this is otp)
# 1-send data for validator_data for check not null and len
# 2-check phone_number exists in phoneOtp table
# 3-if phone_number exists :
# 4-   if filter(otp_code=request.data['otp_code']).exists :
# 5-       PhoneOtp field register = True
# 6-       return Response(200})
# 7-   else : otp not math
# 8-else : phone_number not exists"
class UserRegisterVerifyCod(knoxLoginView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self,request):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data['user']
        
        if PhoneOtp.objects.filter(phone_number=request.data["phone_number"]).exists():
            if PhoneOtp.objects.filter(otp_code=request.data["password"]).exists():
                PhoneOtp.objects.filter(phone_number=request.data["phone_number"]).update(register=True)
                login(request , user)
                return super().post(request , format=None)
            else :
                # otp not match
                return Response({"result:otp not exists"} , status=status.HTTP_400_BAD_REQUEST)
        else :
            return Response({"result:phone_number not exists"} , status=status.HTTP_400_BAD_REQUEST)
    

class SendOtpForLogin(APIView):
    def post (self , request ):
        phone_number = request.data["phone_number"];
        if phone_number:
            otp=str(random.randint(100000,999999))
            phoneOtp = PhoneOtp.objects.get(phone_number=request.data["phone_number"])
            if self.calculate_date_otp(phoneOtp):                
                phoneOtp.otp_code = otp                      
                phoneOtp.save()
                phoneOtp.user.set_password(otp)
                phoneOtp.user.save()
                                            
                if send_opt_cod(request.data["phone_number"],otp):
                    return Response({"result":True} , status=status.HTTP_200_OK)
                else :
                    return Response({"result":"problem in send otp code"} , status=status.HTTP_400_BAD_REQUEST)

            else : 
                return Response({"result":"please try agin lader"} , status=status.HTTP_400_BAD_REQUEST)
        else :
            return Response({"result":"problem phone number not set in request"}, status=status.HTTP_400_BAD_REQUEST)

    def calculate_date_otp (self , phoneOtp):
        create_otp = phoneOtp.create_otp
        otp_count = int(phoneOtp.count_send)
        otp_date = create_otp.replace(tzinfo=None)
        now_time = datetime.now()
        calculate_date =now_time-otp_date

        if calculate_date < timedelta(days=1) and otp_count >= 10 :
            return False
        else :
            phoneOtp.count_send = 1
            return True



#"this class fot login and return token 
# get 2 data for login  {phone_number , password}"
class LoginAPI (knoxLoginView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self , request , format = None):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data['user']
        login(request , user)
        return super().post(request , format=None)



def testPrinter (value):
    print("-"*30)
    print(value)
    print("-"*30)











