#!/bin/sh
git reset --hard
git pull
npm run install

screen -S backend -X quit
screen -d -m -S backend bash -c 'npm run start-backend'