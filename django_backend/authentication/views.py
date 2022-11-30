import json

from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from authentication.serializer import UserSerializer


@api_view(("POST",))
def register(request):
    data = json.loads(request.body)

    user = User.objects.create_user(data["email"], data["email"], data["password"])
    user.save()

    return HttpResponse(status=200)


@api_view(("GET",))
def retrieve_user(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
