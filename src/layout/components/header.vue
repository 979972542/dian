<template>
  <div class="header-wrap">
    <div class="logo">电商管理系统</div>
    <div @click="Logout" class="Logout">退出</div>
  </div>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$store.dispatch("user/Logout");
      this.$router.replace("/login");
      this.$message({
        message: "退出成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrap {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 30px;
  }
  .Logout {
    cursor: pointer;
  }
}
</style>
