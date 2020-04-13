/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const {Gateway, Wallets} = require("fabric-network");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    // const walletPath = path.join(process.cwd(), "wallet");
    // const wallet = await Wallets.newFileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    // const identity = await wallet.get("appUser");
    // if (!identity) {
    //     console.log(
    //         'An identity for the user "appUser" does not exist in the wallet'
    //     );
    //     console.log("Run the registerUser.js application before retrying");
    //     return;
    // }

    // Create a new gateway for connecting to our peer node.

    // Get the contract from the network.

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
    // await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');

    let st = +new Date();
    let COUNT = 100;
    let p = []

    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    // const network = await gateway.getNetwork("mychannel");

    for (let i = 0; i < COUNT; i++) {
      let uid = "testAddUser" + i;
      console.log(uid)
      // const walletPath = path.join(process.cwd(), "wallet");
      // const wallet = await Wallets.newFileSystemWallet(walletPath);
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: {enabled: true, asLocalhost: true},
      });
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork("mychannel");
      const contract = network.getContract("fabcar");

      let res = contract.submitTransaction("addUser", uid, uid)
      res.then(
        () => gateway.disconnect()
      )
      p.push(res);
    }
    await Promise.all(p)
    let ed = +new Date();
    console.log(
      "Transaction has been submitted count: ",
      COUNT,
      "time: ",
      ed - st
    );
    // Disconnect from the gateway.
    // await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

main();

