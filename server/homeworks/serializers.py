from django.contrib.auth import get_user_model
from rest_framework import serializers

from lessons.models import Lesson
from .models import Homework, HomeworkSubmission
from groups.models import Group


User = get_user_model()


class StudentStatusSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    full_name = serializers.CharField()
    submitted = serializers.BooleanField()


class GroupWithStudentsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    students = StudentStatusSerializer(many=True, read_only=True)


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


class HomeworkDetailTeacherSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField()

    class Meta:
        model = Homework
        fields = ("id", "title", "description", "due_date", "groups")

    def get_groups(self, obj):
        group = obj.lesson.group
        students = group.students.select_related("user")
        student_data = []

        for student in students:
            student_data.append(
                {
                    "id": student.id,
                    "full_name": f"{student.user.first_name} {student.user.last_name} "
                    f"{student.user.father_name} {student.user.email}",
                    "submitted": HomeworkSubmission.objects.filter(
                        homework=obj,
                        student=student.user,
                    ).exists(),
                }
            )

        return [
            {
                "id": group.id,
                "name": group.name,
                "students": student_data,
            }
        ]


class HomeworkDetailStudentSerializer(serializers.ModelSerializer):
    submitted = serializers.SerializerMethodField()

    class Meta:
        model = Homework
        fields = (
            "id",
            "title",
            "description",
            "due_date",
            "submitted",
        )

    def get_submitted(self, obj):
        user = self.context["request"].user
        return HomeworkSubmission.objects.filter(homework=obj, student=user).exists()


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
