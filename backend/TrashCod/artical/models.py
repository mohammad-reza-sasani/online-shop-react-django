# from django.db import models
# from accounts.models import User

# class CategoryArtical (models.Model):
#     name = models.CharField(max_length=50)
#     create = models.DateTimeField(auto_now_add=True)
#     update = models.DateTimeField(auto_now=True)
#     image = models.ImageField(null=True,blank=True,upload_to = 'category')

#     def __str__(self) -> str:
#         return self.name

# class Artical(models.Model) :
#     title = models.CharField(max_length=50)
#     category = models.ManyToManyField(CategoryArtical)
#     writer = models.ForeignKey(User , on_delete=models.CASCADE )
#     short_description = models.TextField(null=True , blank=True )  
#     create = models.DateTimeField(auto_now_add=True)
#     update = models.DateTimeField(auto_now=True)  
#     description = models.TextField()
#     vip_artical = models.BooleanField(default=False)
#     # for seo
#     key_words = models.TextField()
    
    