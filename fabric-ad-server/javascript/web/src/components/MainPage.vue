<template>
  <div>
    <h1>MainPage</h1>
    <div class="aid" @click="click">{{aid}}</div>
  </div>
</template>

<script>
import { addRecord } from "../api";

let aids = ["apple", "xiaomi", "huawei"];

function getAid() {
  let i = parseInt(Math.random() * aids.length);
  return aids[i];
}
export default {
  data() {
    return {
      aid: ""
    };
  },
  methods: {
    click() {
      let uid = localStorage.getItem("uid");
      addRecord(uid, this.aid);
    }
  },
  created() {
    this.aid = getAid();
    let uid = localStorage.getItem("uid");
    if (!uid) {
      this.$router.push("/addUser");
    }
  }
};
</script>

<style>
.aid {
  width: 200px;
  height: 200px;
  display: flex;
  background: gray;
}
</style>