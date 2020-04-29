#!/bin/sh
git reset --hard
git pull
npm run install

pm2 restart ro_backend