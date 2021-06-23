<template>
<!-- 添加规格按钮 -->
  <div class="spec">
    <el-button type="primary" size="mini" @click="addspecsList(props.row.id)"
      >添加规格</el-button
    >
  </div>
</template>

<script>
export default {
  props: ["props"],
  methods: {
    addspecsList(id) {
      this.$prompt("请输入要添加的规格", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空",
      })
        .then(({ value }) => {
          console.log(value);
          this.$store.dispatch("spu/addspecsList", { value, id });
          this.$message({
            type: "success",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.spec{
  margin-bottom: 5px;
}
</style>