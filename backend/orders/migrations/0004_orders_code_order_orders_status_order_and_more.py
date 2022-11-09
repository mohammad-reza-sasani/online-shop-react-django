# Generated by Django 4.0.6 on 2022-09-17 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_remove_product_url_files_and_more'),
        ('orders', '0003_alter_orders_first_name_alter_orders_last_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='code_order',
            field=models.CharField(blank=True, editable=False, max_length=100, unique=True),
        ),
        migrations.AddField(
            model_name='orders',
            name='status_order',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='itemorder',
            name='orders',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='orders.orders'),
        ),
        migrations.AlterField(
            model_name='itemorder',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='products.product'),
        ),
    ]
