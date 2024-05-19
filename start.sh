#!/bin/bash

CONTAINER_NAME="api-opt-pdf-container"
IMAGE_NAME="api-opt-pdf-image"
PORT=8800

# Check if the container exists
if [ $(sudo docker ps -a -q -f name=$CONTAINER_NAME) ]; then
    # Stop the existing container
    sudo docker stop $CONTAINER_NAME

    # Remove the existing container
    sudo docker rm $CONTAINER_NAME
fi

# Check if the image exists
if [ $(sudo docker images -q $IMAGE_NAME) ]; then
    # Remove the existing image
    sudo docker image rm $IMAGE_NAME
fi

# Build a new image
sudo docker build -t $IMAGE_NAME .

# Run a new container from the newly built image
sudo docker run -d -p $PORT:8000 --name $CONTAINER_NAME $IMAGE_NAME

