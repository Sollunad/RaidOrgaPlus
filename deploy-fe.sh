#!/bin/sh
git reset --hard
git pull
npm run install

npm run build
rm -r /var/www/html
mv frontend/dist /var/www/html
service apache2 restart

