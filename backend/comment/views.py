from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .serializer import GetCommentSerializer,AddCommentModelserializer,AddReplyCommentModelSerializer
from .models import Comment
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

# class GetComments (APIView):
#     def get (self,request,id):
#         comment = Comment.objects.filter(Q(product__id=id) & Q(reply=None) & Q(status=True))
#         serializer = GetCommentSerializer(comment,many=True)
#         return Response(serializer.data , status=status.HTTP_200_OK)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 10

class GetComments (generics.ListAPIView):    
        # queryset = Product.objects.filter(category=8)
        serializer_class = GetCommentSerializer
        pagination_class = StandardResultsSetPagination
        lookup_url_kwarg = "id"
        
        def get_queryset(self):
            id_product = self.kwargs.get(self.lookup_url_kwarg)
            comment = Comment.objects.filter(Q(product__id=id_product) & Q(reply=None) & Q(status=True)).order_by("-id")        
            return comment




class AddComment (APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        serializer = AddCommentModelserializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user']=request.user
        serializer.save()
        return Response(status=status.HTTP_200_OK)

class AddReplyComment(APIView):
    permission_classes=[IsAuthenticated]
    def post (self , request):
        serializer = AddReplyCommentModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user']=request.user                             
        serializer.save()        
        return Response(status=status.HTTP_200_OK)