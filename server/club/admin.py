from django.contrib import admin
from .models import Instructor, Location, Group, Event, Sponsor, News, ChatQuery, ChatDocument

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    """
    Configuración de la interfaz de administración para los Grupos.
    Permite filtrar sedes mediante una interfaz horizontal mejorada.
    """
    list_display = ('age_range', 'instructor', 'schedule')
    filter_horizontal = ('locations',)

@admin.register(ChatQuery)
class ChatQueryAdmin(admin.ModelAdmin):
    """
    Configuración de la interfaz de administración para las consultas del Chatbot.
    Muestra las preguntas de los usuarios y las respuestas generadas por la IA.
    """
    list_display = ('user_question', 'bot_response', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(ChatDocument)
class ChatDocumentAdmin(admin.ModelAdmin):
    """
    Configuración de la interfaz de administración para los documentos del RAG.
    Permite subir archivos que el Chatbot usará como base de conocimiento.
    """
    list_display = ('title', 'uploaded_at')
    readonly_fields = ('uploaded_at',)

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    """Configuración para Instructores."""
    list_display = ('name', 'rank')

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """Configuración para Sedes."""
    list_display = ('name', 'city')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Configuración para Eventos."""
    list_display = ('title', 'start_date', 'location')

@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    """Configuración para Patrocinadores."""
    list_display = ('name', 'is_active')

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    """Configuración para Noticias."""
    list_display = ('title', 'published_at')
    prepopulated_fields = {'slug': ('title',)}