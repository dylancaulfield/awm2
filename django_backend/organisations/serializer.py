from rest_framework import serializers
from .models import Organisation, Member, OrganisationMember, Location, TimesheetEntry


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member


class OrganisationMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganisationMember


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location


class TimesheetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = TimesheetEntry
