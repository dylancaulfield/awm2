from django.urls import path

from . import views

urlpatterns = [
    path("", views.retrieve_user_organisations),
    # path("register", views.register),
    # path("user", views.retrieve_user)
]
