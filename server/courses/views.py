from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Course
from .serializers import CourseSerializer
from .permissions import CoursePermission


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, CoursePermission]

    def get_queryset(self):
        user = self.request.user

        queryset = Course.objects.select_related("teacher").prefetch_related("groups")

        if user.is_superuser:
            return queryset

        if hasattr(user, "teacher_profile"):
            return queryset.filter(teacher=user)

        if hasattr(user, "student_profile"):
            group = user.student_profile.group
            if group:
                return queryset.filter(groups=group)
            return Course.objects.none()

        return Course.objects.none()
