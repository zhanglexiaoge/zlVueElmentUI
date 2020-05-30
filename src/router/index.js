import Vue from "vue";
import VueRouter from "vue-router";
import login from '../views/login/Login.vue';
import Home from '../views/Home.vue';
import Welcome from '../views/WelCome.vue';
import UserManage from '../views/userManage/UserManage.vue';


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect:'/login',
	},
	{
		path: '/login',
		component: login,
	},
	{
		path: '/home',
		component: Home,
		redirect:'/welcome',
		children:[
		 {
			path: '/welcome',
			component: Welcome, 
		 },
		 {
		 	path: '/userlist',
		 	component: UserManage, 
		 }
		],
	}
	
  
];

const router = new VueRouter({
  //mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
