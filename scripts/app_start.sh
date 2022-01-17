#!/bin/bash
cd /home/ubuntu/revisto/server
pm2 start index.js --name "Revisto Backend"