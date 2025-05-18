from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter

from .models import Group
from .serializers import GroupSerializer
from .permissions import GroupsPermission


class GroupViewSet(ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, GroupsPermission]
    filter_backends = [SearchFilter]
    search_fields = [
        "name",
        "year_of_study",
    ]

    def get_queryset(self):
        user = self.request.user

        queryset = Group.objects.prefetch_related("courses")

        if user.is_superuser:
            return queryset

        if hasattr(user, "teacher_profile"):
            return queryset.filter(courses__teacher=user).distinct()

        if hasattr(user, "student_profile"):
            group = user.student_profile.group
            return queryset.filter(id=group.id) if group else Group.objects.none()

        return Group.objects.none()
