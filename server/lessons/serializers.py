from rest_framework import serializers

from .models import Lesson


class LessonSerializer(serializers.ModelSerializer):
    program_topic = serializers.CharField(
        source="program.topic",
        read_only=True,
    )
    duration = serializers.IntegerField(
        source="program.hours",
        read_only=True,
    )
    group_name = serializers.CharField(
        source="group.name",
        read_only=True,
    )
    course_name = serializers.CharField(
        source="program.course.name",
        read_only=True,
    )
    teacher_name = serializers.CharField(
        source="program.course.teacher",
        read_only=True,
    )

    class Meta:
        model = Lesson
        fields = (
            "id",
            "program",
            "program_topic",
            "duration",
            "group",
            "group_name",
            "course_name",
            "teacher_name",
            "date",
            "time",
        )
