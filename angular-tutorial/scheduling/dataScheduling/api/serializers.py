from rest_framework import serializers

from scheduling.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description', 'duration', 'starting']

    