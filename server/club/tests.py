from django.test import TestCase
from django.urls import reverse
from django.core import mail
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch
from .models import Instructor, Location, News, Event, Sponsor

class ModelTests(TestCase):
    def test_instructor_str(self):
        instructor = Instructor.objects.create(name="Juan Perez", rank="1º DAN", bio="Test bio")
        self.assertEqual(str(instructor), "Juan Perez (1º DAN)")

    def test_location_str(self):
        location = Location.objects.create(name="Sede Central", address="Calle Falsa 123", city="Madrid")
        self.assertEqual(str(location), "Sede Central")

    def test_news_slug_generation(self):
        news = News.objects.create(title="Nueva Noticia", content="Contenido de prueba")
        self.assertEqual(news.slug, "nueva-noticia")

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
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class APIViewSetsTests(APITestCase):
    def setUp(self):
        self.instructor = Instructor.objects.create(name="Instructor 1", rank="1º DAN", bio="Bio")
        self.user = User.objects.create_user(username='testuser', password='password123')

    def test_get_instructors_list(self):
        url = reverse('instructor-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_instructor_unauthenticated(self):
        url = reverse('instructor-list')
        data = {'name': 'New', 'rank': '2º DAN', 'bio': 'Bio'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_instructor_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('instructor-list')
        data = {'name': 'New', 'rank': '2º DAN', 'bio': 'Bio'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class DashboardStatsTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='admin', password='password123')
        Instructor.objects.create(name="I1", rank="1", bio="B")
        News.objects.create(title="N1", content="C")

    def test_dashboard_stats_unauthenticated(self):
        url = reverse('dashboard-stats')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_dashboard_stats_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('dashboard-stats')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['stats']['instructors'], 1)
        self.assertEqual(response.data['stats']['news'], 1)

class ChatbotTests(APITestCase):
    @patch('requests.post')
    def test_chatbot_success(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {'output': 'Esta es una respuesta de prueba.'}
        
        url = reverse('chatbot')
        data = {'pregunta': '¿Qué es el Taekwondo?'}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['respuesta'], 'Esta es una respuesta de prueba.')
