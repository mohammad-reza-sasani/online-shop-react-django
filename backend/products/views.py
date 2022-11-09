from itertools import product
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView,status
from .serializer import ProductModelserializer,CategoriesModelserializer,FileProductModelserializer,FileProductUnlinkModelserializer
from .models import Product,CategoryProduct,FilesProduct
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from orders.models import ItemOrder
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics

# get all product Category

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 10

class GetProductsByCategory (generics.ListAPIView):    
        # queryset = Product.objects.filter(category=8)
        serializer_class = ProductModelserializer
        pagination_class = StandardResultsSetPagination
        lookup_url_kwarg = "category_id"
        
        def get_queryset(self):
            category = self.kwargs.get(self.lookup_url_kwarg)
            products = Product.objects.filter(category=category).order_by("-id") 
            return products

class GetAllProductsCategorys (APIView):
    def get (self,request):
        category = CategoryProduct.objects.all()
        serializer = CategoriesModelserializer(category,many=True,context={'request': request})
        return Response(serializer.data , status=status.HTTP_200_OK)



# class GetProductsByCategory (APIView):
#     def get (self,request,category_id ,limit):        
#         products = Product.objects.filter(category=category_id)[limit-3:limit]
#         serializer = ProductModelserializer(products,many=True,context={'request': request})
#         print("-"*20)
#         print(serializer.data[0])
#         return Response(serializer.data , status=status.HTTP_200_OK)

# class GetProductDetail (APIView):
    # authentication_classes = (TokenAuthentication, )
    # def get(self, request ,id):

    #     try :                
    #         product = Product.objects.filter(id=id)
    #     except ObjectDoesNotExist:
    #         return Response({"error":"Product not found"})

    #     name = None
    #     category = None
    #     free = None
        
    #     for cat in product:
    #         category = cat.category
    #         free = cat.free()
    #         name = cat.name



        

    #     if  category.name == "artical":
    #         if free:                
    #             serializer = ProductModelserializer(product,many=True )                
    #             return Response(serializer.data , status=status.HTTP_200_OK)

    #         elif not free and not request.user.is_authenticated:                
    #             print(len(product.values()))
    #             data = list(product.values('name','category','sub_category','writer','short_description' ,'create','update','price','discount','image','amount','key_words',))                
    #             print(len(data))
    #             return Response(data , status=status.HTTP_200_OK)
    #     #     #insert value for test


class GetProductDetail (APIView):
    authentication_classes = (TokenAuthentication, )
    def get(self, request ,id):
        
        product = get_object_or_404(Product,id=id)        

        if  product.category.id == 11:            
            if product.free():                
                serializer = ProductModelserializer(product,context={'request': request})
                return Response( serializer.data , status=status.HTTP_200_OK)

            elif not product.free() and not request.user.is_authenticated:                
                serializer = ProductModelserializer(product,context={'request': request})   
                data = serializer.data
                del data["description"]
                return Response( data , status=status.HTTP_200_OK)
            
            elif not product.free() and request.user.is_authenticated:                
                order = ItemOrder.objects.filter(Q(customer__id = request.user.id) & Q(product__id = product.id)).exists()
                if order:
                    serializer = ProductModelserializer(product)
                    return Response( serializer.data , status=status.HTTP_200_OK)
                else :
                    serializer = ProductModelserializer(product)   
                    data = serializer.data
                    del data["description"]
                    return Response( data , status=status.HTTP_200_OK)
        ############################################################################
        elif product.category.id == 8 or product.category.id == 9:            
            serializer = ProductModelserializer(product,context={'request': request})                                   
            return Response( serializer.data , status=status.HTTP_200_OK)
        
        ##########################################################################33
        elif product.category.id == 10:
            if product.free():                
                fileProduct = FilesProduct.objects.filter(product__id = product.id)
                serializerProduct = ProductModelserializer(product,context={'request': request})
                serializerFileProduct = FileProductModelserializer(fileProduct,many=True,context={'request': request})
                data = [serializerProduct.data , serializerFileProduct.data]
                return Response(data , status=status.HTTP_200_OK)
            
            
            #product not free and user not login 
            #return product detail and file product not by download link just name file 
            elif not product.free() and not request.user.is_authenticated:
                fileProduct = FilesProduct.objects.filter(product__id = product.id)
                serializerProduct = ProductModelserializer(product,context={'request': request})
                serializerFileProduct = FileProductUnlinkModelserializer(fileProduct,many=True,context={'request': request})
                data = [serializerProduct.data , serializerFileProduct.data]
                return Response(data , status=status.HTTP_200_OK)

                
            #product not free and user login
            #if user order have this product return product and link
            #else user order dont have this product return product and just name file 
            elif not product.free() and request.user.is_authenticated:                
                order = ItemOrder.objects.filter(Q(customer__id = request.user.id) & Q(product__id = product.id)).exists()
                if order:
                    fileProduct = FilesProduct.objects.filter(product__id = product.id)
                    serializerProduct = ProductModelserializer(product,context={'request': request})
                    serializerFileProduct = FileProductModelserializer(fileProduct,many=True,context={'request': request})
                    data = [serializerProduct.data , serializerFileProduct.data]
                    return Response(data , status=status.HTTP_200_OK)
                else :
                    fileProduct = FilesProduct.objects.filter(product__id = product.id)
                    serializerProduct = ProductModelserializer(product,context={'request': request})
                    serializerFileProduct = FileProductUnlinkModelserializer(fileProduct,many=True,context={'request': request})
                    data = [serializerProduct.data , serializerFileProduct.data]
                    return Response(data , status=status.HTTP_200_OK)

                

