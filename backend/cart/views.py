from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView

from cart.models import Cart
from .serializer import AddCartModelserializer,GetCartModelSerialier
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

class AddOrUpdateCart(APIView):
    permission_classes =[IsAuthenticated]    
    def post (self,request):
        cart = Cart.objects.filter(Q(user__id=request.user.id) & Q(product__id=request.data["product"]))        
        # update
        if(cart):                        
            for object in cart:
                object.quantity = request.data["quantity"]
                object.save()
            return Response(status=status.HTTP_200_OK)
        # Add
        else :   
            serializer =AddCartModelserializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.validated_data['user'] = request.user
            serializer.save()
            count_product =  Cart.objects.filter(user__id=request.user.id).count()
            data ={"count_product":count_product}
            data.update(serializer.data)            
            return Response(data , status=status.HTTP_201_CREATED)
    

    

class GetCart(APIView):
    permission_classes =[IsAuthenticated]
    def get (self,request):
        cart = Cart.objects.filter(user__id=request.user.id)
        serializer = GetCartModelSerialier(cart,many=True,context={'request': request})        
        return Response(serializer.data , status=status.HTTP_201_CREATED)


class DeleteCart(APIView):
    permission_classes =[IsAuthenticated]
    def delete (self,request,id):
        cart = get_object_or_404(Cart,id=id)
        cart.delete()
        count_product =  Cart.objects.filter(user__id=request.user.id).count()
        data ={"count_product":count_product}           
        return Response(data,status=status.HTTP_200_OK)


class UpdateCart (APIView):
    permission_classes =[IsAuthenticated]
    def put(self,request,id,operator):
        cart = get_object_or_404(Cart,id=id)
        if operator=="+" :
            cart.quantity+=1
        elif operator == "-":
            cart.quantity -=1
        cart.save()
        return Response(status=status.HTTP_200_OK)