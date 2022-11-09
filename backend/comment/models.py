from django.db import models
from accounts.models import User
from products.models import Product

class Comment(models.Model) :
    user = models.ForeignKey(User,on_delete=models.CASCADE)    
    product = models.ForeignKey(Product , on_delete=models.CASCADE)
    reply = models.ForeignKey("self",on_delete=models.CASCADE , null=True , blank=True)    
    description = models.CharField(max_length=500)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default=False)

    def children(self):
        return Comment.objects.filter(reply=self)  
    
    @property
    def is_parent(self):
        if self.reply is not None:            
            return False
        return True
    
    def __str__(self) :
        return self.user.full_name