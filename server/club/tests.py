from django.test import TestCase
from django.urls import reverse
from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase

class ContactTests(APITestCase):
    def test_contact_form_submission_success(self):
        url = reverse('contact')
        data = {
            'nombre': 'Test User',
            'email': 'test@example.com',
            'mensaje': 'Hello, this is a test message.'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, "Nuevo mensaje de contacto de Test User")
        self.assertIn("Hello, this is a test message.", mail.outbox[0].body)

    def test_contact_form_submission_missing_fields(self):
        url = reverse('contact')
        data = {
            'nombre': 'Test User',
            # email and mensaje missing
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(len(mail.outbox), 0)
