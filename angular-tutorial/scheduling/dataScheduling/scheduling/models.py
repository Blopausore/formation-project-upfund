from django.db import models

from datetime import timedelta

class Task(models.Model):
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=200, default="")
    prerequisite = models.ManyToManyField('self', blank=True)
    duration = models.DurationField("task duration", blank=True, default=timedelta(seconds=0))  
    starting = models.DurationField("maximum duration before starting", blank=True, default=timedelta(seconds=0))


    def __str__(self) -> str:
        return self.name

    
    def get_starting(self):
        if self.prerequisite.exists():
            starting = timedelta(seconds=0) # Duration set to infinity
            for pre_task in self.get_prerequisite():
                starting = max(
                    starting, 
                    pre_task.starting + pre_task.duration
                )
            self.starting = starting
        else:
            self.starting = timedelta(seconds=1)

        return self.starting


            

    def get_previous_task(self):
        return filter(
            lambda pre_task : pre_task.id > self.id,
            self.prerequisite.all()
        )

    def get_prerequisite(self):
        return filter(
            lambda pre_task : pre_task.id < self.id,
            self.prerequisite.all()
        )

class Schedule(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    starting_min = models.DurationField("minimum duration before starting")

    def __str__(self):
        return str(Task.objects.get(id=self.task_id))
        
