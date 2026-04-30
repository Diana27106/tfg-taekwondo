from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from django.utils import timezone
from datetime import timedelta
from django.conf import settings

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Token inválido')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('Usuario inactivo')

        # Check if the token has expired (1 hour)
        # We use token.created to check the age
        if timezone.now() > token.created + timedelta(hours=1):
            # Optionally delete the token so it can't be reused
            # token.delete()
            raise exceptions.AuthenticationFailed('El token ha expirado')

        return (token.user, token)
