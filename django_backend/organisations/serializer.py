from rest_framework import serializers
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


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class OrganisationMemberSerializer(serializers.ModelSerializer):
    #member = MemberSerializer()
    organisation = OrganisationSerializer()

    class Meta:
        model = OrganisationMember
        exclude = ["member", "id"]


class TimesheetEntrySerializer(serializers.ModelSerializer):
    location = LocationWithOrganisationSerializer()

    class Meta:
        model = TimesheetEntry
        exclude = ["member"]

