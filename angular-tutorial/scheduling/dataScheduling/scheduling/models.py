from typing import Any
from django.db import models

from django.utils import timezone

class Task(models.Model):
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="")
    duration = models.DurationField("task duration")
    order = models.IntegerField("task distance grom the beginnig", default=0, blank=True, null=True)
    prerequisite = models.ManyToManyField('self', default=[], null=True, blank=True)

    @classmethod
    def create(cls, name, description, duration, prerequisite):
        order = 0
        for pre_task in prerequisite:
            pre_task.save()
            order = max(order, pre_task.order)
        order+=1
        return cls(name=name, description=description, duration=duration, order=order, prerequisite=prerequisite)


    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)

        self.order = 1+max(
            [pre_task.order for pre_task in self.prerequisite.all]
        ) 

    def __str__(self) -> str:
        return self.name

    def getPrerequisite(self):
        return filter(
            lambda pre_task : pre_task.order < self.order,
            self.prerequisite
        )

