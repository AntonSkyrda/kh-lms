from rest_framework import serializers
from django.contrib.auth import get_user_model
from groups.models import Group
from courses.models import Course, CourseProgram

User = get_user_model()


# ─────────────────────────────────────────────────────
# Course program (read + create)
# ─────────────────────────────────────────────────────


class CourseProgramWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgram
        fields = ("id", "topic", "hours")


class CourseProgramReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgram
        fields = ("id", "topic", "hours")


# ─────────────────────────────────────────────────────
# Teacher info(ReadOnly)
# ─────────────────────────────────────────────────────


class TeacherShortSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "email", "full_name")

    def get_full_name(self, obj):
        return f"{obj.last_name} {obj.first_name} {obj.father_name}"


# ─────────────────────────────────────────────────────
# Course serializer (list and create)
# ─────────────────────────────────────────────────────


class CourseSerializer(serializers.ModelSerializer):
    teacher_id = serializers.PrimaryKeyRelatedField(
        source="teacher",
        queryset=User.objects.filter(is_teacher=True),
        write_only=True,
        required=False,
        allow_null=True,
    )

    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
    programs = CourseProgramWriteSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "description",
            "teacher",
            "teacher_id",
            "groups",
            "programs",
        )

    def validate(self, data):
        user = self.context["request"].user

        if user.is_superuser:
            return data

        if hasattr(user, "teacher_profile"):
            if data.get("teacher") != user:
                raise serializers.ValidationError("You can create only your courses")
            return data

        raise serializers.ValidationError("You have not permission to edit this course")

    def create(self, validated_data):
        programs_data = validated_data.pop("programs", [])
        groups_data = validated_data.pop("groups", [])
        course = Course.objects.create(**validated_data)
        course.groups.set(groups_data)
        for program in programs_data:
            CourseProgram.objects.create(course=course, **program)
        return course


# ─────────────────────────────────────────────────────
# Retrieve Serializer (detail view)
# ─────────────────────────────────────────────────────


class CourseDetailSerializer(serializers.ModelSerializer):
    teacher = TeacherShortSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        source="teacher",
        queryset=User.objects.filter(is_teacher=True),
        write_only=True,
        required=False,
        allow_null=True,
    )

    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
    programs = CourseProgramWriteSerializer(many=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "description",
            "teacher",
            "teacher_id",
            "groups",
            "programs",
        )

    def validate(self, data):
        user = self.context["request"].user

        if user.is_superuser:
            return data

        if hasattr(user, "teacher_profile"):
            if self.instance and self.instance.teacher != user:
                raise serializers.ValidationError("You can change only your courses")
            if not self.instance and data.get("teacher") != user:
                raise serializers.ValidationError("You can create only your courses")
            return data

        raise serializers.ValidationError("You have not permission to edit this course")

    def update(self, instance, validated_data):
        programs_data = validated_data.pop("programs", [])
        groups_data = validated_data.pop("groups", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        instance.groups.set(groups_data)

        instance.programs.all().delete()
        for program in programs_data:
            CourseProgram.objects.create(course=instance, **program)

        return instance
