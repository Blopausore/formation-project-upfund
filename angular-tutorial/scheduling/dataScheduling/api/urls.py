from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers, viewsets

from api.views import TaskApiRetrieve, TaskListView, TaskOrderedListView
urlpatterns = [
    path('manage/', TaskOrderedListView.as_view(), name="manage task"),
    path('', TaskListView.as_view(), name="task")
]
urlpatterns = format_suffix_patterns(urlpatterns)
