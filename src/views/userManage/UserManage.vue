<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="usermange-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="15">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.queryInfo"
            clearable
            @clear="getuserListReq"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuserListReq"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserAction">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe style="width: 100%">
        <!-- 索引区域 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <el-switch v-model="scope.row.isstate" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <!-- 详情按钮 -->
            <el-button type="primary" size="mini" @click="userAction(scope.row)">详情</el-button>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 设置按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      ></el-pagination>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addUserVisible" width="50%">
        <!-- 添加用户表单区域 -->
        <el-form :rules="userFormrules" ref="userFormrules" :model="addUserForm" label-width="80px">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="addUserForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNum">
            <el-input v-model="addUserForm.phoneNum"></el-input>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="addUserForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="addUserForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserVisible= false">取 消</el-button>
          <el-button type="primary" @click="adduserQue">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户数据
      userList: [],
      //获取用户列表的参数对象
      queryInfo: {
        //查询关键字
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      totalNum: 20,
      //添加用户信息对话框是否显示
      addUserVisible: false,
      //添加用户的表单数据
      addUserForm: {
        userName: "",
        phoneNum: "",
        deliver:true,
        type:"",
      },
      //表单的验证规则对象
      userFormrules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 18,
            message: "姓名长度在3-18字符之间",
            trigger: "blur"
          }
        ],
        phoneNum: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "请输入11个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    //请求接口
    this.getuserListReq();
  },
  methods: {
    //获取所有的菜单
    getuserListReq() {
      console.log(this.queryInfo);
      this.$axios
        .post("/api/userListData")
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.userList = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //监听pagesize改变 设置每页显示多少行
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      //重新请求数据
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      //重新请求数据
    },
    //用户状态改变
    userStateChange(userInfro) {
      console.log(userInfro);
      //请求接口用户状态改变
      this.$message.success("更新用户状态成功！");
    },
    //点击添加用户
    addUserAction() {
      this.addUserVisible = true;
    },
    //添加用户确定按钮 addUserVisible = false
    adduserQue(){
      this.addUserVisible = false;
      console.log(this.addUserForm);
      console.log("请求添加用户接口");
    },
    //点击跳转用户详情
    userAction(item) {
     console.log(item);
      window.sessionStorage.setItem('activePath','/orderdetail')
     this.$router.push({
        name : 'Orderdetail',
        params : {
          id : item.id
          }
      });
   },
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
