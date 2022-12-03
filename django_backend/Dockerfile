FROM dylancaulfield/awm:djangoenv

WORKDIR /app

COPY ./django_backend .

WORKDIR /app

ENV DOCKER=1

ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "env", "gunicorn", "django_backend.wsgi", "--bind", "0.0.0.0:8000"]
