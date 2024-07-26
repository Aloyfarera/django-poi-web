# lokasi_pintar/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('chain.urls')),
    path('', include('autenthication.urls')),
    
]
