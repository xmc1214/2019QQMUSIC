<template>
  <div class="m-header">
    <div class="text-left">{{title}}</div>
    <button class="header-search" @click="search">
      <div class="search"></div>
      <span>搜索</span>
    </button>
    <div class="icon" :class="rightIcon"></div>
    
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["title", "rightIcon"],
  methods:{
    search(){
      this.$emit('openSearch')
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.m-header
  position: relative
  height: 44px
  display: flex
  justify-content: space-between
  align-items: center
  color: $color-theme
  font-size: 0
  .text-left
    font-size: $font-size-large
    color: $color-text
    padding-left: 20px
    flex: 0 0 60px
  .header-search
    width: 100%
    border: none
    background-color: #222637
    color: $color-text-ll
    border-radius: 15px
    margin-left: 10px
    margin-right: 10px
    padding-top: 5px
    padding-bottom: 5px
    display: flex
    justify-content: center
    align-items center
    outline none
    .search
      display: inline-block
      width: 20px
      height: 20px
      bg-image('search')
      background-size: 100% 100%
      margin-right: 5px
    span 
      color $color-text-ll
      font-size $font-size-medium
  .icon
    width: 25px
    height: 25px
    flex: 0 0 25px
    background-size: 25px 25px
    &.iconListen
      bg-image('new_nav_Recognize')
    &.iconMine
      width: 35px
      height: 35px
      flex: 0 0 35px
      background-size: 35px 35px
      bg-image('top_tab_more')
</style>