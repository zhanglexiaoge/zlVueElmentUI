<template>
	<el-menu
	      default-active="2"
	      class="el-menu-vertical-demo"
	      background-color="#33aef0"
	      text-color="#fff"
	      active-text-color="#ffd04b">
		  <el-menu-item :index="item.path" v-for = "item in noChildren" :key = "item.path" select = "clickMenu(item)">
		    <!-- <i class="el-icon-menu"></i> -->
		  			<i :class="item.icon"></i>
		    <span slot="title">{{item.label}}</span>
		  </el-menu-item>
	      <el-submenu index="index" v-for = "(item, index)  in hasChildren" :key = "index" >
	        <template slot="title">
	          <i class="el-icon-location"></i>
	          <span>{{item.label}}</span>
	        </template>
	        <el-menu-item-group >
	          <el-menu-item :index="subitem.path" v-for = "(subitem, subindex) in item.children" :key = "subindex" @cilck = "clickMenu(subitem)">
			  {{subitem.label}}
			  </el-menu-item>
	        </el-menu-item-group>
	     
	      </el-submenu>
	      
	     
	    </el-menu>
</template>

<script>
	export default {
	 computed: {
		 //filter(item => item.children) 把一个值丢进过滤器,然后过滤器对此值进行过滤.返回过滤后的数据.
		 //asideMenu 把数组sideMenu 返回一个不带children 的数组
		 noChildren(){
			return this.asideMenu.filter(item => !item.children)
		 },
		 hasChildren(){
		 	return this.asideMenu.filter(item => item.children)
		 },
	 },
	  data () {
	    return {
			asideMenu:[
				{
					path:'/',//路由
					label:'首页',
					name:'home',
					icon:'el-icon-menu',
				},
				{
					path:'/video',//路由
					name:'video',
					label:'视频管理',
					icon:'el-icon-video-play',
				},
				{
					path:'/user',//路由
					name:'user',
					label:'用户管理',
					icon:'el-icon-user',
				},
				{
					label:'其他',
					icon:'el-icon-setting',
					children:[
						{
						 path:'/test1',//路由
						 label:'test1',
						 name:'test1',
						 icon:'el-icon-setting',
						},
						{
						 path:'/test2',//路由
						 label:'test2',
						 name:'test2',
						 icon:'el-icon-setting',
						}
					]
				}
			]
		    
		}
	},
	methods: {
		clickMenu(item){
			console.log(item.path);
			this.$store.commit('setCurrentMenu',item);
		}
	}
	
}
</script>

<style lang="less" scoped>
	.el-menu {
		height: 100%;
	}
</style>
