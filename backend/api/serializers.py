
# serializers whill translate the data from the Todo Model instances 
# into JSON objects that is easy to consume over the internet. The JSON
# objects are outputted at the API endpoingts urls. 

from rest_framework import serializers
from todo.models import Todo

#we extend DRF's ModelSerializer into a TodoSerializer class. ModelSerializer provides an API to create serializers from your models.
class TodoSerializer(serializers.ModelSerializer):
    #autopopulated by app when a todo is created and when marked as complete. User can't manipulate
    created = serializers.ReadOnlyField()
    completed = serializers.ReadOnlyField()
# under the Meta class we specify our database model Todo and the fields we want to expose.
    class Meta:
        model = Todo
        fields = "__all__"
        # fields = ["id", "title", "memo", "created", "completed"]
# Remember id is automatically created in the the database

class TodoToggleCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id"]
        read_only_fields = ["title", "memo", "created", "completed"]
        # since this serializer is not updating any of the fields value from the
        # endpoint (we are just toggling complete) we set the fields to read
        # only by specifying them in the Meta shortcut option read_only_fields.
        # these fiends allows us to specify multiple dields as a read-only
        
        
