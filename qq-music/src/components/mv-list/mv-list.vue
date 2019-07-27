<template>
  <div class="core-container" ref="core">
    <scroll class="scroll-wrapper" ref="mvScroll" :data="mvList" :scrollX="false" :scrollY="true">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in mvList" :key="index">
          <div class="mv-image">
            <img v-lazy="item.picurl" />
          </div>
          <div class="mv-content">
            <span class="text">{{item.mvtitle}}-{{item.singername}}</span>
          </div>
          <div class="mv-content">
            <span class="desc">{{item.mvdesc}}</span>
          </div>
        </div>
        <div class="loading-container" v-show="!mvList.length">
          <loading />
        </div>
      </div>
    </scroll>
  </div>
</template>
1
<script>
import Scroll from "base/scroll/scroll";
import Loading from 'base/loading/loading'
import { playListMixin } from "common/js/mixin";
export default {
  mixins: [playListMixin],
  props: {
    mvList: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList ? "88px" : "";
      this.$refs.core.style.bottom = bottom;
      this.$refs.mvScroll.refresh();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.core-container
  .scroll-wrapper
    height: 520px
    overflow: hidden
    .scroll-content
      position relative
      width 100%
      margin-top 20px
      display: inline-block
      .scroll-item
        width: 190px
        display: inline-block
        border-radius 5px
        &:nth-child(2n + 1)
          margin: 0 7px 20px 10px
        &:nth-child(2n)
          margin: 0 10px 20px 7px
        .mv-image
          width: 100%
          background: $color-text
          border: none
          border-radius 5px
          img
            max-width: 100%
            border-radius 5px
        .mv-content
          text-overflow: ellipsis
          white-space: nowrap
          overflow: hidden
          line-height: 20px
          .text
            font-size $font-size-small
          .desc
            display inline-block
            line-height 10px
            font-size $font-size-small
            color $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top:300px
        transform: translateY(-50%)
</style>

