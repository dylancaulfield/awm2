from datetime import datetime

from django.db import models
from django.contrib.gis.db import models as geomodels
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string


# Create your models here.
class Organisation(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=8, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.code = get_random_string(length=8, allowed_chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        super(Organisation, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name


class OrganisationMember(models.Model):
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)

    class Meta:
        unique_together = ('organisation', 'member')

    def __str__(self):
        return f"{self.organisation}.{self.member}"


class Location(geomodels.Model):
    name = geomodels.CharField(max_length=50)
    bounds = geomodels.PolygonField()
    organisation = geomodels.ForeignKey(Organisation, related_name="locations", on_delete=geomodels.CASCADE)

    def __str__(self):
        return f"{self.organisation.name} -> {self.name}"


class TimesheetEntry(models.Model):
    start = models.DateTimeField(default=datetime.now)
    finish = models.DateTimeField(null=True, blank=True)
    location = models.ForeignKey("Location", on_delete=models.CASCADE)
    member = models.ForeignKey("Member", on_delete=models.CASCADE)

    def __str__(self):
        return f"[{self.location.name}] {self.member.user.first_name} @ {self.start}"
