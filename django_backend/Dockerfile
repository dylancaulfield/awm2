FROM dylancaulfield/awm:djangoenv

WORKDIR /app

COPY ./django_backend .

WORKDIR /app

ENV DOCKER=1

ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "env", "python", "manage.py", "runserver", "8000"]
