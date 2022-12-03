from django.urls import path
from rest_framework.authtoken import views as authviews

from . import views

urlpatterns = [
    path("token", authviews.obtain_auth_token),
    path("register", views.register),
    path("user", views.retrieve_user)
]