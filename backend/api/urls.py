from django.urls import path
from . import views

urlpatterns = [
    # path("todos/",  views.TodoList.as_view()),
    path("todos/",  views.TodoListCreate.as_view()),
    path("todos/<int:pk>",  views.TodoRetrieveUpdateDestroyy.as_view()),
]


# views.TodoList is an instance of a class-based generic view. Django's generic views help us quickly write view to do common tasks like: 
#  Display a list of objects e.g list of todos. 
#  Display detail pages of a single object e.g detail page of a todo.
# Allow users to create update and delete objects with or without authorization.