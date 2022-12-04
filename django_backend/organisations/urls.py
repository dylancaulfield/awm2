from django.urls import path

from . import views

urlpatterns = [
    path("", views.retrieve_user_organisations),
    path("timesheets/start", views.timesheet_clock_in),
    path("timesheets/end", views.timesheet_clock_out),
    path("timesheets", views.timesheet_list_clocked_in)
    # path("register", views.register),
    # path("user", views.retrieve_user)
]
