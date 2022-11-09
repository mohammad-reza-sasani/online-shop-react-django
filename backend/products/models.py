
from django.db import models
from accounts.models import User

class CategoryProduct (models.Model):
    name = models.CharField(max_length=50)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True,blank=True,upload_to = 'category')
    
    def __str__(self) -> str:
        return self.name

class SubCategoryProduct (models.Model):
    name = models.CharField(max_length=50)
    parent_category = models.ForeignKey(CategoryProduct,on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    

    def __str__(self) -> str:
        return self.name


class Product(models.Model) :
    name = models.CharField(max_length=50)
    category = models.ForeignKey(CategoryProduct , on_delete=models.CASCADE)
    sub_category = models.ManyToManyField(SubCategoryProduct)
    #creator Product    
    writer = models.ForeignKey(User , on_delete=models.CASCADE )
    #for artical product
    short_description = models.TextField(null=True , blank=True )  
    description = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)  
    free = models.BooleanField(default=True)
    price = models.IntegerField(null=True , blank=True , default=0)
    discount_price = models.IntegerField(null=True , blank=True , default=0)    
    discount =models.IntegerField(null=True , blank=True )    
    image = models.ImageField(null=True,blank=True,upload_to = 'image/artical')
    amount = models.IntegerField(null=True , blank=True , default=0)    
    key_words = models.TextField(null=True , blank=True )
    
    
    def __str__(self) -> str:
        return self.name
    
    def discount_price (self):
        if not self.discount :
            return self.price 
        else : 
            price = (self.discount * self.price) / 100 
            price = self.price - price
            return int(price)
        return self.price
    
    def free (self):
        if self.price==0:
            free = True
            return free
        else :
            free = False
            return free
   


def generate_filename(instance ,filename):
        # name = '%s/files_products_tutorial/%s'.format(instance.product.name,filename)
        name = f'files_products_tutorial/{instance.product.name}/{filename}'
        # "%s/uploads/%s" % (self.category.upper(), filename)
        return name
        
class FilesProduct (models.Model):        
    product = models.ForeignKey(Product , on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    file_product = models.FileField(upload_to=generate_filename, max_length=254,null=True,blank=True)

