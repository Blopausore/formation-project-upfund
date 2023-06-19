from django.db import models

from django.utils import timezone

class Task(models.Model):
    description = models.CharField(max_length=200, default="")
    duration = models.DateTimeField("task duration", default=timezone.now())
    prerequisite = models.ManyToManyField('self', null=True, blank=True)



