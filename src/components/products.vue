<template>
	<div class="container-fluid">
		<div class="panel panel-default row">
			<div class="col-xs-3">
				<a href="###" class="btn btn-block btn-default btn-lg"
					@click="changeCategory('all')"
					v-bind:class="{active: selectedCategory == null}">所有商品</a>
				<a href="###" class="btn btn-block btn-default btn-lg" 
					v-for="(item,index) in categorys"
					@click="changeCategory(item)"
					v-bind:class="{active: item == selectedCategory}"> {{ item }} </a>
			</div>
			<div class="col-xs-9">
				<div class="well" v-for="(item,index) in nowProducts">
					<h3>
						<strong>{{ item.name }}</strong>
						<span class="pull-right label label-primary">
							￥{{ item.price }}.00
						</span>
					</h3>
					<div class="description">
						<span class="lead">
							{{ item.description }}
						</span>
						<button class="btn btn-success pull-right" 
						@click="addStore(item)">添加到购物车</button>
					</div>
				</div>
				<!--=============分页-->
				<div class="pull-right bth-group">
					<a href="###" class="btn btn-default"
						v-for="(item,index) in pageNum" 
						v-bind:class="{'btn-primary' : item == activePage}"
						@click="changePage(item)">
						{{ item }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	//每页显示多少个商品（暂定3个）
	var pageSize = 3;
	//导出db.json数据
	export default{
		data(){
			return{
				//商品数组，存储本机地址的数据
				products: [],
				//表示当前选择的类型
				selectedCategory: null,
				//用于保存 [当前选择的页码] 默认为1
				activePage : 1
			}
		},
		//组件的数据源
		created(){
			//访问products里面的数据，products在config/index.js里面的代理跨域
			this.$http.get("/products").then(jsonData => {
				this.products = jsonData.body;	//把数据赋值给return中的的products[] jsonData
				console.log(this.products);
			})
		},
		// 函数(或者说方法可以没有返回值，这是函数和计算机属性最大的区别)
		methods:{
			//改变商品的【类别】 其中参数category是表示类别的值
			changeCategory(category){
				if(category == 'all'){
					this.selectedCategory = null;
				}else{
					this.selectedCategory = category;
				}
				//改变分类之后, 要对这个activePage进行初始化
				//否则在切换页面之后, 其他分类如果没有那一页的话, 则会显示空白
				this.activePage = 1;
			},
			//点击改变页码数
			changePage(newPage){
				//传入的页page成为新的当前页
				this.activePage = newPage;
			},
			//添加item到 【购物车数组】 中去
			addStore(item){
				//仅仅只是做一个调用   调用/触发vuex中mutations中的方法
				this.$store.commit("ADD_STORE",item)
			}
		},
		//计算属性
		computed: {
			//显示类别的属性
			categorys(){
				//数组用来存储左边的分类名目:水果类、蔬菜类、肉类
				var results = []
				//定义这个keys对象的目的是用于过滤已经存在的商品类型，使商品类型不重复
				var keys = {}
				//便利全部的商品的数据
				for( var i=0; i<this.products.length;i++) {
					var category = this.products[i]["category"]//对象访问属性，不是数组
					//如果 keys对象中的没有当前category所代表的商品类型
					if(!keys.hasOwnProperty(category)){	//过滤掉重复的
						//那么就为keys新增这个【当前category】 所代表的商品类型作为“键”
						//新增这个属性后顺便给这个属性赋个值(赋什么值不重要)
						keys[category] = true;
						results.push(category);
					}
				}
				//返回一个分类的商品数组
				return results;
			},
			//用于【返回根据分类选择的商品列表】
			//这个数组的长度即【需要显示的商品的数量】
			productList(){
				//如果没有进行特别的选择
				if(this.selectedCategory == null){
					//返回products数组(含全部商品)
					return this.products;
				}else{
					/*
					 这里是对products数组进行过滤， 传入的参数是item
					 即某一件商品；返回的是满足【this。selectedCategory == item。category】
					 条件的商品的数组。 【注意】 这里返回的仍然的是数组this。products。只不过是
					 经过过滤把不符合条件的元素都过滤掉。filter()是个过滤器，这个过滤器能够
					 从products数组中一个一个地去拿数据，呢出来的元素我们用形参item去表示。
					 如果满足 【this。selectedCategory == item.category】条件,就保留在数组
					 this.products中,是否就过滤掉.可见返回的也是一个数组.
					 * */
					return this.products.filter(item =>
						this.selectedCategory == item.category)
					/*
					 this.selectedCategory == item.category 是一个拉姆达表达式,也叫箭头函数.
					 这里不能写成{this.selectedCategory == item.category}
					 * */
				}
			},
			//返回 【当前页的商品列表】
			nowProducts(){
				var startProduct = (this.activePage - 1) *pageSize;
				//slice() 方法可 【从已有的数组中返回选定的元素】
				//返回的任然是个数组。因为slice（）函数的参数是从下标0开始的
				//所以startProduct就是新的页面的元素的开始的元素(不需要+1或者-1)
				//slice()函数的特征是前闭后开，所以不会渠道下标为startProduct + pagesize的元素
				return this.productList.slice(startProduct,startProduct + pageSize);
			},
			//计算页码的功能
			pageNum(){
				return Math.ceil(this.productList.length / pageSize);
			}
		}
	}
</script>

<style type="text/css">
	.active{
		background-color: lightcyan !important;
	}
</style>