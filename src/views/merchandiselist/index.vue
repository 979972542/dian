<template>
<!-- 商品列表 -->
  <div class="merchandiselist-wrap">
    <!-- 搜索栏盒子 -->
    <div class="search-box">
      <el-input v-model="input" placeholder="请输入商品名称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <!-- 信息列表 -->
    <div class="list">
      <el-table :data="getList" style="width: 100%" border stripe>
        <!-- id -->
        <el-table-column
          prop="id"
          label="商品ID"
          width="100"
          align="center"
          sortable
        >
        </el-table-column>
        <!--  -->
        <!-- 商品类别 -->
        <el-table-column
          prop="type"
          label="商品类别"
          width="120"
          align="center"
          sortable
        >
        </el-table-column>
        <!--  -->
        <!-- 商品图片 -->
        <el-table-column label="商品图片" width="100" align="center">
          <template slot-scope="scope">
            <!-- :src="scope.row | ImgUrl" 为过滤器 -->
            <el-image
              :src="scope.row | ImgUrl"
              :preview-src-list="scope.row.img"
            ></el-image>
          </template>
        </el-table-column>
        <!--  -->
        <!-- 商品名称 -->
        <el-table-column
          prop="title"
          label="商品名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <!--  -->
        <!-- 描述 -->
        <el-table-column
          prop="details"
          label="描述"
          width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <!--  -->
        <!-- 规格/库存 -->
        <el-table-column label="规格/库存" type="expand" width="150">
          <template slot-scope="props">
            <p class="row">规格信息</p>
            <addspec :props="props"></addspec>
            <spectable :props="props"></spectable>
            <p class="row">组合/库存</p>
            <addsku :props="props"></addsku>
            <skutable :props="props"></skutable>
          </template>
        </el-table-column>
        <!--  -->
        <!-- 操作(按钮) -->
        <el-table-column label="操作">
          <template slot-scope="props">
            <!-- 编辑 -->
            <el-button size="mini" @click="spuInfo(props.row.id)">编辑</el-button>
            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              @click="removespu(props.row.id)"
              >删除
            </el-button>

          </template>
        <!--  -->
        </el-table-column>
      </el-table>
      <!-- 退出按钮(回到login) -->
      <edit v-model="editDialog" :Form="Form" :id="id" @init="formInit"></edit>
      <!-- 新增按钮 -->
      <el-button type="primary" size="mini" @click="editDialog=true">新增</el-button>
    </div>
  </div>
</template>

<script>
import Addsku from "./components/addsku.vue";
import Addspec from "./components/addspec.vue";
import Skutable from "./components/skutable.vue";
import Spectable from "./components/spectable.vue";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      Form: {
        title: "",
        type: "",
        img: [],
        details: "",
      },
      id: "",
      input: "",//查找商品名称(用于监听整个对象)
      searchData: [],
      editDialog:false,//开关属性(多调用)
    };
  },
  // created在实例被创建前调用数据，常用于页面初始化时拿到数据
  created() {
    // getList(拿数据)
    this.searchData = this.$store.getters.getList;
  },
  methods: {
    // 退出时清空
    formInit(){
      this.Form={
        title: "",
        type: "",
        img: [],
        details: "",
      }
    },
    removespu(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // spu/remove
          this.$store.dispatch("spu/remove", id);
          this.input = "";
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
    // 编辑(修改)
    spuInfo(id) {
      this.editDialog = true;
      this.id = id;
      // 找到vuex中id与表中id相同的那一列数据，创建一个新数组
      let info = this.searchData.filter((row) => row.id == this.id);
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      this.infos = info[0];
      console.log(this.infos);
      let a = JSON.stringify(this.infos)
      console.log(a);
      // 拿到数组  infos:[{},{}]  =>
      // 把数组转化为js对象  =>
      // 把js对象转化为字符串(json)

      // 我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象
      // JSON.parse(text[, reviver])
      // text:必需， 一个有效的 JSON 字符串。
      // reviver: 可选，一个转换结果的函数， 将为对象的每个成员调用此函数。
      let obj = JSON.parse(JSON.stringify(this.infos));
      // JavaScript值 => JSON字符串 => JavaScript对象
      console.log(obj);
      // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
      // JSON.stringify(value[, replacer[, space]])
      // value:必需， 要转换的 JavaScript 值（通常为对象或数组）。
      // 
      // JSON 是 JS 对象的字符串表示法，它使用文本表示一个 JS 对象的信息，本质是一个字符串。
      // js
      // var obj = {a: 'Hello', b: 'World'}; 
      //这是一个对象，注意键名也是可以使用引号包裹的
      // json
      // var json = '{"a": "Hello", "b": "World"}'; 
      //这是一个 JSON 字符串，本质是一个字符串

      // 
      // 把字符串传入表单，实现修改效果
      this.Form.title = obj.title;
      this.Form.type = obj.type;
      this.Form.img = obj.img;
      this.Form.details = obj.details;
      // console.log(obj.title,);
    },
    // 
    search() {
      let aaa = [];
      // 遍历getList
      this.$store.getters.getList.forEach((row) => {
        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
        // stringObject.indexOf(searchvalue,fromindex)
        // 商品名称找到 >= 1个是执行
        if (row.title.indexOf(this.input) >= 0) {
          // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
          // 添加整一列
          aaa.push(row);
        }
      });
      // 把结果传入searchData数组
      this.searchData = aaa;
    },
  },
  // 过滤器(编辑菜单里)
  // 图片数量选择 >= 1张时，输出第一张，空时返回空
  filters: {
    ImgUrl(val) {
      if (val.img.length > 1) {
        return val.img[0];
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapGetters({
      'getList':'getList',
      // 'Tab':'getTab'
    }),
  },
  // watch: {
  //   input(val) {
  //     if (!val) {
  //       this.searchData = this.$store.getters.getList;
  //     }
  //   },
  // },
  components: {
    Addspec,
    Spectable,
    Skutable,
    Addsku,
    edit:require('./components/edit.vue').default,
  },
};
</script>

<style lang="less">
.search-box {
  width: 800px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 40px;
}
.changebox {
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
.row {
  margin: 5px 0;
  font-size: 15px;
  font-weight: 800;
}
</style>
