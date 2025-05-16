from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserMeSerializer, UserListSerializer


User = get_user_model()


class UserMeView(RetrieveAPIView):
    serializer_class = UserMeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class TeacherListView(ListAPIView):
    queryset = User.objects.filter(is_teacher=True)
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]


class StudentListView(ListAPIView):
    queryset = User.objects.filter(is_student=True)
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated]
