from rest_framework import generics, permissions
from .serializers import TodoSerializer, TodoToggleCompleteSerializer
from todo.models import Todo

# ListAPIView is a built in generic class which creates read only endpoingts for models instances.

# listAPIView requires 2 mandatory attributes 
# 1. serializer_class 
# 2. queryset. 

# we specify TodoSerializer which we have earlier implemented. 
    
# class TodoList(generics.ListAPIView):
class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes =  [permissions.IsAuthenticated]
    # permission_classes =  [permissions.IsAuthenticated] will ensure that only registered users to call the API. (signing out out the adming pannels will throw a 403 not found error)
    
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by("-created")

    def perform_create(self, serializer):
# serializer will holds a django model
        serializer.save(user=self.request.user) 
            
# get_queryset returns the queryset of todo objects for the view. In this case we specify the query set as all todos which the match the user.  additionally we order the todos by date showing the latest todo 1st. query_set is customizable to to retur the set of todos that you want. 

#add urls for above view - path("todos/",  views.TodoListCreate.as_view()),

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        #user can only update, delete their own post 
        return Todo.objects.filter(user=user)
    
#add url for above view - path("todos/<int:pk>",  views.TodoRetrieveUpdateDestroy.as_view()),
    
    
# This view will be used to impliment the complete functionality fo a todo

# As the name says TodoToggleComplete will toggle a todo fro incomplete to complete and vice-versa
# TodoToggleComplete extends the UpdateAPIView
class TodoToggleComplete (generics.UpdateAPIView):
    serializer_class = TodoToggleCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes make it so that only authenticated users can mark a todo as complete
    
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)
    
    def perform_update(self, serializer):
        serializer.instance.completed=not(serializer.instance.completed)
        serializer.save()
    # similar to perform_create, perform_update is called before the update happens.in it
    # we invert the todo's completed boolean value. if True, set to False, if False set to true.    