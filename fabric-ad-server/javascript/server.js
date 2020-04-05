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
let  contract = null;
app.post("/getSource", function(req, res) {
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

app.post("/queryAllStus", async function(req, res) {
    const result = await contract.evaluateTransaction("queryAllStus");
    result = JSON.parse(result.toString());
    res.json(result);
});

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
