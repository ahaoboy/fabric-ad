/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
import { PORT, HOST } from "./config";
var express = require("express");
var app = express();
var bodyParser = require("body-parser"); //解析,用req.body获取post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");
const cors = require("cors");
const path = require("path");
import { getContract } from "./init";

const { Subject, from } = require("rxjs");
const sub = new Subject();
const { map, concatMap, tap } = require("rxjs/operators");

sub.pipe(
    tap((x) => console.log("====tap====", x)),
    concatMap(async ([name, ...args]) => {
        let gateway = await getContract();
        console.log("name", name, "...args", ...args);
        const network = await gateway.getNetwork("mychannel");
        // Get the contract from the network.
        let contract = network.getContract("fabcar");
        let res = await contract[name](...args);
        await gateway.disconnect();
        return res;
    })
).subscribe((x) => console.log("====suc====", x));

app.use(cors());
app.use(express.static("./web/dist"));

app.post("/getSource", function (req, res) {
    console.log(req.body, typeof req.body);
    // let data = JSON.parse(req.body)
    // console.log(data)
    let src = req.body.path;
    // console.log(path)
    // console.log(process.cwd())
    let filePath = path.join(process.cwd(), src);
    console.log(filePath);
    let source = fs.readFileSync(filePath, "utf8");
    res.json({ source });
});

app.post("/queryAllStus", async function (req, res) {
    let result = await getContract().evaluateTransaction("queryAllStus");
    result = JSON.parse(result.toString());

    /*
[   
    Key: "STU1"
    Record: {age: 1, docType: "stu", name: "b"}
]
    */
    res.json(result);
});

app.post("/addUser", async function (req, res) {
    let { uid, pwd } = req.body;
    sub.next(["submitTransaction", "addUser", uid, pwd]);
    res.json("ok");
    // let result = await getContract().submitTransaction("addUser", uid, pwd);
    // let result = await getContract.evaluateTransaction("queryAllStus");
    // result = JSON.parse(result.toString());
    // console.log(
    // "server addUser",
    // uid,
    // pwd,
    // result ? result.toString() : "empty"
    // );
    // res.json(result);
});

/*
        ad : {
            time, 点击时间
            ip,
            aid,  广告标示
        }
*/

var get_client_ip = function (req) {
    var ipStr =
        req.headers["x-forwarded-for"] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        "";
    var ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipStr.split(",").length > 0) {
        ipStr = ipStr.split(",")[0];
    }
    var ip = ipReg.exec(ipStr);
    return ip[0] || "";
};

app.post("/addRecord", async function (req, res) {
    let { uid, aid } = req.body;
    let record = {
        time: +new Date(),
        ip: get_client_ip(req),
        aid,
    };

    // let result = await getContract().submitTransaction(
    //     "addRecord",
    //     uid,
    //     JSON.stringify(record)
    // );

    sub.next(["submitTransaction", "addRecord", uid, JSON.stringify(record)]);
    res.json("ok");

    // let result = await contract.evaluateTransaction("queryAllStus");
    // result = JSON.parse(result.toString());
    // console.log("server addRecord", uid, result ? result.toString() : "empty");
    // res.json(result);
});

app.post("/getUser", async function (req, res) {
    let { uid } = req.body;
    let result = await getContract().evaluateTransaction("getUser", uid);
    result = JSON.parse(result.toString());
    console.log("server getUser", result ? result.toString() : "empty");
    res.json(result);
});

// app.post("/getUser", async function (req, res) {
//     let { uid } = req.body;
//     let result = await contract.evaluateTransaction("getUser",uid);
//     result = JSON.parse(result.toString());
//     res.json(result);
// });

async function main() {
    try {
        // contract = await getContract();
        app.listen(PORT, () =>
            console.log(`APP URL: ${HOST}:${PORT}/#/addUser`)
        );
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

// netstat -ap | grep 3000
