from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    InstructorViewSet, EventViewSet, NewsViewSet, LocationViewSet, 
    GroupViewSet, SponsorViewSet, ContactView, ChatbotView, 
    DashboardStatsView, ProfileView, ChangePasswordView, NewsPDFView,
    UserImportView, VerifyEmailView
)

router = DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'events', EventViewSet)
router.register(r'news', NewsViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'sponsors', SponsorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactView.as_view(), name='contact'),
    path('chatbot/', ChatbotView.as_view(), name='chatbot'),
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('news/<slug:slug>/pdf/', NewsPDFView.as_view(), name='news-pdf'),
    path('import-users/', UserImportView.as_view(), name='import-users'),
    path('verify-email/<str:uidb64>/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
]