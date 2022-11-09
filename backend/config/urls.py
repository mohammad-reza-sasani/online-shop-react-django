"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include , re_path
from django.conf import settings
from django.conf.urls.static import static




urlpatterns = [
    path('admin/', admin.site.urls),
    path('user-api/',include('accounts.urls',namespace='user')), 
    path('products-api/',include('products.urls',namespace='products')),    
    path('orders-api/',include('orders.urls',namespace="orders")),    
    path('cart-api/',include('cart.urls',namespace="cart")),
    path('forum-api/',include('forum.urls',namespace="forum")),
    path('comment-api/',include('comment.urls',namespace="comment"))
]+  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
