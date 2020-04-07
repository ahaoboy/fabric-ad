<template>
  <div>
    <h1>MainPage</h1>

    <router-link class="el-link" to="/admin">admin</router-link> &nbsp;&nbsp;&nbsp;
    <router-link class="el-link" to="/addUser">addUser</router-link> &nbsp;&nbsp;&nbsp;
    <router-link class="el-link" to="/login">login</router-link> &nbsp;&nbsp;&nbsp;

    <div @click="click">{{ad.aid || ""}}</div>
    <div class="aid" :style="`background-image: url('${ad.url || ''}')` " @click="click"></div>

    <el-button @click="refresh">刷新</el-button>
  </div>
</template>

<script>
  import {addRecord} from "../api";

  let urls = {
    'xiaomi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/1200px-Xiaomi_logo.svg.png',
    'apple': "http://cdn.osxdaily.com/wp-content/uploads/2017/08/apple-event-2017-september-logo-610x659.jpg",
    'huawei': "http://img.cnmo-img.com.cn/453_500x375/452381.jpg"
  }

  function getAid() {
    let aids = Object.keys(urls)
    let i = parseInt(Math.random() * aids.length);
    return {
      aid: aids[i],
      url: urls[aids[i]]
    };
  }

  export default {
    data() {
      return {
        ad: {}
      };
    },
    methods: {
      click() {
        let uid = localStorage.getItem("uid");
        addRecord(uid, this.ad.aid);
      },
      refresh() {
        this.ad = getAid();
      }
    },
    created() {
      // this.ad = getAid();
      this.refresh()
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
    /*background: gray;*/
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
