
from django.db import models
from accounts.models import User

class ForumQuestion(models.Model) :
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)


class ForumAnswer(models.Model):
    question=models.ForeignKey(ForumQuestion,on_delete=models.CASCADE)
    answer = models.ForeignKey("self",default=None , null=True , blank=True,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    description = models.CharField(max_length=1000) 
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)
