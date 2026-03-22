from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Instructor, Location, Group, Event, Sponsor, News
from .serializers import *

class InstructorViewSet(viewsets.ReadOnlyModelViewSet):
    # ... (existing code remains SAME)
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class SponsorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sponsor.objects.filter(is_active=True) # Solo activos
    serializer_class = SponsorSerializer    

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ContactView(APIView):
    def post(self, request):
        nombre = request.data.get('nombre')
        email = request.data.get('email')
        mensaje = request.data.get('mensaje')
        
        if not nombre or not email or not mensaje:
            return Response({"error": "Todos los campos son obligatorios"}, status=status.HTTP_400_BAD_REQUEST)
        
        subject = f"Nuevo mensaje de contacto de {nombre}"
        body = f"Nombre: {nombre}\nEmail: {email}\n\nMensaje:\n{mensaje}"
        
        try:
            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            return Response({"message": "Mensaje enviado correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Error al enviar el mensaje: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
