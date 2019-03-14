<template>
  <div id="app">
		<!--绑定了：sell 数据模型-->
    <v-header :seller="seller"/>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initialIndex="0"/>
    </div>
  </div>
</template>

<script>
	//头部组件
  import VHeader from 'components/v-header/v-header'
	//tab 组件其实包含了两个Cube组件，一个是tabbar,一个silde
  import Tab from 'components/tab/tab'
	
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'
	//引入qs，由于本地没写，所以qs是一个空对象
  import qs from 'qs'
	//从 '/api/index.js'引入APIServer组件，此组件封装了axios网络库，但又跟具体的实际业务相关
  import ApiServer from 'api'

  export default {
		//app组件的名称
    name: 'app',
		//app组件引用的其他组件
    components: {
      VHeader,
      Tab,
    },
    computed: {
			//计算属性 tabs
      tabs () {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller,
            },
          },
          {
            label: '评价',
            component: Ratings,
            data: {
              seller: this.seller,
            },
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller,
            },
          },
        ]
      },
    },
		//数据
    data () {
		
      return {
				//声明数据对象seller，并且给一个id,用于请求接口
        seller: {
					// location.search.slice 这句代码本意是通过location对象获取url上相关信息
          id: qs.parse(location.search.slice(1)).id,
        },
      }
    },
    created () {
			// app 组件加载之后调用 方法 getSeller 获取商家信息
      this._getSeller()
    },
    methods: {
      // 获取商家信息
      _getSeller () {
				//参数就是 id
        let params = {
          id: this.seller.id,
        }
				
        ApiServer.getSeller(params).then(res => {
					console.log(res)
					//http响应数据 其实是json
					//Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
          this.seller = Object.assign({}, this.seller, res)
					console.log(this.seller)
					
        }).catch(err => {
					console.log(err)
				})
      },
    },
  }
</script>
<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position fixed //元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动
      top 136px      //顶部距离136px
      left 0
      right 0
      bottom 0

</style>
