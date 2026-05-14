from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from django.utils import timezone
from datetime import timedelta
from django.conf import settings

class ExpiringTokenAuthentication(TokenAuthentication):
    """
    Sistema de autenticación por Token con expiración.
    Extiende la clase base de DRF para invalidar tokens después de 1 hora de su creación.
    """
    def authenticate_credentials(self, key):
        """
        Valida las credenciales del token.
        
        Args:
            key (str): La clave del token enviada en la cabecera.
            
        Returns:
            tuple: (user, token) si la validación es exitosa.
            
        Raises:
            AuthenticationFailed: Si el token no existe, el usuario está inactivo o el token expiró.
        """
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Token inválido')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('Usuario inactivo')

        # Check if the token has expired (1 hour)
        if timezone.now() > token.created + timedelta(hours=1):
            raise exceptions.AuthenticationFailed('El token ha expirado')

        return (token.user, token)
