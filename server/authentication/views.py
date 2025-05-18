from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework.response import Response
from rest_framework.views import APIView


class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data["access"]
        refresh = serializer.validated_data["refresh"]

        response = Response(
            {
                "message": "Login successful",
                "access_token": f"{access}",
                "refresh_token": f"{refresh}"
            }
        )

        response.set_cookie(
            "access_token", access, httponly=True, samesite="Lax", path="/"
        )
        response.set_cookie(
            "refresh_token", refresh, httponly=True, samesite="Lax", path="/"
        )

        return response


class CookieTokenRefreshView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token missing"},
                status=400,
            )

        serializer = TokenRefreshSerializer(
            data={"refresh": refresh_token},
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response(
                {"detail": "Invalid refresh token"},
                status=401,
            )

        access = serializer.validated_data["access"]
        response = Response({"message": "Token refreshed"})

        response.set_cookie(
            "access_token", access, httponly=True, samesite="Lax", path="/"
        )

        return response


class CookieLogoutView(APIView):
    def get(self, request, *args, **kwargs):
        response = Response({"message": "Log out"})
        response.delete_cookie("access_token", path="/")
        response.delete_cookie("refresh_token", path="/")
        return response


"authentication"
