#!/bin/bash
if [ $( docker ps -a | grep wallet-backend | wc -l ) -gt 0 ]; then 
    docker rm -f wallet-backend
else
  echo "Container does not exist" 
fi
if [ $( docker images | grep wallet-backend| wc -l ) -gt 0 ]; then
    docker rmi admin-backend:latest
else
  echo "Image does not exist" 
fi
if [ -d "/home/asset_cdw_corp_wallet_backend" ]; then
    sudo rm -rf /home/asset_cdw_corp_wallet_backend
else
  echo "directory does not exist" 
fi
cd /home 
sudo git clone -b  branch-name https://$2@github.com/cdwcorp/asset_cdw_corp_wallet_backend.git
docker build -t wallet-backend:latest .
docker run -d -p 4000:4000 --name wallet-backend wallet-backend:latest