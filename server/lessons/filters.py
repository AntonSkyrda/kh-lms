import django_filters
from .models import Lesson


class LessonFilter(django_filters.FilterSet):
    date_from = django_filters.DateFilter(field_name="date", lookup_expr="gte")
    date_to = django_filters.DateFilter(field_name="date", lookup_expr="lte")
    course_id = django_filters.NumberFilter(
        field_name="program__course__id",
    )
    group_id = django_filters.NumberFilter(
        field_name="group__id",
    )

    class Meta:
        model = Lesson
        fields = [
            "date_from",
            "date_to",
            "course_id",
            "group_id",
        ]
