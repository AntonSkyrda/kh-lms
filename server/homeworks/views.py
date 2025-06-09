from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied, NotFound

from .models import Homework, HomeworkSubmission
from .serializers import (
    HomeworkSerializer,
    HomeworkSubmissionSerializer,
    HomeworkDetailStudentSerializer,
    HomeworkDetailTeacherSerializer,
)


class HomeworkViewSet(ModelViewSet):
    queryset = Homework.objects.prefetch_related(
        "lesson",
        "lesson__program",
        "lesson__program__course",
    )
    serializer_class = HomeworkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return self.queryset

        if hasattr(user, "teacher_profile"):
            return self.queryset.filter(lesson__program__course__teacher=user)

        if hasattr(user, "student_profile"):
            group = user.student_profile.group
            return self.queryset.filter(lesson__group=group)

        return Homework.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if not hasattr(user, "teacher_profile") and not user.is_superuser:
            raise PermissionDenied("Only teachers or admins can create homework.")

        lesson = serializer.validated_data.get("lesson")
        if lesson and lesson.program.course.teacher != user and not user.is_superuser:
            raise PermissionDenied("You can only create homework for your own lessons.")

        serializer.save()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if hasattr(request.user, "teacher_profile") or request.user.is_superuser:
            serializer = HomeworkDetailTeacherSerializer(
                instance, context={"request": request}
            )
        elif hasattr(request.user, "student_profile"):
            serializer = HomeworkDetailStudentSerializer(
                instance, context={"request": request}
            )
        else:
            raise PermissionDenied("You do not have permission to view this homework.")

        return Response(serializer.data)

    def perform_update(self, serializer):
        self.perform_create(serializer)


class HomeworkSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, homework_id):
        user = self.request.user

        if not hasattr(user, "student_profile"):
            raise PermissionDenied("Only students can view their submission.")

        try:
            homework = Homework.objects.get(id=homework_id)
        except Homework.DoesNotExist:
            raise NotFound("Homework not found.")

        try:
            submission = HomeworkSubmission.objects.get(homework=homework, student=user)
        except HomeworkSubmission.DoesNotExist:
            return NotFound("You have not submitted this homework yet.")

        serializer = HomeworkSubmissionSerializer(submission)
        return Response(serializer.data)

    def post(self, request, homework_id):
        user = request.user

        if not hasattr(user, "student_profile"):
            raise PermissionDenied("Only students can submit homework.")

        try:
            homework = Homework.objects.get(id=homework_id)
        except Homework.DoesNotExist:
            raise NotFound("Homework not found.")

        if HomeworkSubmission.objects.filter(homework=homework, student=user).exists():
            return Response(
                {"detail": "You have already submitted this homework."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = HomeworkSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                homework=homework,
                student=user,
                homework_id=homework_id,
            )
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class HomeworkSubmissionsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, homework_id):
        user = request.user

        try:
            homework = Homework.objects.select_related("lesson__program__course").get(
                id=homework_id,
            )
        except Homework.DoesNotExist:
            raise NotFound("Homework not found.")

        if not (
            user.is_superuser
            or hasattr(user, "teacher_profile")
            and homework.lesson.program.course.teacher == user
        ):
            raise PermissionDenied("You are not allowed to view these submissions.")

        submissions = HomeworkSubmission.objects.filter(homework=homework)
        serializer = HomeworkSubmissionSerializer(
            submissions,
            many=True,
        )
        return Response(serializer.data)


class HomeworkGradeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, submission_id):
        user = request.user

        if not hasattr(user, "teacher_profile") and not user.is_superuser:
            raise PermissionDenied("Only teachers or admins can view submission")

        try:
            submission = HomeworkSubmission.objects.select_related(
                "homework__lesson__program__course", "student"
            ).get(id=submission_id)
        except HomeworkSubmission.DoesNotExist:
            raise NotFound("Submission not found.")

        if (
            not user.is_superuser
            and submission.homework.lessons.program.course.teacher != user
        ):
            raise PermissionDenied(
                "You can only view submissions for your own courses."
            )

        serializer = HomeworkSubmissionSerializer(submission)
        return Response(serializer.data)

    def patch(self, request, submission_id):
        user = request.user

        if not hasattr(user, "teacher_profile"):
            raise PermissionDenied("Only teachers can grade homework")

        try:
            submission = HomeworkSubmission.objects.select_related(
                "homework__lesson__program__course"
            ).get(id=submission_id)
        except HomeworkSubmission.DoesNotExist:
            raise NotFound("Submission not found.")

        if (
            submission.homework.lesson.program.course.teacher != user
            and not user.is_superuser
        ):
            raise PermissionDenied("You can only grade submissions for your courses.")

        serializer = HomeworkSubmissionSerializer(
            submission,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )
