from rest_framework import serializers
from .models import LpMaster

class LpMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = LpMaster
        fields = '__all__'