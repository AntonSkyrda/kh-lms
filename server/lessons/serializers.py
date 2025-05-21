from rest_framework import serializers

from courses.models import CourseProgram
from groups.models import Group
from .models import Lesson


class LessonSerializer(serializers.ModelSerializer):
    program_topic = serializers.CharField(
        source="program.topic",
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

    class Meta:
        model = Lesson
        fields = (
            "id",
            "program",
            "program_topic",
            "group",
            "group_name",
            "course_name",
            "date",
            "time",
        )
