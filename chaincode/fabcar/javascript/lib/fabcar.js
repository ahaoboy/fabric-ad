/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class FabCar extends Contract {
    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger Stu===========");
        const cars = [
            {
                name: "a",
                age: 1
            },
            {
                name: "b",
                age: 1
            },
            {
                name: "c",
                age: 1
            }
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = "stu";
            await ctx.stub.putState(
                "STU" + i,
                Buffer.from(JSON.stringify(cars[i]))
            );
            console.info("Added <--> ", cars[i]);
        }
        console.info("============= END : Initialize Ledger Stu===========");
    }

    async queryStu(ctx, stuNumber) {
        const carAsBytes = await ctx.stub.getState(stuNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${stuNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createStu(ctx, stuNumber, name, age) {
        console.info("============= START : Create Stu ===========");

        const car = {
            name,
            docType: "stu",
            age
        };

        await ctx.stub.putState(stuNumber, Buffer.from(JSON.stringify(car)));
        console.info("============= END : Create Stu ===========");
    }

    async queryAllStus(ctx) {
        const startKey = "STU0";
        const endKey = "STU999";
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByRange(
            startKey,
            endKey
        )) {
            const strValue = Buffer.from(value).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async changeStuAge(ctx, stuNumber, newAge) {
        console.info("============= START : changeStuAge ===========");

        const carAsBytes = await ctx.stub.getState(stuNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${stuNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.age = newAge;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info("============= END : changeStuAge ===========");
    }
}

module.exports = FabCar;
