from django.urls import path

from .views import UserMeView, TeacherListView, StudentListView, UserCreateView

urlpatterns = [
    path("me/", UserMeView.as_view(), name="user-me"),
    path("teachers/", TeacherListView.as_view(), name="teacher-list"),
    path("students/", StudentListView.as_view(), name="students-list"),
    path("", UserCreateView.as_view(), name="user-create"),
]
