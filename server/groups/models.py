from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from server.courses.models import Course


User = get_user_model()


class Group(models.Model):
    name = models.CharField(max_length=55)
    year_of_study = models.PositiveIntegerField(
        validators=(
            MinValueValidator(1),
            MaxValueValidator(4),
        )
    )
    courses = models.ManyToManyField(
        Course,
        related_name="groups",
        blank=True,
        null=True,
    )
