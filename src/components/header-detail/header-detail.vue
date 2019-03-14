<template>
	<!--进入/离开 & 列表过渡-->
	<!--https://cn.vuejs.org/v2/guide/transitions.html-->
	
	<!--v-show="visible" visible 在mixin中有定义,还混入了show和hide方法 -->
	
	<!--
	混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。
	混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
	-->
  <transition name="fade">
    <div
      class="header-detail"
      v-show="visible"
    >
      <div class="detail-wrapper clear-fix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
					<!--star组件-->
          <div class="star-wrapper">
            <star
              :size="48"
              :score="seller.score"
            />
          </div>
					
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
					
          <ul v-if="seller.supports" class="supports">
            <li class="support-item"
                v-for="(item,index) in seller.supports"
                :key="index"
            >
              <support-ico
                :size="2"
                :type="seller.supports[index].type"
              />
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import popupMixin from 'utils/mixins/popup'
  import Star from 'components/star/star'
  import SupportIco from 'components/support-ico/support-ico'

  export default {
    name: 'header-detail',
    mixins: [popupMixin],
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        },
      },
    },
    components: {
      Star,
      SupportIco,
    },
  }
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/mixin"
  @import "~assets/stylus/variable"

  .header-detail
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    overflow: auto
    background-filter blur(10px)
    opacity: 1
    color: $color-white
    background: $color-background-s
		
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: $color-background
    .detail-wrapper
      display: inline-block
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: $fontsize-large
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: $fontsize-medium
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            display: flex
            align-items: center
            padding: 0 12px
            margin-bottom: 12px
            &:last-child
              margin-bottom: 0
            .support-ico
              margin-right: 6px
            .text
              line-height: 16px
              font-size: $fontsize-small
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: $fontsize-small
    .detail-close
      position: relative
      width: 30px
      height: 30px
      margin: -64px auto 0 auto
      clear: both
      font-size: $fontsize-large-xxxx
</style>
