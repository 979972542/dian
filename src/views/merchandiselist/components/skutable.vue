<template>
  <div>
    <el-table :data="props.row.sku" style="width: 100%" border class="skutable">
      <el-table-column label="商品图片" width="100" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="组合">
        <template slot-scope="props">
          <el-tag
            v-for="(item, index) in props.row.Composition"
            :key="index"
            class="zh"
            >{{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="价格(元)" width="180">
      </el-table-column>
      <el-table-column prop="stock" label="库存(个)" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="skuInfo(props.row.id, scope.$index)"
            >修改123</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="removesku(props.row.id, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="组合信息"
      :visible.sync="dialogFormVisible"
      class="spuinfo"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="图片" class="img">
          <div class="img-box">
            <img :src="form.img" alt="" />
            <div class="show">
              <i
                class="el-icon-zoom-in"
                @click="handlePictureCardPreview(form.img)"
              ></i>
            </div>
          </div>
          <el-upload
            action=""
            list-type="picture-card"
            multiple
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.rate"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changesku">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["props"],
  data() {
    return {
      form: {
        img: "",
        rate: "",
        stock: "",
      },
      id: "",
      index: "",
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    List() {
      return this.$store.getters.getList;
    },
  },
  methods: {
    removesku(id, index) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("spu/removesku", { id, index });
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
    skuInfo(id, index) {
      this.dialogFormVisible = true;
      this.id = id;
      this.index = index;
      this.List.filter((row) => row.id == id).forEach(
        (row) => (this.sku = row)
      );
      this.form.img = this.sku.sku[index].img;
      this.form.rate = this.sku.sku[index].rate;
      this.form.stock = this.sku.sku[index].stock;
    },
    changesku() {
      this.dialogFormVisible = false;
      this.$store.dispatch("spu/changesku", {
        id: this.id,
        index: this.index,
        form: this.form,
      });
      this.$message({
        message: "修改成功",
        type: "success",
      });
    },
    beforeUpload(file) {
      this.form.img = URL.createObjectURL(file);
      return false;
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less">
.skutable {
  margin-top: 10px;
}
.zh {
  margin-right: 10px;
}
.spuinfo {
  .el-form-item__content {
    display: flex;
  }
  .img {
    .img-box {
      width: 148px;
      height: 148px;
      margin-right: 10px;
      position: relative;
      img {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .show {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: all 1s;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 25px;
          cursor: pointer;
          color: #fff;
          & + i {
            margin-left: 20px;
          }
        }
      }
      &:hover .show {
        opacity: 1;
        transform: all 1s;
      }
    }
  }
}
</style>
