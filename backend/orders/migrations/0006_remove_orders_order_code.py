# Generated by Django 4.0.6 on 2022-09-17 12:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_orders_order_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='order_code',
        ),
    ]
