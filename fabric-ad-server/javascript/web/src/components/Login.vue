<template>
  <div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="uid">
        <el-input type="text" v-model="ruleForm.uid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="uid">
        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="checkPass"> -->
      <!-- <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input> -->
      <!-- </el-form-item> -->
      <!-- <el-form-item label="年龄" prop="age"> -->
      <!-- <el-input v-model.number="ruleForm.age"></el-input> -->
      <!-- </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getUser} from "../api";

  export default {
    data() {
      return {
        ruleForm: {
          uid: "",
          pwd: ""
          // pass: "",
          // checkPass: "",
          // age: ""
        }
      };
    },
    methods: {
      resetForm(user) {
        console.log("resetForm", user);
        this[user].uid = "";
        this[user].pwd = "";
      },
      async submitForm(name) {
        let {uid, pwd} = this[name];
        console.log("submitForm", uid, pwd);
        //   await addUser(uid, pwd);
        let user = await getUser(uid);
        if (user.pwd === pwd) {
          localStorage.setItem("uid", uid);
          localStorage.setItem("pwd", pwd);
          this.$emit('login', {pwd, uid})
          return;
        }
        console.log("密码错误", user, uid, pwd);
      }
    }
  };
</script>

<style>
</style>
