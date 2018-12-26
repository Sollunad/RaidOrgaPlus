git pull
cd frontend
npm run build
rm -r /var/www/html
mv dist /var/www/html
service apache2 restart

cd ../backend
nodejs app.js
