# Generated by Django 4.0.6 on 2022-09-21 05:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0006_remove_comment_answer_comment_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='answer',
        ),
        migrations.DeleteModel(
            name='AnswerComment',
        ),
    ]
