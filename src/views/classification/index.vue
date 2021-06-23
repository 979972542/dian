<!-- 添加分类 -->
<template>
  <div>
    <add-class></add-class>
    <el-table :data="totaltab" style="width: auto" border>
      <el-table-column
        type="index"
        width="150"
        label="序号"
        :index="(currentPage - 1) * pagesize + 1"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="title" label="分类名称" width="400" align="center">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="change(scope.$index)">修改</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import addClass from "./components/addClass.vue";
export default {
  components: { addClass },
  data() {
    return {
      currentPage: 1, //当前页数
      pagesize: 10, //每页显示多少
    };
  },
  computed: {
    List() {
      return this.$store.getters.getList;
    },
    Tab() {
      return this.$store.getters.getTab;
    },
    total() {
      return this.Tab.length;
    },
    totaltab() {
      return this.Tab.slice(
        (this.currentPage - 1) * this.pagesize,
        this.pagesize * this.currentPage
      );
    },
  },
  methods: {
    remove(index) {
      index = this.currentPage * this.pagesize - (this.pagesize - index);
      let title = this.List.filter((row) => row.type == this.Tab[index].title);
      if (title.length > 0) {
        this.$alert("该分类下有多个商品，不可删除该分类", "警告", {
          confirmButtonText: "确定",
          callback: () => {
            this.$message({
              type: "warning",
              message: `删除失败`,
            });
          },
        });
      } else {
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("classify/updata", index);
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
      }
    },
    change(index) {
      index = this.currentPage * this.pagesize - (this.pagesize - index);
      let title = this.Tab[index].title;
      this.$prompt("请输入修改的分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空",
        inputValue: `${this.Tab[index].title}`,
      })
        .then(({ value }) => {
          let type = this.Tab.filter((row) => row.title == value);
          if (type.length != 0) {
            this.$message.error("修改失败，已有该分类名称");
          } else {
            this.$store.dispatch("classify/change", {
              index: index,
              val: value,
            });
            this.$store.dispatch("spu/changeSkuClass", {
              old: title,
              new: value,
            });
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    handleSizeChange(val) {
      this.currentPage = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped></style>
