from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


User = get_user_model()


class Group(models.Model):
    name = models.CharField(max_length=55)
    year_of_study = models.PositiveIntegerField(
        validators=(
            MinValueValidator(1),
            MaxValueValidator(4),
        )
    )

    def __str__(self):
        return self.name
