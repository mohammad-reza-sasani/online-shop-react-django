# Generated by Django 4.0.6 on 2022-08-13 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0017_alter_phoneotp_count_send_alter_phoneotp_create_otp_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='vip_end_date',
        ),
        migrations.AddField(
            model_name='profile',
            name='vip_type',
            field=models.IntegerField(default=0),
        ),
    ]
