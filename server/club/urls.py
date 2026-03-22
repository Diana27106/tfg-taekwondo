from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstructorViewSet, EventViewSet, NewsViewSet, LocationViewSet, GroupViewSet, ContactView

router = DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'events', EventViewSet)
router.register(r'news', NewsViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactView.as_view(), name='contact'),
]