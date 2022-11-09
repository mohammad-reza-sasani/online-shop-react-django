from django.db import models
from accounts.models import User
from products.models import Product


class Cart(models.Model) :
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_cart')
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self) :
        return  self.user.full_name