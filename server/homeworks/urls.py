from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    HomeworkViewSet,
    HomeworkSubmitView,
    HomeworkSubmissionsListView,
    HomeworkGradeView,
)


router = DefaultRouter()
router.register("", HomeworkViewSet, basename="homeworks")
urlpatterns = [
    path("", include(router.urls)),
    path(
        "<int:homework_id>/submit/",
        HomeworkSubmitView.as_view(),
        name="homework-submit",
    ),
    path(
        "<int:homework_id>/submissions/",
        HomeworkSubmissionsListView.as_view(),
        name="homework-submissions",
    ),
    path(
        "submissions/<int:submission_id>/grade/",
        HomeworkGradeView.as_view(),
        name="grade-homework",
    ),
]
