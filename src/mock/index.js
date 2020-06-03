import Mock from 'mockjs'


const getAllMenuData = function () {
	return {
	  code: 200,
	  data: [
			{
				icon:'iconfont icon-usercenter',
				path:'/usermanage',
				name:'用户管理',
				id:'5',
				children:[
					{
						icon:'',
						path:'/userlist',
						name:'用户列表',
						id:'501',
					}
				],
			},
			{
				icon:'iconfont icon-packing-labeling',
				path:'/manage',
				name:'权限管理',
				id:'1',
				children:[
					{
						icon:'',
						path:'/rolelist',
						name:'角色列表',
						id:'20',
					},
					{
						icon:'',
						path:'/rolemanage',
						name:'权限列表',
						id:'21',
					}
					
				],
			},
			{
				icon:'iconfont icon-zhanghucaozuo',
				path:'/usermanage',
				name:'用户列表',
				id:'2',
				children:[
					{
						icon:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
						path:'/chart',
						name:'测试3',
						id:'23',
					}],
			},
			{
				icon:'iconfont icon-yidatong',
				path:'/ordermanagement',
				name:'订单相关',
				id:'3',
				children:[
					{
						icon:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
						path:'/orderlist',
						name:'订单列表',
						id:'24',
					}
				],
			}
		],
		
	};
};

const getuserListData = function () {
	return {
	  code: 200,
	  data: [
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户1',
				id:'5201',
				time:'1590825096',
				address:'测试用户1地址测试',
				phone:'15868182341',
				role:'管理员',
				roleid:'0',
				isstate:true,
			},
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户2',
				id:'5202',
				time:'1590825500',
				address:'测试用户2地址测试',
				phone:'15868182341',
				role:'管理员1',
				roleid:'1',
				isstate:false,
			},
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户3',
				id:'5203',
				time:'1590826000',
				address:'测试用户3地址测试',
				phone:'15868182341',
				role:'员工',
				roleid:'2',
				isstate:true,
			},
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户4',
				id:'5204',
				time:'1590826500',
				address:'测试用户4地址测试',
				phone:'15868182341',
				role:'员工',
				roleid:'2',
				isstate:false,
			},
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户5',
				id:'5205',
				time:'1590827000',
				address:'测试用户5地址测试',
				phone:'15868182341',
				role:'员工',
				roleid:'2',
				isstate:true,
			},
			{
				headerUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3241659229,3202296598&fm=26&gp=0.jpg',
				name:'测试用户6',
				id:'5206',
				time:'1590827500',
				address:'测试用户6地址测试',
				phone:'15868182341',
				role:'员工',
				roleid:'2',
				isstate:true,
			},
		],
		
	};
};


//获取所有菜单
Mock.mock('/api/allMenu', 'get', getAllMenuData);
//获取用户列表
Mock.mock('/api/userListData', 'post', getuserListData) ;

