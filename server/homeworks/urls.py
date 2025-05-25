from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import HomeworkViewSet, HomeworkSubmissionViewSet

router = DefaultRouter()
router.register("", HomeworkViewSet, basename="homeworks")
router.register("submissions", HomeworkSubmissionViewSet, basename="submissions")
urlpatterns = [
    path("", include(router.urls)),
]
