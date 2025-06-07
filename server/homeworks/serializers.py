from django.contrib.auth import get_user_model
from rest_framework import serializers

from lessons.models import Lesson
from .models import Homework, HomeworkSubmission


User = get_user_model()


class HomeworkSerializer(serializers.ModelSerializer):
    lesson_id = serializers.PrimaryKeyRelatedField(
        source="lesson",
        queryset=Lesson.objects.all(),
        write_only=True,
    )
    lesson = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Homework
        fields = (
            "id",
            "title",
            "description",
            "due_date",
            "lesson_id",
            "lesson",
        )


class HomeworkSubmissionSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)
    homework = serializers.StringRelatedField(read_only=True)
    homework_id = serializers.PrimaryKeyRelatedField(
        source="homework",
        queryset=Homework.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = HomeworkSubmission
        fields = [
            "id",
            "homework_id",
            "homework",
            "student_id",
            "student",
            "answer",
            "submission_at",
            "grade",
            "feedback",
        ]
        read_only_fields = ["submission_at"]
