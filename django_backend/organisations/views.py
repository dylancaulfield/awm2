import json

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .models import Organisation, Member, OrganisationMember, Location, TimesheetEntry

from .serializer import OrganisationSerializer, MemberSerializer, OrganisationMemberSerializer

def register(request):
    data = json.loads(request.body)

    user = User.objects.create_user(data["email"], data["email"], data["password"])
    user.first_name = data["name"]
    user.save()

    token, created = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
    })


@api_view(("GET",))
def retrieve_user_organisations(request):

    x = OrganisationMember.objects.filter(member__user=request.user)

    serializer = OrganisationMemberSerializer(x, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
