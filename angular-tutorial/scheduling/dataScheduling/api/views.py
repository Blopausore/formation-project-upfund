from scheduling.models import Task
from scheduling.views import TaskOrdered
from api.serializers import TaskSerializer

from rest_framework import generics

class TaskApiRetrieve(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TaskListView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TaskOrderedListView(generics.ListCreateAPIView, TaskOrdered):
    serializer_class = TaskSerializer
