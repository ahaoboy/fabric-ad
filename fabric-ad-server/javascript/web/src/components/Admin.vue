<template>
  <div>
    <h1>admin</h1>

    <router-link class="el-link" to="/">home</router-link> &nbsp;&nbsp;&nbsp;
    <router-link class="el-link" to="/addUser">addUser</router-link> &nbsp;&nbsp;&nbsp;
    <router-link class="el-link" to="/login">login</router-link> &nbsp;&nbsp;&nbsp;


    <el-button @click="refresh">刷新</el-button>


    <el-table
      :row-class-name="tableRowClassName"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        :formatter="formatter"
        prop="time"
        label="时间"
        width="180"
      ></el-table-column>
      <el-table-column prop="ip" label="IP" width="180"></el-table-column>
      <el-table-column prop="aid" label="aid"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getUser} from "../api";

  async function getData() {
    let uid = localStorage.getItem("uid");
    let user = await getUser(uid);
    console.log("user", user);
    let record = user.record;
    // record.forEach(item => {
    // item.time = new Date(item.time).toLocaleString();
    // });
    // .map(item => ({
    //   date: item.time,
    //   ip: item.ip,
    //   uid
    // }));

    return record;
  }

  export default {
    data() {
      return {
        tableData: []
      };
    },
    methods: {
      formatter(row, column, cellValue, index) {
        return new Date(cellValue).toLocaleString();
      },
      tableRowClassName({row, rowIndex}) {
        // console.log(row);
        if (!this.valiData.has(row.time)) return "warning-row";
        return "success-row";
      },
      async refresh() {
        this.tableData = await getData();
        let gap = 10000;
        this.valiData = new Set();
        let st = this.tableData[0];
        for (let i = 1; i < this.tableData.length; i++) {
          let ed = this.tableData[i];

          if (ed.time - st.time > gap) {
            this.valiData.add(ed.time);
          }
          st = ed;
        }
        console.log(this.tableData);
        console.log(this.valiData);
      }
    },
    async created() {
      let uid = localStorage.getItem('uid')
      if (!uid) {
        this.$router.push('/')
        return
      }

      await this.refresh()
    }
  };
</script>

<style>
  .el-table .warning-row {
    background: lightgray;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
