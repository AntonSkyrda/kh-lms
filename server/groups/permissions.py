from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import Group


class GroupsPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.is_superuser:
            return True

        if hasattr(user, "teacher_profile"):
            return obj in Group.objects.filter(courses__teacher=user).distinct()

        if hasattr(user, "student_profile"):
            return request.method in SAFE_METHODS and user.student_profile.group == obj

        return False
