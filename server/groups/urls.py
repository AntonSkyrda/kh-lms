from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import GroupViewSet

router = DefaultRouter()
router.register("", GroupViewSet, basename="groups")

urlpatterns = [
    path("", include(router.urls)),
]
