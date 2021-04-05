<template>
  <div class="hello">
    <div class="container-fluid">
 				<div class="navbar navbar-inverse">
 					<!--<a class="navbar-brand" href="/">商店商品</a>-->
 					<!--相当于a标签，既可以跳转也可以传输数据-->
 					<router-link to="/" class="navbar-brand">商店商品</router-link>
 					<div class="navbar-right">
 						<div class="navbar-text">
 							<b>你的购物车</b>
 							{{ sum }}件，￥{{ total }}元
 						</div>
 						<!--<a href="/cart" class="btn btn-default navbar-btn">购物车</a>-->
						<router-link to="/cart" class="btn btn-default navbar-btn">购物车</router-link>
 					</div>
 				</div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  //计算属性中的方法可直接用于template模板中的{{}}中，会进行双向关联
  computed:{
  	//计算属性里面的方法
  	sum(){
  		//访问store对象中的方法 计算总商品数
  		return this.$store.getters.sum;
  	},
  	//计算总金额
  	total(){
  		return this.$store.getters.total;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
	.navbar-right{
		float: right !important;
		margin-right: 5px;
	}
	.navbar-text{
		margin-right: 10px;
	}

</style>
