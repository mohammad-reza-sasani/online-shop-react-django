# Generated by Django 4.0.6 on 2022-09-19 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0004_rename_user_answercomment_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answercomment',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]