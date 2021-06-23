<template>
  <el-dialog title="商品信息3223" :visible.sync="dialogFormVisible" @close="close">
    <div class="changebox">
      <el-form

        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="Form.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="type" class="fenlei">
          <el-select
            v-model="Form.type"
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

        <el-form-item label="商品图片" class="img">
          <div class="img-box" v-for="(item, index) in Form.img" :key="index">
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
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品详情" prop="details">
          <el-input type="textarea" v-model="Form.details"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 2131223消</el-button>
      <el-button type="primary" @click="changespu">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props:{
        value:{},
        Form:{},
        id:{}
    },
    data(){
        return{
            dialogFormVisible:false,
            dialogVisible:false,
            dialogImageUrl: "",
        }
    },
    methods:{
        handlePictureCardPreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        removeimg(index) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.Form.img.splice(index, 1);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        beforeUpload(file) {
            this.Form.img.push(URL.createObjectURL(file));
            return false;
        },
        changespu() {
            this.dialogFormVisible = false;
            // this.$store.dispatch("spu/changespu", { id: this.id, form: this.Form });
            this.$message({
                message: "修改成功",
                type: "success",
            });
        },
        close(){
            this.dialogFormVisible = false;
            this.$emit('init');
        }
    },
    computed: {
        Tab() {
            return this.$store.getters.getTab;
        },
    },
    watch:{
        value(val){
            this.dialogFormVisible=val;
        },
        dialogFormVisible(val){
            this.$emit('input',val)
        }
    },
    components:{
        addClass:require('../../classification/components/addClass.vue').default
    }
}
</script>