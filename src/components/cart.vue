<template>
	<div class="container-fluid">
		<h2>你的购物车</h2>
		<div class="alert alert-warning"
			v-if="sum == 0">这个购物车中没有任何商品
		<router-link to="/" class="alert-link">点击这里返回商店购物</router-link>
		</div>
		<!--=================-->
		<div v-show="sum != 0">
			<table class="table">
				<thead>
					<tr>
						<th>数量</th>
						<th>商品名称</th>
						<th class="text-right">单价</th>
						<th class="small_count">小计</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in products">
						<td class="text-center store_number">
							<div class="input-group">
								<div class="input-group-btn">
									<button type="button" class="btn btn-default"
										@click="down(item)">-</button>
								</div>
								<!--====================-->
								<input type="number" v-model="item.count"
									min="1" class="form-control myNumber"/>
								<!--==========-->
								<div class="input-group-btn">
									<button type="button" class="btn btn-default" 
										@click="add(item)">+</button>
								</div>
							</div>
						</td>
						<td class="text-left">{{ item.name }}</td>
						<td class="text-right">￥{{  item.price }}</td>
						<td class="text-right">{{ item.count * item.price }}</td>
						<td>
							<button class="btn btn-sm btn-warning"
								@click="del(item)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
			
	</div>
</template>

<script type="text/javascript">
	export default{
		methods: {
			//增加数量的方法
			add(item){
				this.$store.commit("ADD",item);
			},
			//减少的方法
			down(item){
				this.$store.commit("DOWN",item);
			},
			//删除的方法
			del(item){
				this.$store.commit("DEL",item);
			}
		},
		//计算属性(一定要有返回值)
		computed: {
			//求和
			sum(){
				return this.$store.getters.sum;
			},
			products(){
				//使用vuex中的getters对象中的products方法
				return this.$store.getters.products;
			}
		}
	}
</script>

<style type="text/css">
	.store_number{
		width:20%;
	}
	.small_count{
		text-align: right;
	}
	.myNumber{
		text-align: center;
	}
</style>