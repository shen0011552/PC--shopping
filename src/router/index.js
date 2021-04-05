import Vue from 'vue'
import Router from 'vue-router'
import cart from '@/components/cart'
import products from '@/components/products'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			component: products
		},
		{
			path: '/cart',
			component: cart
		}
	]
})