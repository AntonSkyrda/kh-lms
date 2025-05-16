from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class UserMeSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
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


class UserListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "email", "full_name")

    def get_full_name(self, obj):
        return f"{obj.last_name} {obj.first_name} {obj.father_name}"
