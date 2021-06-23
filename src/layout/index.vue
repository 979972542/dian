<template>
  <el-container class="index-box">
    <el-header height="auto">
      <headers></headers>
    </el-header>
    <el-container style="height: calc(100vh - 60px)">
      <el-aside width="auto">
        <asides></asides>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headers from "./components/header.vue";
import asides from "./components/aside.vue";

export default {
  data() {
    return {};
  },
  mounted() {
    // if (this.$store.getters.getActive != true) {
    //   this.$router.replace("/login");
    // }
  },

  components: { headers, asides },
};
</script>

<style lang="less" scoped>
.index-box {
  height: 100vh;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
  }

  .el-aside {
    background-color: #304156;
    color: #fff;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
}
</style>
