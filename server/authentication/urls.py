from django.urls import path
from .views import (
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
    CookieLogoutView,
)

urlpatterns = [
    path("login/", CookieTokenObtainPairView.as_view(), name="cookie-login"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="cookie-refresh"),
    path("logout/", CookieLogoutView.as_view(), name="cookie-logout"),
]
