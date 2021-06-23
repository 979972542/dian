<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="top">系统登陆</div>
      <from></from>
    </div>
  </div>
</template>

<script>
import from from "./components/from.vue";
export default {
  components: { from },
};
</script>

<style lang="less" >
.login-wrap {
  background-color: #2d3a4b;
  height: 100vh;
  .login-box {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    color: #fff;
    box-sizing: border-box;
    .top {
      font-size: 30px;
      text-align: center;
    }
    .demo-ruleForm {
  margin-top: 20px;
  .el-input__inner {
    border: 1px solid #3e4957;
    background-color: #2d3a4b;
    color: #fff;
    height: 50px;
    line-height: 50px;
  }
  .el-form-item.is-error .el-input__inner {
    border: 1px solid #3e4957;
  }
  .login-btn {
    width: 100%;
  }
}
  }
}
</style>