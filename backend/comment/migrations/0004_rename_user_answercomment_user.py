# Generated by Django 4.0.6 on 2022-09-19 11:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0003_alter_answercomment_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answercomment',
            old_name='User',
            new_name='user',
        ),
    ]
