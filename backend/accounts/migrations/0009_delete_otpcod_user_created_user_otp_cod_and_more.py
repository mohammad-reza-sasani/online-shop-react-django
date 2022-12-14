# Generated by Django 4.0.6 on 2022-07-31 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_remove_user_register'),
    ]

    operations = [
        migrations.DeleteModel(
            name='OtpCod',
        ),
        migrations.AddField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='user',
            name='otp_cod',
            field=models.PositiveSmallIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='register',
            field=models.BooleanField(default=False),
        ),
    ]
