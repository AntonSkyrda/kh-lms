from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied

from .models import Homework, HomeworkSubmission
from .serializers import HomeworkSerializer, HomeworkSubmissionSerializer


class HomeworkViewSet(ModelViewSet):
    queryset = Homework.objects.prefetch_related(
        "lesson",
        "lesson__program",
        "lesson__program__course",
    )
    serializer_class = HomeworkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return self.queryset

        if hasattr(user, "teacher_profile"):
            return self.queryset.filter(lesson__program__course__teacher=user)

        if hasattr(user, "student_profile"):
            group = user.student_profile.group
            return self.queryset.filter(lesson__group=group)

        return Homework.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if not hasattr(user, "teacher_profile") and not user.is_superuser:
            raise PermissionDenied("Only teachers or admins can create homework.")

        lesson = serializer.validated_data.get("lesson")
        if lesson and lesson.program.course.teacher != user and not user.is_superuser:
            raise PermissionDenied("You can only create homework for your own lessons.")

        serializer.save()

    def perform_update(self, serializer):
        self.perform_create(serializer)


class HomeworkSubmissionViewSet(viewsets.ModelViewSet):
    queryset = HomeworkSubmission.objects.select_related("student", "homework")
    serializer_class = HomeworkSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return self.queryset

        if hasattr(user, "student_profile"):
            return self.queryset.filter(student=user)

        if hasattr(user, "teacher_profile"):
            return self.queryset.filter(
                homework__lessons__program__course__teacher=user
            ).distinct()

        return HomeworkSubmission.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if not user.is_student:
            raise PermissionDenied("Only students can submit homework.")

        serializer.save(student=user)

    def perform_update(self, serializer):
        user = self.request.user

        if hasattr(user, "teacher_profile"):
            serializer.save()
        else:
            raise PermissionDenied("Only teachers can grade homework submission.")
