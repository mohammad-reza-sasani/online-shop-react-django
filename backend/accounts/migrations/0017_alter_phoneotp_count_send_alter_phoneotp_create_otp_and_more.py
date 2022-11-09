# Generated by Django 4.0.6 on 2022-08-11 14:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_alter_phoneotp_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phoneotp',
            name='count_send',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='phoneotp',
            name='create_otp',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='phoneotp',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]