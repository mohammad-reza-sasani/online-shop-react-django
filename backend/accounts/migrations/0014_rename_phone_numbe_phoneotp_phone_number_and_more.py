# Generated by Django 4.0.6 on 2022-08-07 14:50

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_phoneotp_remove_user_create_otp_remove_user_otp_code_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='phoneotp',
            old_name='phone_numbe',
            new_name='phone_number',
        ),
        migrations.AlterField(
            model_name='profile',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='profile',
            name='vip_end_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='vip_start_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
