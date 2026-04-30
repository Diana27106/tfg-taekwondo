from rest_framework import serializers
from .models import Instructor, Location, Group, Event, Sponsor, News
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        read_only_fields = ['username']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    # Relación inversa: una sede tiene muchos grupos
    # Usamos GroupSerializer para traer el detalle de los grupos
    groups = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ['id', 'name', 'address', 'city', 'google_maps_url', 'photo', 'groups']

    def get_groups(self, obj):
        from .serializers import GroupSerializer # Importación tardía para evitar circular dependency si fuera el caso
        return GroupSerializer(obj.groups.all(), many=True).data

class GroupSerializer(serializers.ModelSerializer):
    # Esto traerá el nombre del instructor en lugar de solo su ID
    instructor_name = serializers.ReadOnlyField(source='instructor.name')
    
    class Meta:
        model = Group
        fields = ['id', 'age_range', 'schedule', 'instructor', 'instructor_name', 'locations']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'