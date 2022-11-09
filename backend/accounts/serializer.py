from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from .models import User,PhoneOtp

class UserModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=User
        # fields = "__all__"
        fields = ['full_name','phone_number'] 

        extra_kwargs = {
                'phone_number': {
                    'validators': [
                        UniqueValidator(
                            queryset=User.objects.all(),
                            message="exists"
                        )
                    ]
                }
            }

class PhoneOtpModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=PhoneOtp
        fields = ["phone_number","otp_code"]

class LoginUserSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        if phone_number and password:
            if User.objects.filter(phone_number=phone_number).exists():
                user = authenticate(request=self.context.get('request'),
                                    phone_number=phone_number, password=password)
                
            else:
                msg = {'detail': 'phone_number number is not registered.',
                       'register': False}
                raise serializers.ValidationError(msg)

            if not user:
                msg = {
                    'detail': 'Unable to log in with provided credentials.', 'register': True}
                raise serializers.ValidationError(msg, code='authorization')

        else:
            msg = 'Must include "username" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

