from datetime import datetime
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Organisation, Member, OrganisationMember, Location, TimesheetEntry

from .serializer import OrganisationMemberDataSerializer, OrganisationMemberSerializer, \
    OrganisationOnlySerializer, TimesheetEntrySerializer


@api_view(("GET",))
def retrieve_user_organisations(request):
    organisations = OrganisationMember.objects.filter(member__user=request.user)

    serializer = OrganisationMemberSerializer(organisations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(("POST",))
def retrieve_organisation_users(request):
    data = json.loads(request.body)

    organisation_members = OrganisationMember.objects.filter(organisation__code=data["organisationCode"])

    serializer = OrganisationMemberDataSerializer(organisation_members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(("POST",))
def create_organisation(request):
    data = json.loads(request.body)

    organisation = Organisation.objects.create(name=data["name"])
    organisation.save()

    member = Member.objects.filter(user=request.user).first()
    if member is None:
        member = Member.objects.create(user=request.user)

    organisation_member = OrganisationMember.objects.create(member=member, organisation=organisation)
    organisation_member.save()

    serializer = OrganisationOnlySerializer(organisation)
    return Response(serializer.data, status=status.HTTP_200_OK)


# TODO
@api_view(("POST",))
def create_organisation_location(request):
    data = json.loads(request.body)

    organisation = Organisation.objects.create(name=data["name"])
    organisation.save()

    member = Member.objects.filter(user=request.user).first()
    if member is None:
        member = Member.objects.create(user=request.user)

    organisation_member = OrganisationMember.objects.create(member=member, organisation=organisation)
    organisation_member.save()

    serializer = OrganisationOnlySerializer(organisation)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(("POST",))
def user_join_organisation(request):
    data = json.loads(request.body)

    member = Member.objects.filter(user=request.user).first()
    if member is None:
        member = Member.objects.create(user=request.user)

    organisation_member = OrganisationMember.objects.filter(member=member,
                                                            organisation__code=data["organisationCode"]).first()
    organisation = Organisation.objects.get(code=data["organisationCode"])

    if organisation_member is None:

        organisation_member = OrganisationMember.objects.create(member=member, organisation=organisation)
        organisation_member.save()

    serializer = OrganisationOnlySerializer(organisation)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Timesheet


@api_view(("GET",))
def timesheet_list_clocked_in(request):
    entries = TimesheetEntry.objects.filter(finish__isnull=True, member__user=request.user)

    serializer = TimesheetEntrySerializer(entries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(("POST",))
def timesheet_clock_in(request):
    data = json.loads(request.body)

    location_id = data["locationId"]
    member = Member.objects.get(user=request.user)

    timesheet_entry = TimesheetEntry.objects.create(location_id=location_id, member=member)
    timesheet_entry.save()

    return Response(timesheet_entry.id, status=status.HTTP_200_OK)


@api_view(("PUT",))
def timesheet_clock_out(request):
    data = json.loads(request.body)

    timesheet_entry = TimesheetEntry.objects.get(pk=data["timesheetEntryId"], member__user=request.user)
    timesheet_entry.finish = datetime.now()
    timesheet_entry.save()

    return Response(timesheet_entry.id, status=status.HTTP_200_OK)
