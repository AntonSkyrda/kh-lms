from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Course(models.Model):
    name = models.CharField(max_length=55)
    description = models.TextField()
    teacher = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="courses",
        null=True,
        blank=True,
    )
    groups = models.ManyToManyField(
        "groups.Group",
        related_name="courses",
        blank=True,
    )


class CourseProgram(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="programs",
    )
    topic = models.CharField(max_length=255)
    hours = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.course.name} - {self.topic}"

    class Meta:
        ordering = [
            "course_id",
            "topic",
        ]
