
from django.contrib import admin
from .models import Product,CategoryProduct,SubCategoryProduct,FilesProduct

class FilesProductInline (admin.TabularInline):
    model = FilesProduct

@admin.register(Product)
class ProductAdmin (admin.ModelAdmin):
    list_display=["name",'writer','category','writer','create','amount','free','price','discount_price','discount']
    inlines = [FilesProductInline]
    


    


@admin.register(CategoryProduct)
class CategoryProductAdmin(admin.ModelAdmin):
    list_display=['name','create','update']


@admin.register(SubCategoryProduct)
class SubCategoryProductAdmin(admin.ModelAdmin):
    list_display=['name','parent_category' , 'create','update']

@admin.register(FilesProduct)
class FilesProductAdmin(admin.ModelAdmin):
    list_display = ['name' , 'product','create']