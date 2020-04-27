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
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addUser} from "../api";

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

        let resp = await addUser(uid, pwd);
        console.log('resp', resp)
        if (resp) {
          // this.$router.push("/");
          localStorage.setItem("uid", uid);
          localStorage.setItem("pwd", pwd);
          this.$emit('addUser', {uid, pwd})
          return
        }

        this.$message('用户已存在,请直接登录')

      }
    }
  };
</script>

<style>
</style>
