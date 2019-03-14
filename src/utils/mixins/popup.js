const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'

/*
	$emit 用法 https://www.cnblogs.com/mophy/p/8630953.html

	1、父组件可以使用 props 把数据传给子组件。
	2、子组件可以使用 $emit 触发父组件的自定义事件。

	vm.$emit( event, arg ) //触发当前实例上的事件
	vm.$on( event, fn );//监听event事件后运行
	
*/

export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
			
      this.$emit(EVENT_SHOW)
    },
    hide () {
      this.visible = false
			//this就是 header-detail组件，因为被 header-detail 混入
			//不写这一句也能消失，因为 visible 改变会触发 header-detail 的V-show条件渲染
			//但是一会儿就不能触发
      this.$emit(EVENT_HIDE)
    }
  }
}
