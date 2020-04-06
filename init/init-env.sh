echo "init env"

# install gcc g++
sudo apt-get install g++ gcc -y


# install node
apt update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


# install n
npm i n -g 

# change node v8
n 8.6.0
# n 9.0.0
# n 10.16.0


# install python3
sudo apt-get install python3 -y



# install docker
sudo apt-get remove -y docker docker-engine docker.io

sudo apt-get update

sudo apt-get -y install    apt-transport-https   ca-certificates    curl    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs)  stable"

sudo apt-get update

sudo apt-get install docker-ce -y

# install docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose



# install go
# wget https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz
# sudo tar -xzf go1.14.1.linux-amd64.tar.gz  -C /usr/local 


# echo "export GOPATH=$HOME/go" >> ~/.bashrc
# echo "export GOROOT=/usr/local/go" >> ~/.bashrc
# echo "export PATH=$PATH:$GOROOT/bin:$GOPATH/bin" >> ~/.bashrc
# source ~/.bashrc


# install gvm 
sudo apt install bison gcc make  binutils  -y

bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

source $HOME/.gvm/scripts/gvm

gvm install go1.14 -B
gvm use go1.14
# export GOROOT_BOOTSTRAP=$GOROOT
# source ~/.bashrc
 

# clone repo
# git clone https://github.com/hyperledger/fabric.git --depth=1

# cd fabric
# git checkout v1.4.0
# ./scripts/bootstrap.sh

# cd ..


# git clone https://github.com/hyperledger/fabric-samples.git


# cd fabric-samples
# git checkout v1.4.0
curl -sS https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh -o ./scripts/bootstrap.sh

chmod +x ./scripts/bootstrap.sh

# ./scripts/bootstrap.sh [version] [ca version] [thirdparty_version]
# ./scripts/bootstrap.sh 1.4.0
./scripts/bootstrap.sh



# # test-network
# cd test-network
# chmod 777 ./ -R
# ./network.sh down


# ./network.sh up 


# ./network.sh createChannel

# ./network.sh createChannel -c channel1

# ./network.sh createChannel -c channel2


# ./network.sh deployCC -l javascript

# TEST_PWD=${PWD}

# echo "export TEST_PWD=${TEST_PWD}" >> ~/.bashrc

# echo "export PATH=${TEST_PWD}/../bin:${TEST_PWD}:$PATH" >> ~/.bashrc



# echo "export FABRIC_CFG_PATH=$TEST_PWD/../config/" >> ~/.bashrc
# source ~/.bashrc

# # Environment variables for Org1


# echo "export CORE_PEER_TLS_ENABLED=true" >> ~/.bashrc
# echo "export CORE_PEER_LOCALMSPID="Org1MSP"" >> ~/.bashrc
# echo "export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" >> ~/.bashrc
# echo "export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" >> ~/.bashrc
# echo "export CORE_PEER_ADDRESS=localhost:7051" >> ~/.bashrc

# source ~/.bashrc

# peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllStus"]}'


# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls true --cafile ${TEST_PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles ${TEST_PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${TEST_PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"changeStuAge","Args":["STU0", "111"]}'



# # Environment variables for Org2

# echo "export CORE_PEER_TLS_ENABLED=true" >> ~/.bashrc
# echo "export CORE_PEER_LOCALMSPID=\"Org2MSP\"" >> ~/.bashrc
# echo "export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" >> ~/.bashrc
# echo "export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" >> ~/.bashrc
# echo "export CORE_PEER_ADDRESS=localhost:9051" >> ~/.bashrc

# source ~/.bashrc

# peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllStus"]}'



# # ./network.sh down



# cd ..



# # finish

# echo "finish"
