from django.contrib import admin
from .models import Instructor, Location, Group, Event, Sponsor, News

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('age_range', 'instructor', 'schedule')
    filter_horizontal = ('locations',) # Esto crea una interfaz muy cómoda para elegir sedes N:M

admin.site.register(Instructor)
admin.site.register(Location)
admin.site.register(Event)
admin.site.register(Sponsor)
admin.site.register(News)