from django.urls import path

from . import views

app_name = 'scheduling'

urlpatterns = [
    path('', views.TaskView.as_view()), 
    path('<int:pk>/', views.TaskDetail.as_view(), name='task detail')
    
]