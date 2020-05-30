<template>
  
    <el-container class="home-el-container">
        <!-- 头部区域 -->
     <el-header>
         <div>
            <img src= "../assets/icon-app.png"/>
            <span>zl后台管理系统</span>

         </div>
		 <el-button type="primary">退出</el-button>
     </el-header>
        <el-container>
			 <!-- 侧边栏-->
          <el-aside  :width = "isCollapse ? '64px' : '150px'">
			  <!-- 点击收起左侧区域-->
			  <div class="shouqi" @click="shouqiAction">|||</div>
			  <!-- 侧边栏区域-->
			     <el-menu
			        background-color="#5676FC"
			        text-color="#fff"
			        active-text-color="#ffd04b"
					:unique-opened = "true"
					:collapse = "isCollapse"
					:collapse-transition = "false"
					:router = "true"
					:default-active = "activePath"
					>
					
			        <el-submenu :index="item.id + ''" v-for = "item in menuLeft" :key= "item.id">
			          <template slot="title">
			            <i :class="item.icon"></i>
						
			            <span>{{item.name}}</span>
			          </template>
					  <!-- 二级菜单-->
					  <el-menu-item :index="subitem.path" v-for = "subitem in item.children" :key= "subitem.id" @click ="saverouterPath(subitem)">
						   <i class="el-icon-menu"></i>
						   <span>{{subitem.name}}</span>
					   </el-menu-item>
			        </el-submenu>
			        
			      </el-menu>
		  </el-aside>
		  <!-- 右侧区域-->
          <el-main>
			  <!-- 路由占位符-->
			  <router-view> </router-view>
		  </el-main>
         </el-container>
   </el-container>
	
</template>

<script>
	// import welcome from
    export default {
	data(){
		return{
			//左侧菜单数据
			menuLeft:[],
			isCollapse:false,
			//当前激活的左侧菜单path
			activePath:''
			
		}	
	},
	  created(){
		  //组件被创建 相当于ViewLoad
		  this.getLeftMenu()
		  //获取window sessionStorage 存储的activePath
		  this.activePath = window.sessionStorage.getItem('activePath')
	  },
	  methods:{
		  //获取所有的菜单
		  getLeftMenu() {
			  this.$axios.get('/api/allMenu').then(res => {
			         console.log(77, res);
					 if(res.data.code == 200) {
						 this.menuLeft = res.data.data
					 }
					 
			       }).catch(error => {
			     console.log(error);
			  });
			 
		  },
		  //点击按钮切换左侧菜单折叠收缩
		  shouqiAction(){
			  this.isCollapse = !this.isCollapse
		  },
		  //保存点击路由
		  saverouterPath(item){
			  // localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。
			  // sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
			  //你想在浏览器窗口关闭后还保留数据，可以使用 localStorage 属性， 该数据对象没有过期时间，今天、下周、明年都能用，除非你手动去删除。
			  //var lastname = sessionStorage.getItem("key");
			  window.sessionStorage.setItem('activePath',item.path)
		  },
	  }
    }
</script>


<style lang="less" scoped>
     @import '../style/mixin';
     .home-el-container {
         height: 100%;
         width: 100%;
     }
    .el-header {
        background-color: #333333;
		display: flex;
		justify-content: space-between;
		padding-left: 0.625rem;
		align-items: center;
		color: #FFFFFF;
		font-size: 1.25rem;
		> div{
			display: flex;
			align-items: center;
			span {
				margin-left: 10px;
			}
		}
    }
	
    .el-aside {
        background-color: #5676FC;
		.el-menu {
		    border-right: none;
		}
    }
    .el-main{
        background-color: #EAEDF1;
    }
	.iconfont {
		margin-right: 5px;
	}
	.shouqi {
		background-color: #0077AA;
		font-size: 10px;
		line-height: 24px;
		color: #FFFFFF;
		text-align: center;
		//每个文字间距
		letter-spacing: 0.2rem;
	}
</style>
