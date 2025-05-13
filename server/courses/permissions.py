from rest_framework.permissions import BasePermission, SAFE_METHODS


class CoursePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.is_superuser:
            return True

        if hasattr(user, "student_profile"):
            group = user.student_profile.group
            return (
                request.method in SAFE_METHODS
                and group
                and obj.groups.filter(id=group.id).exists()
            )

        if hasattr(user, "teacher_profile"):
            return obj.teacher == user

        return False
