from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, Teacher, Student


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if not created:
        return

    if instance.is_teacher and not hasattr(instance, "teacher_profile"):
        Teacher.objects.create(user=instance)

    if instance.is_student and not hasattr(instance, "student_profile"):
        Student.objects.create(user=instance)
