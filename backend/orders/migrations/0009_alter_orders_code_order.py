# Generated by Django 4.0.6 on 2022-09-17 12:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0008_alter_orders_code_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='code_order',
            field=models.IntegerField(default=uuid.uuid4, max_length=64),
        ),
    ]
