<template>
	<!--点击头部触发详情 -->
  <div class="header" @click="showDetail">
		
		<!--内容-->
    <div class="content-wrapper">
			
			<!--头部图片-->
      <div class="avatar">
        <img
          width="64"
          height="64"
          :src="seller.avatar" alt="">
      </div>
		  
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
				<!--减 根据不同的 size和type,给support-ico 的span标签设置不同的类，并且根据不同的类加载不同的本地图片-->
				<!-- 条件渲染-->
        <div class="support" v-if="seller.supports">
          <support-ico
            :size="1"
            :type="seller.supports[0].type"
          />
          <span class="textr">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
		<!--公告-->
    <div class="bulletin-wrapper">
			<!--公告图片-->
      <span class="bulletin-title"></span>
			<!--公告文字-->
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<!--文字右边的小箭头-->
      <i class="icon-keyboard_arrow_right"></i>
    </div>
		<!--背景图片，跟所在div 一样大，100% 相对于父标签说的，图片是seller中获取-->
    <div class="background">
      <img
        width="100%"
        height="100%"
        :src="seller.avatar" alt="">
    </div>
  </div>
</template>

<script>
  import SupportIco from 'components/support-ico/support-ico'

  export default {
    name: 'v-header',
    props: {
      seller: {
				//seller的数据类型是对象
        type: Object,
        default () {
          return {}
        },
      },
    },
    components: {
			//引入 SupportIco 组件
      SupportIco,
    },
    methods: {
      showDetail () {
				// HeaderDetail 属于CreateApi 组件
        this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
          $props: {
            seller: 'seller',
          },
        })
        this.headerDetailComp.show()
      },
    },
  }
</script>

<!--引入样式文件cube-ui 内置样式和常用的颜色值-->
<style lang="stylus">
  @import "~assets/stylus/mixin"
  @import "~assets/stylus/variable"

  .header
    position relative //相对定位元素的定位是相对与其它正常位置的元素
    overflow: hidden //overflow 属性可以控制内容溢出元素框时在对应的元素区间内添加滚动条,内容会被修剪，并且其余内容是不可见的。
    color $color-white
    background $color-background-ss //设置元素的背景颜色
    .content-wrapper
      position relative
      display flex
      align-items center
      padding 24px 12px 18px 24px
      .avatar
        flex 0 0 64px
        width 64px
        margin-right 16px
        img
          border-radius 2px
      .content
        flex 1
        .title
          display flex
          align-items center
          margin-bottom 8px
          .brand
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size $fontsize-large
            font-weight bold
        .description
          margin-bottom 8px
          line-height 12px
          font-size $fontsize-small
        .support
          display flex
          align-items center
          .support-ico
            margin-right 4px
          .text
            line-height 12px
            font-size $fontsize-small-s
      .support-count
        position absolute
        right 12px
        bottom 14px
        display flex
        align-items center
        padding 0 8px
        height: 24px
        line-height 24px
        text-align center
        border-radius 14px
        background $color-background-sss
        .count
          font-size $fontsize-small-s
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size $fontsize-small-s
    .bulletin-wrapper
      position relative
      display flex
      align-items center
      height 28px
      line-height 28px
      padding 0 8px
      background $color-background-sss
      .bulletin-title
        flex 0 0 22px
        width: 22px
        height: 12px
        margin-right: 4px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        flex 1
        white-space nowrap
        overflow: hidden
        text-overflow ellipsis
        font-size $fontsize-small-s
      .icon-keyboard_arrow_right
        flex 0 0 10px
        width: 10px
        font-size $fontsize-small-s
    .background
      position absolute
      top 0
      left 0
      right 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
</style>
