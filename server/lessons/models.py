from django.db import models


class Lesson(models.Model):
    program = models.ForeignKey(
        "courses.CourseProgram",
        on_delete=models.CASCADE,
        related_name="lessons",
    )
    group = models.ForeignKey(
        "groups.Group", on_delete=models.CASCADE, related_name="lessons"
    )

    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.program.topic} - {self.group.name} - {self.date} - {self.time}"
