import Vue from 'vue'
import Vuex from 'vuex'

//注册了vuex，人后可以在任何一个组件中使用this。$store
Vue.use(Vuex)

//数据  Model 状态
const state = {
//用于 【存储货物产品的数组】 即 【购物车数组】
//products数组刚开始的时候， 因为购物车是空的，所以products数组也应该是空的
	products:[
		/*{
			name: 'xx',
			price: 'aa',
			id: 'yy',
			count: 1
		}*/
	]
}
//同步 使用commit可以触发mutations中的方法
const mutations = {
	//添加到购物车功能
	ADD_STORE(state, item){
		//准备一个商品模型
		var product = {
			name: item.name,
			price: item.price,
			id: item.id,
			count: 1
		}
		//先拿到products数组
		var products = state.products
		//如果products数组的长度为0
		if(products.length == 0){
			//则将product货物压栈道parducts数组中
			products.push(product);
			return;
		}
		//遍历products数组
		for (var i=-0;i<products.length;i++){
			//如果数组中已经有一个元素与想添加的物品的id相同
			//则将对应的产品的count++即可(说明该商品已经存在,不需要往数组中添加了)
			if(products[i].id == product.id){
				products[i].count++;
				return;
			}
		}
		//默认是往products数组中添加产品product
		products.push(product);
	},
	//数目增加的功能
	ADD(state,item){
		var products = state.products;
		for(var i=0;i<products.length;i++){
			if(products[i].id == item.id){
				products[i].count++;
			}
		}
	},
	//数目减少功能
	DOWN(state,item){
		//如果产品的count数为1的时候，就不样继续减少，因为继续减少就是0了，相当于删除
		if(item.count == 1){
			return;
		}
		var products = state.products;
		for(var i=0;i<products.length;i++){
			if(products[i].id == item.id){
				products[i].count--;
			}
		}
	},
	//删除一个货物产品的功能
	DEL(state,item){
		var products = state.products;
		//遍历该购物车
		for(var i=0;i<products.length;i++){
			//如果想要删除的产品的id和购物车中的产品的id相同，则删除
			if(products[i].id == item.id){
				//【splice方法】从下表处开始删除，删除1个元素
				products.splice(i,1);
			}
		}
	}
}
//异步
const actions = {}
//计算属性(这个是vuex)
const getters = {
	//vuex中计算商品
	sum(state){
		//result代表商品总数
		var result = 0;
		//购物车中的商品总数
		var products = state.products;
		//遍历商品的总数
		for(var i = 0;i<products.length;i++){
			//计算商品总数
			result += Number(products[i].count);
		}
		return result;
 	},
 	//返回购物车商品数组的方法
 	products(state){
 		return state.products;
 	},
 	//计算总金额
 	total(state){
 		var products = state.products;
 		var result = 0;
 		for(var i = 0;i<products.length;i++){
 			result += products[i].count * products[i].price; 
 		}
 		return result;
 	}
}

//导出
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
