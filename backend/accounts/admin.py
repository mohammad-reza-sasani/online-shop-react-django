from django.contrib.auth.models import Group
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserCreationForm ,UserChangedFrom
from .models import User,Profile,PhoneOtp

class UserAdmin (BaseUserAdmin):
    form = UserChangedFrom
    add_form = UserCreationForm

    list_display = ('full_name','phone_number','is_admin',)
    list_filter = ('is_admin',)

    fieldsets = (
        ('User info' , {'fields':('phone_number' , 'full_name' , 'password',)}),
        ('Permissions',{'fields':('is_active' , 'is_admin' , 'last_login',)}),
    )

    add_fieldsets = (
        ('Create User ',{'fields':('full_name','phone_number','password1' , 'password2',)}),
    )

    search_fields = ('full_name' , 'phone_number',)

    ordering = ('full_name','phone_number',)

    filter_horizontal = ()



admin.site.unregister(Group)
admin.site.register(User,UserAdmin)


@admin.register(Profile)
class ProfileAdmin (admin.ModelAdmin):
    list_display=['user']


@admin.register(PhoneOtp)
class PhoneOtpAdmin(admin.ModelAdmin):
    list_display=['user','phone_number','otp_code','register','create_otp']
    