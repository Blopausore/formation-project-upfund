from django.db import models

from django.utils import timezone

class Task(models.Model):
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="")
    duration = models.DurationField("task duration")
    prerequisite = models.ManyToManyField('self', null=True, blank=True)

    def __str__(self) -> str:
        return self.description

