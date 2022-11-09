from django.urls import path
from .views import LoginAPI, RegisterApiView,UserRegisterVerifyCod,GetPhoneForSendOtpLogin,CreateVipApi,CheckVipApi
from knox import views as knox_views


app_name = "accounts"

urlpatterns = [    
    path('register-api' , RegisterApiView.as_view() , name="register"),
    path('register-verify-cod-api' , UserRegisterVerifyCod.as_view() , name="register-verify-cod"),
    # send otp cod  for login
    path('login-phone-api' , GetPhoneForSendOtpLogin.as_view()),
    # login
    path('login-opt-check-api' , LoginAPI.as_view()),
    path('logout-api',knox_views.LogoutView.as_view()),

    path('vip-create-api', CreateVipApi.as_view()),
    
    path('check-vip-api', CheckVipApi.as_view())

    
    
]