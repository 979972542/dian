<template>
  <el-menu
    :default-active="route"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    router
  >
    <el-menu-item index="home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item index="merchandiselist">商品列表</el-menu-item>
      <el-menu-item index="classification">添加分类</el-menu-item>
      <el-menu-item index="merchandiseAdd">添加商品</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none;
}
</style>
