from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Instructor, Location, Group, Event, Sponsor, News, ChatQuery, ChatDocument
from .serializers import *
from django.contrib.admin.models import LogEntry
from django.contrib.contenttypes.models import ContentType
import requests
import json

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class SponsorViewSet(viewsets.ModelViewSet):
    queryset = Sponsor.objects.filter(is_active=True) # Solo activos
    serializer_class = SponsorSerializer    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContactView(APIView):
    permission_classes = [permissions.AllowAny]
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

class ChatbotView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        pregunta = request.data.get('pregunta')
        if not pregunta:
            return Response({"error": "No se proporcionó ninguna pregunta"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Reenviar la pregunta al webhook de n8n
            response = requests.post(
                settings.N8N_CHATBOT_WEBHOOK,
                json={"question": pregunta},
                timeout=30
            )
            
            bot_response = ""
            if response.status_code == 200:
                data = response.json()
                bot_response = data.get('output', data.get('text', data.get('response', '')))
                
                # Guardar en la base de datos
                ChatQuery.objects.create(
                    user_question=pregunta,
                    bot_response=bot_response
                )
                
                return Response({"respuesta": bot_response}, status=status.HTTP_200_OK)
            else:
                return Response({"error": f"Error de n8n: {response.text}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except requests.exceptions.Timeout:
            return Response({"error": "El servidor de IA está tardando demasiado en responder"}, status=status.HTTP_504_GATEWAY_TIMEOUT)
        except Exception as e:
            return Response({"error": f"Error de conexión con el Chatbot: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = {
            "instructors": Instructor.objects.count(),
            "events": Event.objects.count(),
            "locations": Location.objects.count(),
            "sponsors": Sponsor.objects.count(),
            "news": News.objects.count(),
        }

        # Fetch last 10 logs
        logs = LogEntry.objects.select_related('user', 'content_type').order_by('-action_time')[:10]
        
        serialized_logs = []
        for log in logs:
            serialized_logs.append({
                "id": log.id,
                "user": log.user.username,
                "action": log.get_action_flag_display(),
                "target": log.object_repr,
                "time": log.action_time.strftime("%H:%M:%S"),
                "date": log.action_time.strftime("%Y-%m-%d"),
            })

        return Response({
            "stats": stats,
            "logs": serialized_logs
        }, status=status.HTTP_200_OK)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response({"error": "Se requieren ambas contraseñas"}, status=status.HTTP_400_BAD_REQUEST)
            
        user = request.user
        if not user.check_password(old_password):
            return Response({"error": "La contraseña actual es incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
            
        user.set_password(new_password)
        user.save()
        return Response({"message": "Contraseña actualizada correctamente"}, status=status.HTTP_200_OK)
