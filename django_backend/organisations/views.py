from datetime import datetime
import json

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Organisation, Member, OrganisationMember, Location, TimesheetEntry

from .serializer import OrganisationSerializer, MemberSerializer, OrganisationMemberSerializer, TimesheetEntrySerializer


@api_view(("GET",))
def retrieve_user_organisations(request):

    organisations = OrganisationMember.objects.filter(member__user=request.user)

    serializer = OrganisationMemberSerializer(organisations, many=True)
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
