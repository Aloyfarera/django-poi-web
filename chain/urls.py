# chains/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('list_chain/', views.show_list_chain, name='list_chain'),
    path('map/<str:chain_id>/', views.map_view, name='item_detail_map'),
    path('b_category/<str:b_category>/', views.map_view_b_category, name='b_category_map'),
    path('api/locations', views.LocationsList.as_view(), name='api-locations-all'),
    path('api/locations/chain/<str:chain_id>/', views.LocationsList.as_view(), name='api-locations-detail'),
    path('api/locations/b_category/<str:b_category>/', views.LocationsList.as_view(), name='api-locations-category')
]
