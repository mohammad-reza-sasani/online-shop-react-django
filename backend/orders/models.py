from django.db import models
from accounts.models import User
from products.models import Product

class Orders(models.Model) :    
    customer = models.ForeignKey(User,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)    
    city = models.CharField(max_length=100,null=True , blank=True)
    address = models.TextField(blank=True , null=True)
    postal_code = models.CharField(max_length=50)
    order_date = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    status_order = models.BooleanField(default=False)


    def __str__(self) -> str:
        return self.customer.full_name


class ItemOrder (models.Model):
    orders = models.ForeignKey(Orders , on_delete=models.CASCADE ,related_name='items')
    customer = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE ,related_name='product')
    quantity = models.IntegerField(null=True , blank=True)

    def __str__(self) -> str:
        return self.customer.full_name

