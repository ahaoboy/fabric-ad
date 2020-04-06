/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
import { PORT } from "./config";
var express = require("express");
var app = express();
var bodyParser = require("body-parser"); //解析,用req.body获取post参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");
const cors = require("cors");
const path = require("path");
import { getContract } from "./init";

app.use(cors());
app.use(express.static("./web/dist"));
let contract = null;
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
    let result = await contract.evaluateTransaction("queryAllStus");
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
    let result = await contract.submitTransaction("addUser", uid, pwd);
    // let result = await contract.evaluateTransaction("queryAllStus");
    result = JSON.parse(result.toString());
    res.json(result);
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
    let result = await contract.submitTransaction("addUser", uid, record);
    // let result = await contract.evaluateTransaction("queryAllStus");
    result = JSON.parse(result.toString());
    res.json(result);
});

app.post("/getUser", async function (req, res) {
    let { uid } = req.body;
    let result = await contract.evaluateTransaction("getUser", uid);
    result = JSON.parse(result.toString());
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
        contract = await getContract();

        app.listen(PORT, () =>
            console.log(`Example app listening on port ${PORT}!`)
        );
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

// netstat -ap | grep 3000
