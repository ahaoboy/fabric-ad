# test-network
cd ./test-network

# chmod 777 ./ -R

./network.sh down


./network.sh up -ca -s couchdb


./network.sh createChannel 

./network.sh createChannel -c channel1

./network.sh createChannel -c channel2


./network.sh deployCC -l javascript

TEST_PWD=${PWD}

export TEST_PWD=${TEST_PWD}
echo "export TEST_PWD=${TEST_PWD}" >> ~/.bashrc

export PATH=${TEST_PWD}/../bin:${TEST_PWD}:$PATH
echo "export PATH=${TEST_PWD}/../bin:${TEST_PWD}:$PATH" >> ~/.bashrc


export FABRIC_CFG_PATH=$TEST_PWD/../config/
echo "export FABRIC_CFG_PATH=$TEST_PWD/../config/" >> ~/.bashrc
source ~/.bashrc

# Environment variables for Org1

export CORE_PEER_TLS_ENABLED=true
echo "export CORE_PEER_TLS_ENABLED=true" >> ~/.bashrc

export CORE_PEER_LOCALMSPID="Org1MSP"
echo "export CORE_PEER_LOCALMSPID=\"Org1MSP\"" >> ~/.bashrc

export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
echo "export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" >> ~/.bashrc

export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
echo "export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp" >> ~/.bashrc

export CORE_PEER_ADDRESS=localhost:7051
echo "export CORE_PEER_ADDRESS=localhost:7051" >> ~/.bashrc

source ~/.bashrc

# peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllStus"]}'


# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls true --cafile ${TEST_PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles ${TEST_PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${TEST_PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt -c '{"function":"changeStuAge","Args":["STU0", "111"]}'



# Environment variables for Org2
export CORE_PEER_TLS_ENABLED=true
echo "export CORE_PEER_TLS_ENABLED=true" >> ~/.bashrc

export CORE_PEER_LOCALMSPID="Org2MSP"
echo "export CORE_PEER_LOCALMSPID=\"Org2MSP\"" >> ~/.bashrc

export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
echo "export CORE_PEER_TLS_ROOTCERT_FILE=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" >> ~/.bashrc

export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
echo "export CORE_PEER_MSPCONFIGPATH=${TEST_PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp" >> ~/.bashrc

export CORE_PEER_ADDRESS=localhost:9051
echo "export CORE_PEER_ADDRESS=localhost:9051" >> ~/.bashrc

source ~/.bashrc

# peer chaincode query -C mychannel -n fabcar -c '{"Args":["queryAllStus"]}'



# ./network.sh down



cd ..



# finish
echo "finish"
