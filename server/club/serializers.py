from rest_framework import serializers
from .models import Instructor, Location, Group, Event, Sponsor, News

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

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