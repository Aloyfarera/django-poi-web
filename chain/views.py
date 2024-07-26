# chains/views.py
from django.db.models import Count
from django.shortcuts import render
from .models import LpMaster
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import LpMasterSerializer
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return render(request, 'chain/home.html')

@login_required
def show_list_chain(request):
    data = LpMaster.objects.values('chain_id').annotate(count=Count('chain_id')).order_by('chain_id')
    total_chain = len(data)
    total_rows = LpMaster.objects.count() 
    return render(request, 'chain/list_chain.html', {'data': data, 'total_chain': total_chain,'total_rows': total_rows})

class LocationsList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, chain_id=None, b_category=None, format=None):
        if b_category:
            locations = LpMaster.objects.filter(b_category=b_category)
        elif chain_id:
            locations = LpMaster.objects.filter(chain_id=chain_id)
        else:
            locations = LpMaster.objects.all()
        serializer = LpMasterSerializer(locations, many=True)
        return Response(serializer.data)
    
@login_required
def map_view(request, chain_id):
    return render(request, 'chain/home.html', {'chain_id': chain_id})

@login_required
def map_view_b_category(request, b_category):
    return render(request, 'chain/home.html', {'b_category': b_category})



    
