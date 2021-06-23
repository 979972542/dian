<template>
  <div>
    <div class="title">添加商品</div>
    <div class="add-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="type" class="fenlei">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择分类"
            clearable
            filterable
          >
            <el-option
              :value="item.title"
              v-for="(item, index) in Tab"
              :key="index"
            ></el-option>
          </el-select>
          <add-class class="addclass"></add-class>
        </el-form-item>

        <el-form-item label="商品图片" class="img" prop="img" ref="formImg">
          <div
            class="img-box"
            v-for="(item, index) in ruleForm.img"
            :key="index"
          >
            <img :src="item" alt="" />
            <div class="show">
              <i
                class="el-icon-zoom-in"
                @click="handlePictureCardPreview(item)"
              ></i>
              <i class="el-icon-delete" @click="removeimg(index)"></i>
            </div>
          </div>

          <el-upload
            action=""
            list-type="picture-card"
            :before-upload="beforeUpload"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品详情" prop="details">
          <el-input type="textarea" v-model="ruleForm.details"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addspu('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import addClass from "../classification/components/addClass.vue";
export default {
  components: { addClass },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        img: [],
        type: "",
        details: "",
        specsList: [],
        sku: [],
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择分类", trigger: "change" }],
        img:[{ required: true,validator:this.imgRule  , trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    Tab() {
      return this.$store.getters.getTab;
    },
    List() {
      return this.$store.getters.getList;
    },
  },
  methods: {
    imgRule(rule, value, callback){
      if(this.ruleForm.img.length==0){
        callback(new Error('没有图片'))
      }else{
        callback()
      }
    },
    addspu(formName) {
      console.log(this.$store.getters.getList);
      this.$refs[formName].validate((valid) => {
        // validate 表单验证
        if (valid) {
          let title = this.List.filter(
            // filter 选出符合条件的元素，创建一个新的数组
            (row) => row.title == this.ruleForm.title//商品名(写的)
          );
          console.log(title,'55555');
          if (title.length == 0) {
            this.$store.dispatch("spu/addspu", { ...this.ruleForm });
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$refs[formName].resetFields();
            //表单重置
            this.ruleForm.img=[]
            //图片单独处理
          } else {
            this.$message.error("已有重名商品");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.img=[]
    },

    // img_change(e) {
    //   // console.log(e.target.files)
    //   const readfile = new FileReader();
    //   readfile.onload = (e) => {
    //     this.ruleForm.img.push(e.target.result);
    //   };
    //   readfile.readAsDataURL(e.target.files[0]);
    //   // Base(e.target.files[0], (img) => {
    //   //   this.ruleForm.img.push(img)
    //   // });
    // },

    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      this.ruleForm.img.push(URL.createObjectURL(file));
      this.$refs.formImg.validateState='';
      return false;
    },
    removeimg(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.ruleForm.img.splice(index, 1);
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
  },
};
</script>

<style lang="less" scope>
.title {
  font-size: 30px;
  text-align: center;
}
.add-box {
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  // border: 1px solid red;
  .el-form-item__content {
    display: flex;
  }
  .addclass {
    margin-left: 20px;
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
    .file {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
