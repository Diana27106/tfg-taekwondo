from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.utils import timezone

class CustomObtainAuthToken(ObtainAuthToken):
    """
    Vista personalizada para obtener el Token de autenticación.
    Al iniciar sesión, elimina cualquier token previo para forzar la creación de uno nuevo
    con una marca de tiempo actualizada, permitiendo el control de expiración.
    """
    def post(self, request, *args, **kwargs):
        """
        Gestiona la petición POST para el login.
        
        Args:
            request: La petición HTTP con credenciales.
            
        Returns:
            Response: Objeto JSON con el token, id de usuario y email.
        """
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Delete existing token to ensure a new one is created with fresh 'created' timestamp
        Token.objects.filter(user=user).delete()
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
