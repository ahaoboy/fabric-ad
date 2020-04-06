<template>
  <div>
    <h1>admin</h1>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUser } from "../api";

async function getData() {
  let uid = localStorage.getItem("uid");
  let user = await getUser(uid);
  let record = user.record;
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
  async created() {
    this.tableData = await getData();
  }
};
</script>

<style>
</style>