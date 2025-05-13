from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api_v1/courses/", include("courses.urls")),
    path("api_v1/groups/", include("groups.urls")),
]
