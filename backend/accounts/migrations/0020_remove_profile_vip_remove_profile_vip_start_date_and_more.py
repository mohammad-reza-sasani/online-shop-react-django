# Generated by Django 4.0.6 on 2022-08-31 06:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0019_teacher'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='vip',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='vip_start_date',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='vip_type',
        ),
    ]
