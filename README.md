# Introduction

I created a time tracking app that could be used by a business to track employees working hours.

To "clock in" a user must be within one of the polygons/geofences created by the organisation that represent a location such as an office/factory/shop etc. 

## Technologies Used

- Vue
- Django REST Framework
- Gunicorn HTTP Server
- Vultr Cloud
- Docker
- Cloudflare Proxy for SSL (mkcert locally)


# Project Structure

## django_backend/

This contains the django backend application.

## django_env_base_image/

This contains a Dockerfile to build an image that sets up a conda environment with the necessary requirements. I used this base image to build my django image. This base imge is very big ~2GB so building it once and reusing it saved a lot of time.

## nginx/

This contains a Dockerfile that created a custom nginx image that:
- Copies the built files from the vue folder into a directory to serve the client application
- Copies a configuration file to setup nginx server/location blocks

## postgres/

This contains an environment variables file for the postgis and pgadmin containers with default usernames etc.

## vue/ 

This contains the vue frontend application.

# Deployment

The cloud branch contains a commit that changes the configurations to be suitable for deploying to the cloud. To deploy I rebase the HEAD commit of the branch onto master. I pull the cloud branch on the cloud server and "docker compose up -d". 

Migrations have to be performed manually by running the "run-migration.sh" file within the running container and then restarting the container. Automatically performing migrations on a database would be a bad idea because it could cause data loss.