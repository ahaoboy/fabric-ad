/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const {Contract} = require("fabric-contract-api");

class FabCar extends Contract {
  async initLedger(ctx) {
    console.info("============= START : Initialize Ledger Stu===========");
    const cars = [
      {
        name: "a",
        age: 1,
      },
      {
        name: "b",
        age: 1,
      },
      {
        name: "c",
        age: 1,
      },
    ];

    for (let i = 0; i < cars.length; i++) {
      cars[i].docType = "stu";
      await ctx.stub.putState(
        "STU" + i,
        Buffer.from(JSON.stringify(cars[i]))
      );

      console.info("Added <--> ", cars[i]);
    }

    let list = []
    for (let i = 0; i < 100; i++) {
      let uid = "testUser" + i;
      let p = ctx.stub.putState(
        uid,
        Buffer.from(
          JSON.stringify({
            uid,
            docType: "stu",
          })
        )
      );
      list.push(p)
    }
    await Promise.all(list)
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

  // 添加一个用户的记录
  async addUser(ctx, uid, pwd) {
    console.info("============= START : addUser ===========");
    let user = {
      uid,
      pwd,
      record: [],
    };
    let res = await ctx.stub.putState(
      uid,
      Buffer.from(JSON.stringify(user))
    );
    console.log("fabric addUser", uid, pwd, res ? res.toString() : "empty");

    console.info("============= END : addUser ===========");
    return user;
  }

  /*
      ad : {
          time, 点击时间
          ip,
          aid,  广告标示
      }
  */
  async addRecord(ctx, uid, record) {
    console.info("============= START : addRecord ===========");
    record = JSON.parse(record);
    const carAsBytes = await ctx.stub.getState(uid); // get the car from chaincode state
    if (!carAsBytes || carAsBytes.length === 0) {
      throw new Error(`${uid} does not exist`);
    }
    console.log(
      "fabric addRecord",
      uid,
      record,
      carAsBytes ? carAsBytes.toString() : "empty"
    );

    const car = JSON.parse(carAsBytes.toString());
    car.record.push(record);
    await ctx.stub.putState(uid, Buffer.from(JSON.stringify(car)));

    console.info("============= END : addRecord ===========");
    return car;
  }

  async getUser(ctx, uid) {
    const carAsBytes = await ctx.stub.getState(uid); // get the car from chaincode state
    if (!carAsBytes || carAsBytes.length === 0) {
      // throw new Error(`${uid} does not exist`);
      return false;
    }
    console.log(
      "fabric getUser",
      uid,
      carAsBytes ? carAsBytes.toString() : "empty"
    );
    const car = JSON.parse(carAsBytes.toString());
    return car;
  }

  async createStu(ctx, stuNumber, name, age) {
    console.info("============= START : Create Stu ===========");

    const car = {
      name,
      docType: "stu",
      age,
    };

    await ctx.stub.putState(stuNumber, Buffer.from(JSON.stringify(car)));
    console.info("============= END : Create Stu ===========");
  }

  async queryAllStus(ctx) {
    const startKey = "STU0";
    const endKey = "STU999";
    const allResults = [];
    for await (const {key, value} of ctx.stub.getStateByRange(
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
      allResults.push({Key: key, Record: record});
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

    await ctx.stub.putState(stuNumber, Buffer.from(JSON.stringify(car)));
    console.info("============= END : changeStuAge ===========");
  }
}

module.exports = FabCar;
