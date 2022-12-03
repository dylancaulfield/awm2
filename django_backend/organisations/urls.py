from django.urls import path

from . import views

urlpatterns = [
    path("", views.retrieve_organisations),
    # path("register", views.register),
    # path("user", views.retrieve_user)
]
