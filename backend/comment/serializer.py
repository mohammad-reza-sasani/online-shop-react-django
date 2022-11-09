from rest_framework import serializers 
from rest_framework.serializers import SerializerMethodField
from .models import Comment 
from django.db.models import Q


class CommentChildSerializer(serializers.ModelSerializer):
    reply_id = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(),source='reply.id')
    user = SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('user', 'description', 'id','reply_id')

    def get_user(self, obj):
        return obj.user.full_name

class GetCommentSerializer(serializers.ModelSerializer):
    reply_count = SerializerMethodField()
    user = SerializerMethodField()
    replies = SerializerMethodField()    
    class Meta:
        model = Comment
        fields = ('id','description', 'reply', 'user', 'reply_count', 'replies')

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0

    def get_user(self, obj):
        return obj.user.full_name

    def get_replies(self, obj):
        if obj.is_parent:            
            c = Comment.objects.filter(Q(reply = obj.id ) & Q(status=True))
            return CommentChildSerializer(c, many=True).data
        return None

class AddCommentModelserializer(serializers.ModelSerializer):
    class Meta : 
        model=Comment        
        fields = ['user','product','description' ] 
        read_only_fields = ("user",)

class AddReplyCommentModelSerializer(serializers.ModelSerializer):
    class Meta :
        model = Comment
        fields = ['user','product','description' ,'reply'] 
        read_only_fields = ("user",)