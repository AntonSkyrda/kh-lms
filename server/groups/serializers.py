from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Group
from courses.serializers import CourseSimpleSerializer
from users.serializers import StudentUserSerializer
from users.models import Student


User = get_user_model()


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            "id",
            "name",
            "year_of_study",
        )


class GroupDetailSerializer(serializers.ModelSerializer):
    courses = CourseSimpleSerializer(
        many=True,
        read_only=True,
    )
    students = StudentUserSerializer(
        many=True,
        read_only=True,
    )
    student_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(is_student=True),
        many=True,
        write_only=True,
        required=False,
    )

    class Meta:
        model = Group
        fields = (
            "id",
            "name",
            "year_of_study",
            "courses",
            "students",
            "student_ids",
        )

    def update(self, instance, validated_data):
        student_users = validated_data.pop("student_ids", None)

        instance = super().update(instance, validated_data)

        if student_users is not None:
            Student.objects.filter(group=instance).update(group=None)
            Student.objects.filter(user__in=student_users).update(group=instance)

        return instance
