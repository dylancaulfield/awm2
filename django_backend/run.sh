#!/bin/bash

conda init
source ~/.bashrc

conda activate env

python manage.py runserver 8000;