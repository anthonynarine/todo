from rest_framework import generics, permissions
from .serializers import TodoSerializer
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

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        #user can only update, delete their own post 
        return Todo.objects.filter(user=user)
