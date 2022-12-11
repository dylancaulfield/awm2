from django.urls import path

from . import views

urlpatterns = [
    path("", views.retrieve_user_organisations),
    path("members", views.retrieve_organisation_users),
    path("join", views.user_join_organisation),
    path("create", views.create_organisation),
    path("timesheets/start", views.timesheet_clock_in),
    path("timesheets/end", views.timesheet_clock_out),
    path("timesheets", views.timesheet_list_clocked_in)
]
