from typing import Any
from django.db.models.query import QuerySet
from django.shortcuts import render

from django.views import generic

from .models import Task

class TaskView(generic.ListView):
    template_name="scheduling/index_task.html"
    context_object_name="task_list"

    def get_queryset(self) -> QuerySet[Any]:
        return Task.objects.all()
    
class TaskDetail(generic.DetailView):
    model = Task
    template_name = 'scheduling/detail_task.html'
