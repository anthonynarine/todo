from rest_framework import generics, permissions
from .serializers import TodoSerializer, TodoToggleCompleteSerializer
from todo.models import Todo

# imorts for token signup/login with token
from django.db import IntegrityError
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

""" ListAPIView is a built in generic class which creates read only endpoingts for models instances.
     listAPIView requires 2 mandatory attributes
     1. serializer_class
     2. queryset."""


# class TodoList(generics.ListAPIView):
class TodoListCreate(generics.ListCreateAPIView):
    # we specify TodoSerializer which we have earlier implemented.
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]
    """permission_classes =  [permissions.IsAuthenticated] will ensure that only registered
       users to call the API. (signing out out the adming pannels will throw a 403 not found error)"""


    """ get_queryset returns the queryset of todo objects for the view.
        In this case we specify the query set as all todos which the match the user.
        additionally we order the todos by date showing the latest todo 1st. query_set
        is customizable to to retur the set of todos that you want."""
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user).order_by("-created")

    def perform_create(self, serializer):
        # serializer will holds a django model
        serializer.save(user=self.request.user)

    # add urls for above view - path("todos/",  views.TodoListCreate.as_view()),


class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # user can only update, delete their own post
        return Todo.objects.filter(user=user)

    # add url for above view - path("todos/<int:pk>",  views.TodoRetrieveUpdateDestroy.as_view()),


""" This view will be used to impliment the complete functionality of a todo
    As the name says TodoToggleComplete will toggle a todo fro incomplete to complete and vice-versa
    TodoToggleComplete extends the UpdateAPIView"""
class TodoToggleComplete (generics.UpdateAPIView):
    serializer_class = TodoToggleCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes make it so that only authenticated users can mark a todo as complete

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)

    def perform_update(self, serializer):
        serializer.instance.completed = not (serializer.instance.completed)
        serializer.save()
    """ similar to perform_create, perform_update is called before the update happens.in it
    we invert the todo's completed boolean value. if True, set to False, if False set to true."""
    
""" signup view will be used for the signup/token creation
    cross site request forgery (see notes below )"""
    
""" becasue this request is coming from a different domain (the frontend domain) and will not have
    the token required to pass the CSRF checks we use @csrf_exempt for this view"""    
@csrf_exempt
def signup(request):
    #check if the request is a POST request (the signup from in the front end will use a POST request for form submission)
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)  # data is a dictionary
            user = User.objects.create_user(
                username=data["username"],
                password=data["password"]
            )
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({"token" :str(token)}, status=201)
        except IntegrityError:
            return JsonResponse(
                {"error": "username take. choose another username"}, status=400,
            )
            
            
@csrf_exempt
def login(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        user = authenticate (
            request,
            username=data["username"],
            password=data["password"]
        ) 
        if user is None:
            return JsonResponse(
                {"error": "unable to login. check username and password"}, status=400 )
        else: #return token
            try:
                token = Token.objects.get(user=user)
            except: # if token not in db, create a new one
                token = token.objects.create(user=user)
            return JsonResponse({"token" :str(token)}, status=201)         
            
            
            
"""Normally when you make a request via a form you want the form being
submitted to your view to originate from your website and not come from 
some other domain. To ensure that this happens, you can put a csrf token 
in your form for your view to recognize. If you add @csrf_exempt to the
top of your view, then you are basically telling the view that it
doesn't need the token. This is a security exemption that you 
should take seriously."""           
            
