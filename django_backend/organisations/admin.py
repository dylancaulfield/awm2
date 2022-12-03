from django.contrib import admin
from.models import Organisation, Member, OrganisationMember, Location, TimesheetEntry

# Register your models here.
admin.site.register(Organisation)
admin.site.register(Member)
admin.site.register(OrganisationMember)
admin.site.register(Location)
admin.site.register(TimesheetEntry)
