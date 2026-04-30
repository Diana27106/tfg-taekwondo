from django.contrib import admin
from django.urls import path, include
from django.conf import settings # Importar esto
from django.conf.urls.static import static # Importar esto
from rest_framework.authtoken import views
from .views import CustomObtainAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('club.urls')), # <--- Añade esto
    path('api/login/', CustomObtainAuthToken.as_view(), name='api-token-auth'),
]

# Añadir esto al final:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)