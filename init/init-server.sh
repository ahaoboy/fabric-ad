cd ./fabric-ad-server/javascript
npm i
npm run genIP

cd web 
npm i 
npm run build

cd ..

node enrollAdmin
node registerUser
npm run build:server

node run-server.js
# node invoke
# node query
# node server
# npm start