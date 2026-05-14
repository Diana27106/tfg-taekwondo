from rest_framework import serializers
from .models import Instructor, Location, Group, Event, Sponsor, News
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo de Usuario (Django Auth).
    Muestra información básica del perfil del instructor/administrador.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        read_only_fields = ['username']

class InstructorSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Instructor.
    Transforma todos los campos del instructor para su uso en la API.
    """
    class Meta:
        model = Instructor
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Location.
    Incluye un campo calculado 'groups' para listar los grupos asociados a la sede.
    """
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
    """
    Serializer para el modelo Group.
    Incluye el nombre del instructor para facilitar la visualización en el frontend.
    """
    # Esto traerá el nombre del instructor en lugar de solo su ID
    instructor_name = serializers.ReadOnlyField(source='instructor.name')
    
    class Meta:
        model = Group
        fields = ['id', 'age_range', 'schedule', 'instructor', 'instructor_name', 'locations']

class EventSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Event.
    Maneja la serialización de eventos del club.
    """
    class Meta:
        model = Event
        fields = '__all__'

class SponsorSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Sponsor.
    Maneja la información de las empresas colaboradoras.
    """
    class Meta:
        model = Sponsor
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo News.
    Maneja la información de las noticias y entradas del blog.
    """
    class Meta:
        model = News
        fields = '__all__'