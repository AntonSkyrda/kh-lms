from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Course(models.Model):
    name = models.CharField(max_length=55)
    description = models.TextField()
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="courses")
