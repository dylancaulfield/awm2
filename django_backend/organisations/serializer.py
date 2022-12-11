from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Organisation, Member, OrganisationMember, Location, TimesheetEntry


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        exclude = ["organisation"]


class OrganisationOnlySerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = '__all__'


class LocationWithOrganisationSerializer(serializers.ModelSerializer):
    organisation = OrganisationOnlySerializer()

    class Meta:
        model = Location
        exclude = ["bounds"]


class OrganisationSerializer(serializers.ModelSerializer):
    locations = LocationSerializer(many=True)

    class Meta:
        model = Organisation
        fields = '__all__'


class OrganisationMemberSerializer(serializers.ModelSerializer):
    organisation = OrganisationSerializer()

    class Meta:
        model = OrganisationMember
        exclude = ["member", "id"]


class TimesheetEntrySerializer(serializers.ModelSerializer):
    location = LocationWithOrganisationSerializer()

    class Meta:
        model = TimesheetEntry
        exclude = ["member"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name"]


class MemberSerializer(serializers.ModelSerializer):
    timesheets = TimesheetEntrySerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Member
        fields = "__all__"


# All members of an organisation and their timesheet data
class OrganisationMemberDataSerializer(serializers.ModelSerializer):
    member = MemberSerializer()

    class Meta:
        model = OrganisationMember
        exclude = ["id", "organisation"]
