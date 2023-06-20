from typing import Any
from django.db.models.query import QuerySet
from rest_framework import generics


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


class TaskOrdered(generic.ListView):
    template_name="scheduling/order_task.html"
    context_object_name="task_list"

    def get_queryset(self) -> QuerySet[Any]:
        task_set = Task.objects.all()
        for task in task_set:
            task.get_starting()
        return task_set

