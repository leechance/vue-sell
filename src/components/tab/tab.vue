<template>
  <div class="tab">
		<!--
		
		data 用于 cube-tab-bar 渲染的数据，当需要使用内置的默认插槽，此参数必传，
		数组的每一项是一个 Object 类型，包括 label、icon 和 value（默认值等于 label）1.12.5+，
		如果使用自定义插槽，可不传此值
		
		showSlider 开启下划线跟随效果
		useTransition="false" 开启 transition 过渡
		
		v-model="selectedLabel" 类型
		-->
    <cube-tab-bar
      class="border-bottom-1px"
      ref="tabBar"
      :data="tabs"
      showSlider
      :useTransition="false"
      v-model="selectedLabel"
    />
    <div class="slider-wrapper">
			
			<!-- 
			slide 轮播图，提供了常见的轮播及 swipe 的功能，也是一个基于 better-scroll 进行封装的组件。
			不显示轮播指示点
			初始化时展示的位置索引值
			不开启自动播放
			不开启循环播放
			options better-scoll配置选项
			绑定scroll-->
      <cube-slide
        ref="slide"
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
			  <!--cube-slide-item 元素则是每一个轮播的页面-->
        <cube-slide-item
          v-for="(tab,index) in tabs"
          :key="index"
        >
          <!--动态组件-->
          <component
            ref="component"
            :is="tab.component"
            :data="tab.data"
          />
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab',
		//tabs 属性，由上层传入
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        },
      },
      initialIndex: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      selectedLabel: {
        get () {
					// 获取标签文字（商品，评价，上架）
          return this.tabs[this.index].label
        },
        set (newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        },
      },
    },
		/*
		类型：Number
默认值：0
可选值：1、2、3
作用：有时候我们需要知道滚动的位置。
当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
		*/
    data () {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0,
        },
      }
    },
    mounted () {
      this.onChange(this.index)
    },
    methods: {
      onScroll (pos) {
				/*
				一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。
				但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。
				然后在javascript里面这样调用：this.$refs.input1  这样就可以减少获取dom节点的消耗了
				*/
			 
			 /*
			 debugger
			 this.$refs.slide   ====slide 组件
			 this.$refs.slide.slide=== slide的 slide 属性
			 
			 */
			
			/*
			debugger
			
			scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。 
			clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。 
			offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。
			this.$refs.tabBar.$el 就是获取整个tabBar的div
			*
			
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
				
				 /*
				debugger
				this.$refs.tabBar   ====tabBar 组件
				this.$refs.tabBar.setSliderTransform=== tabBar的 进行动画
				
				*/
			 //tabBar进行滑动
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange (current) {
        this.index = current
        const instance = this.$refs.component[current]
				//每一页的组件进行 调用Http请求，
				//.fetch()其实就是调用fetch方法
        if (instance && instance.fetch) {
          instance.fetch()
        }
      },
    },
  }
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"

  .tab
    display flex
    flex-direction column
    height 100%
    >>> .cube-tab
      padding 10px 0
    .slider-wrapper
      flex 1
      overflow: hidden
</style>
