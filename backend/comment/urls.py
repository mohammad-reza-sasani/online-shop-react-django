from inspect import getcomments
from django.urls import path
from .views import GetComments , AddComment,AddReplyComment

app_name = "comment"

urlpatterns = [
    path('get-comments/<int:id>' , GetComments.as_view() , name="comments"),
    path('add-comments' , AddComment.as_view() , name="add-comment"),
    path('add-reply' , AddReplyComment.as_view() , name="reply-comment")
]