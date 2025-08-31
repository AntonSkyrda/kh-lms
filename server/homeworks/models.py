from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Homework(models.Model):
    lesson = models.ForeignKey(
        "lessons.Lesson",
        on_delete=models.CASCADE,
        related_name="homeworks",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateField()

    def __str__(self):
        return f"{self.title} ({self.lesson})"


class HomeworkSubmission(models.Model):
    homework = models.ForeignKey(
        "homeworks.Homework",
        on_delete=models.CASCADE,
        related_name="submissions",
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"is_student": True},
        related_name="homework_submissions",
    )
    answer = models.TextField()
    submission_at = models.DateField(auto_now_add=True)
    grade = models.PositiveSmallIntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)

    class Meta:
        unique_together = (
            "homework",
            "student",
        )

    def __str__(self):
        return f"{self.student.email} - {self.homework.title}"
