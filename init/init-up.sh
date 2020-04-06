# test-network
cd ./test-network

# chmod 777 ./ -R

./network.sh down


./network.sh up -ca -s couchdb


./network.sh createChannel 

./network.sh createChannel -c channel1

./network.sh createChannel -c channel2


./network.sh deployCC -l javascript
