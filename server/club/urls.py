from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstructorViewSet, EventViewSet, NewsViewSet

router = DefaultRouter()
router.register(r'instructors', InstructorViewSet)
router.register(r'events', EventViewSet)
router.register(r'news', NewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]