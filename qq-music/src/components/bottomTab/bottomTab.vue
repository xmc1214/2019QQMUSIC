<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/music">
      <span class="tab-icon music"></span>
      <span class="tab-link">音乐馆</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-icon recommand"></span>
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/discovery">
      <span class="tab-icon discovery"></span>
      <span class="tab-link">发现</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/mine">
      <span class="tab-icon mine"></span>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.tab
    display flex
    justify-content center
    align-items flex-end
    height: 88px
    font-size: $font-size-small
    background-image url('./minibar_bg@2x.png')
    background-size 100% 100%
    .tab-item
        flex: 1
        text-align: center
        height 46px
        padding-bottom 2px
        .tab-icon
            display block
            width 30px
            height 30px
            margin 0 auto
            &.recommand
                bg-image('tabVC_recommand')
                background-size 30px 30px
                background-repeat no-repeat
            &.music
                bg-image('tabVC_music')
                background-size 30px 30px
                background-repeat no-repeat
            &.discovery
                bg-image('tabVC_discovery')
                background-size 30px 30px
                background-repeat no-repeat
            &.mine
                bg-image('tabVC_mine')
                background-size 30px 30px
                background-repeat no-repeat
        &.router-link-active
            .tab-icon
                &.recommand
                    bg-image('active_recommand')
                &.music
                    bg-image('active_music')
                &.discovery
                    bg-image('active_discovery')
                &.mine
                    bg-image('active_mine')
        .tab-link
            display block
            color: $color-text-l
        &.router-link-active
            .tab-link
                color: $color-theme
</style>
