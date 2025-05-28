import django_filters
from .models import Lesson


class LessonFilter(django_filters.FilterSet):
    date_from = django_filters.DateFilter(field_name="date", lookup_expr="gte")
    date_to = django_filters.DateFilter(field_name="date", lookup_expr="lte")
    course_name = django_filters.CharFilter(
        field_name="program__course__name",
        lookup_expr="icontains",
    )
    group_name = django_filters.CharFilter(
        field_name="group__name",
        lookup_expr="icontains",
    )

    class Meta:
        model = Lesson
        fields = [
            "date_from",
            "date_to",
            "course_name",
            "group_name",
        ]
