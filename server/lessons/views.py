from datetime import datetime

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Lesson
from .serializers import LessonSerializer
from .filters import LessonFilter


class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.select_related("program", "group").order_by("date")
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = LessonFilter

    def get_queryset(self):
        user = self.request.user
        qs = self.queryset

        if user.is_superuser:
            return qs

        if hasattr(user, "teacher_profile"):
            return qs.filter(program__course__teacher=user)

        if hasattr(user, "student_profile"):
            return qs.filter(group=user.student_profile.group)

        return Lesson.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if not user.is_superuser and not hasattr(user, "teacher_profile"):
            raise PermissionDenied("Only teachers or admins can create lessons.")

        program = serializer.validated_data.get("program")

        if hasattr(user, "teacher_profile") and program.course.teacher != user:
            raise PermissionDenied("You can only create lessons for your own courses.")

        serializer.save()

    def perform_update(self, serializer):
        user = self.request.user
        lesson = self.get_object()

        if user.is_superuser:
            serializer.save()
            return

        if hasattr(user, "teacher_profile") and lesson.program.course.teacher == user:
            serializer.save()
            return

        raise PermissionDenied("You do not have permission to update this lesson.")

    def perform_destroy(self, instance):
        user = self.request.user

        if user.is_superuser:
            instance.delete()
            return

        if hasattr(user, "teacher_profile") and instance.program.course.teacher == user:
            instance.delete()
            return

        raise PermissionDenied("You do not have permission to delete this lesson.")
