//程序入口文件
import Vue from 'vue'
import './cube-ui'

//组件的引入和 CreateAPI
import './utils/register'


import App from './App.vue'


// icon的css样式和基础的样式设置
import 'assets/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
