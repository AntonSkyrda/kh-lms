from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import Lesson
from .serializers import LessonSerializer


class LessonViewSet(ModelViewSet):
    queryset = Lesson.objects.select_related("program", "group").order_by("date")
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]
