# Generated by Django 4.0.6 on 2022-09-17 12:33

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_remove_orders_order_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='code_order',
            field= models.CharField(max_length = 100,blank=True,editable=False,)
        ),
    ]