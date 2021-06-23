<template>
  <el-table :data="props.row.specsList" style="width: 100%" border>
    <el-table-column prop="title" label="名称" width="180"> </el-table-column>
    <el-table-column prop="spec" label="类型">
      <template slot-scope="scope">
        <!-- 类型删除 -->
        <el-tag
          v-for="(item, index) in scope.row.spec"
          :key="index"
          class="tag"
          closable
          @close="handleClose(props.row.id, scope.$index, index)">
          {{ item +1}}
        </el-tag>

        <!-- 绿色添加（类型） -->
        <el-button
          type="success"
          icon="el-icon-plus"
          circle
          size="mini"
          @click="addspec(props.row.id, scope.$index)">
          </el-button>

      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">

        <el-button size="mini" @click="tagupdata(props.row.id, scope.$index)">
          修改名称
        </el-button>

        <el-button
          size="mini"
          type="danger"
          @click="removelist(props.row.id, scope.$index)">
          删除
        </el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["props"],
  computed: {
    List() {
      return this.$store.getters.getList;
    },
  },
  mounted(){
    console.log(this.props.row.id);
  },
  methods: {
    addspec(id, ro) {
      this.$prompt("请输入要添加的类型", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空",
      })
        .then(({ value }) => {
          this.$store.dispatch("spu/addspec", { value, id, ro });
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
    handleClose(id, ro, r) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/removespec", { id, ro, r });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    tagupdata(id, ro) {
      let input = this.List.filter((row) => row.id == id);
      input.forEach((el) => {
        this.aaa = el;
      });
      this.$prompt("请输入修改的规格名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空",
        inputValue: `${this.aaa.specsList[ro].title}`,
      })
        .then(({ value }) => {
          this.$store.dispatch("spu/tagupdata", { id, ro, value });
          this.$message({
            type: "success",
            message: "修改成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    removelist(id, ro) {
      console.log(ro);
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/removelist", { id, ro });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
}
</style>