from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager
from django.db.models.signals import post_save
from django.utils.timezone import now


class User (AbstractBaseUser) :
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(unique=True,max_length=20)
    
    

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)


    objects = UserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ['full_name']

    def __str__(self) -> str:
        return self.full_name
    
    def has_perm (self , perm , obj=None):
        return True
    
    def has_module_perms(self , app_label):
        return True
    
    @property
    def is_staff(self):
        return self.is_admin


class Profile(models.Model) :
    user = models.ForeignKey(User, on_delete= models.CASCADE)    
    profile_image = models.ImageField(null=True , blank=True)
    level = models.CharField(max_length=50,default="user")

    def __str__(self) -> str:
        return self.user.full_name

def save_profile_and_otp(sender , **keywargs):
    if keywargs['created']:
        
        profile_user = Profile(user = keywargs['instance'])
        profile_user.save()
        
    else :
        pass

post_save.connect(save_profile_and_otp , sender=User)

    
class PhoneOtp(models.Model) :
    user = models.ForeignKey(User, on_delete= models.CASCADE,null=True)
    phone_number = models.CharField(max_length=20 , unique=True )
    otp_code = models.PositiveSmallIntegerField()
    create_otp = models.DateTimeField(auto_now_add=True)
    count_send = models.IntegerField(default=0)
    register = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.count_send += 1
        self.create_otp = datetime.now()
        super().save(*args, **kwargs)  # Call the "real" save() method.


    def __str__(self) -> str:
        return self.user.full_name


class Teacher (models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE,null=True)
    about_teacher = models.TextField()