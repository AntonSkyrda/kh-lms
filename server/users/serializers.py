from rest_framework import serializers

from .models import CustomUser


class UserMeSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "father_name",
            "role",
        )

    def get_role(self, obj):
        if hasattr(obj, "student_profile"):
            return "student"
        if hasattr(obj, "teacher_profile"):
            return "teacher"
        elif obj.is_superuser:
            return "admin"

        return "user"
