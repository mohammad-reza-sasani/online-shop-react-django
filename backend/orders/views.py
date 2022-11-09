
from rest_framework.views import APIView , Response 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Orders,ItemOrder
from .serializer import OrdersModelserializer,CreateOrderSerializer
from cart.models import Cart 

class GetOrders (APIView):    
    permission_classes = [IsAuthenticated]
    def get (self, request):
        orders = Orders.objects.filter(customer__id = request.user.id)
        serializer = OrdersModelserializer(orders,many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

class CreateOrders (APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):                        
        serializer = CreateOrderSerializer(data=request.data,context={"customer":request.user.id})
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['customer'] = request.user
        order = serializer.save()

        cart = Cart.objects.filter(user=request.user)
        for c in cart :
            ItemOrder.objects.create(orders=order , customer = request.user,product=c.product,quantity=c.quantity)
        # cart.delete()
        return Response(serializer.data , status=status.HTTP_200_OK)
        