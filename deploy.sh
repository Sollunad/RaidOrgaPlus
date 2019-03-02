git reset --hard
git pull
npm run install
npm run build
rm -r /var/www/html
mv frontend/dist /var/www/html
service apache2 restart

screen -S backend -X quit
screen -d -m -S backend bash -c 'cd backend && nodejs app.js'
