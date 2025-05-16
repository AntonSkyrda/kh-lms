from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import UserMeSerializer, UserListSerializer, UserCreateSerializer


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


class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [
        IsAdminUser,
    ]
    queryset = User.objects.all()
