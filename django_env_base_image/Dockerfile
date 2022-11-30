FROM continuumio/miniconda3

WORKDIR /conda

COPY ./environment.yml .

RUN conda env create -f environment.yml