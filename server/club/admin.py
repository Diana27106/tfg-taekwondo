from django.contrib import admin
from .models import Instructor, Location, Group, Event, Sponsor, News, ChatQuery, ChatDocument

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('age_range', 'instructor', 'schedule')
    filter_horizontal = ('locations',) # Esto crea una interfaz muy cómoda para elegir sedes N:M

@admin.register(ChatQuery)
class ChatQueryAdmin(admin.ModelAdmin):
    list_display = ('user_question', 'bot_response', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(ChatDocument)
class ChatDocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    readonly_fields = ('uploaded_at',)

admin.site.register(Instructor)
admin.site.register(Location)
admin.site.register(Event)
admin.site.register(Sponsor)
admin.site.register(News)