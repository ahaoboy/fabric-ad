<template>
  <div>
    <center>
      <h1>基于区块链和智能合约技术的防欺诈广告</h1>
      <h1>点击审查方案的研究与实现</h1>
    </center>

    <el-tabs type="card" v-model="activeName" @tab-click="handleClick($event)">

      <el-tab-pane label="注册" name="addUser">
        <addUser @addUser="addUser"></addUser>
      </el-tab-pane>
      <el-tab-pane @login="login" label="登录" name="login">
        <login></login>
      </el-tab-pane>
      <el-tab-pane label="主页" name="click">
        <ClickPage></ClickPage>
      </el-tab-pane>
      <el-tab-pane label="管理" name="admin">
        <admin></admin>
      </el-tab-pane>
      <el-tab-pane label="注销" name="logout">
        <logout @logout="activeName='login'"></logout>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Admin from './Admin'
  import ClickPage from "./ClickPage";
  import AddUser from "./AddUser";
  import Login from "./Login";
  import Logout from "./Logout";

  const components = {
    Admin, ClickPage, AddUser, Login, Logout
  }

  export default {
    components,
    data() {
      return {
        activeName: 'login'
      };
    },
    methods: {
      login(user) {
        this.activeName = 'click'
      },
      handleClick(e) {
        console.log(' handleClick e', this.activeName)
        let isLogin = localStorage.getItem('uid')
        let needVali = ['admin', 'click', 'logout'].includes(this.activeName)
        if (needVali && !isLogin) {
          console.log('need login')
          this.$message('请先进行登录')
          this.$nextTick(
            () => this.activeName = 'addUser'
          )
        }

        if (!needVali && isLogin) {
          this.$nextTick(
            () => this.activeName = 'click'
          )
        }
      },
      addUser(user) {
        console.log('user', user)
        if (user) {
          this.activeName = 'click'
        }
      }
    },
    created() {
    }
  };
</script>

<style>

</style>
