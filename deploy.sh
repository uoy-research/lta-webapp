#!/bin/sh

name='uoy/lta-webapp'
file='./docker-lta-webapp-latest.tar'
remote='langtrackappdev'

sudo docker build -t "$name" .
sudo docker save -o "$file" "$name"
sudo chown "$USER:$USER" "$file"
sudo docker load -i "$file"
rsync -rva docker-lta-webapp-latest.tar "$remote:~/langtrackapp/src/docker-lta-webapp-latest.tar"
