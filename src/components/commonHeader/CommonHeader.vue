<template>
	<header>
		
		<div class="left-cont">
			<el-button type="primary" icon= "el-icon-menu" size ="mini"></el-button>
			<el-breadcrumb separator="/" class= "left-sub">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>
			  <!-- <router-link :to="current.path">{{current.label}}</router-link> -->
			  </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="right-cont">
			 <el-dropdown trigger="click" size = "mini">
			      <span class="el-dropdown-link" >
			       <img src = "http://image.yy.com/yywebalbumbs2bucket/144152f8680f421599233c6ffcfcef49_1476265267104.jpeg" class="user"/>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item>个人中心</el-dropdown-item>
			        <el-dropdown-item>退出</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
		</div>
	</header>
</template>

<script>
	// import {mapState } from 'vuex'
	import { mapState } from 'vuex'
	export default {
	   computed: {
		   ...mapState({
				current:state => state.currentMenu,
				
		   })
	   },
	   data() {
			return {
				userUrl:''
			}
		}
	}
</script>



<style lang="less" scoped>
 header {
	display: flex; 
	height: 100%;
	align-items: center;
	justify-content:space-between ;
	
 }
 .left-cont {
	 display: flex;
	 align-items: center;
	 .left-sub {
		 padding-left: 0.9375rem;
	 }
 }
 .right-cont {
	 .user {
		 height: 2.5rem;
		 width: 2.5rem;
		 border-radius: 50%;
	 }
 }
 
</style>
