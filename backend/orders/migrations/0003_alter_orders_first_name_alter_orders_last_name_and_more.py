# Generated by Django 4.0.6 on 2022-09-15 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_orders_first_name_orders_last_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='first_name',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='orders',
            name='last_name',
            field=models.CharField(default='test', max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='orders',
            name='postal_code',
            field=models.CharField(default='test', max_length=50),
            preserve_default=False,
        ),
    ]