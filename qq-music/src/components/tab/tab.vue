<template>
  <div class="tab">
    <router-link tag="div" class="tab-item " :to="location[0]">
      <span class="tab-link">{{title[0]}}</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="location[1]">
      <span class="tab-link">{{title[1]}}</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="location[2]">
      <span class="tab-link">{{title[2]}}
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="location[3]">
      <span class="tab-link">{{title[3]}}</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      title:{
        type:Array,
        default:[]
      },
      location:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>