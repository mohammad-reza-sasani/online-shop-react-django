# Generated by Django 4.0.6 on 2022-09-21 09:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0008_comment_is_reply_comment_reply'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='is_reply',
        ),
    ]
