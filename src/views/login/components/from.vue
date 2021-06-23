<template>
  <el-form :model="form" :rules="rules" class="demo-ruleForm">

    <el-form-item prop="account">
      <el-input

        v-model="form.account"

        prefix-icon="el-icon-user-solid"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input

        v-model="form.password"

        prefix-icon="el-icon-lock"
        placeholder="请输入密码"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="login-btn" @click="submit"
        >登陆</el-button
      >
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "123",
        password: "123",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    // user() {
    //   return this.$store.getters.getUser;
    // },
    active() {
      return this.$store.getters.getActive;
    },
  },
  methods: {
    submit() {
      if (this.form.account != "" && this.form.password != "") {
        // 账号密码不为空
        this.$store.dispatch("user/setAdmin", this.form);
        if (this.active) {
          this.$message({
            message: "恭喜你，登陆成功",
            type: "success",
            // success，loading，error，warning
          });
          this.$router.replace("/");
        } else {
          this.$message.error("账号或密码错误");
        }
      }
    },
  },
};
</script>

<style lang="less"></style>
