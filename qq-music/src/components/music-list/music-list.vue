<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="icon-feed"></div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="singer-info" ref="singerInfo">
        <div class="singer-name">
          <h1 class="title" v-html="title"></h1>
        </div>
        <div class="singer-fans">
          <h3 class="fansNumber">粉丝：9000万</h3>
        </div>
        <div class="addSinger">
          <span>关注</span>
          <span>勋章</span>
        </div>
      </div>
      <!-- <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>-->
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      class="list"
      :data="songs"
      :scrollY="true"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
      ref="list"
    >
      <div>
        <div class="tab" ref="tab">
          <div class="tab-item" @click="toggleTab('SongList',1)">
            <span class="tab-link" :class="{current:num === 1}">歌曲</span>
          </div>
          <div class="tab-item" @click="toggleTab('Album',2)">
            <span class="tab-link" :class="{current:num === 2}">专辑</span>
          </div>
          <div class="tab-item" @click="toggleTab('Video',3)">
            <span class="tab-link" :class="{current:num === 3}">视频</span>
          </div>
          <div class="tab-item" @click="toggleTab('SongDetail',4)">
            <span class="tab-link" :class="{current:num === 4}">详情</span>
          </div>
        </div>

        <div class="song-list-wrapper">
          <song-list :songs="songs" :is="currentTab" keep-alive></song-list>
        </div>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Tab from "components/tab/tab";
import { prefixStyle } from "common/js/dom";
import Loading from "base/loading/loading";
import SongList from "components/song-list/song-list";
import Album from "components/album/album";
import Video from "components/video/video";
import SongDetail from "components/song-detail/song-detail";
import { playListMixin } from "common/js/mixin";
const RESERVED_HEIGHT = 40;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");
export default {
  mixins: [playListMixin],
  data() {
    return {
      scrollY: 0,
      currentTab: "SongList",
      num: 1
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    Loading,
    Tab,
    SongList,
    Album,
    Video,
    SongDetail
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList ? "88px" : "";
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    toggleTab(name, number) {
      this.currentTab = name;
      this.num = number;
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        blur = Math.min(20 * percent, 20);
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.singerInfo.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "65%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.singerInfo.style.display = "";
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
      this.$refs.bgImage.style.zIndex = zIndex;
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.music-list
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 55
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-medium
  .title
    position: absolute
    top: 0
    left: 10%
    z-index: 40
    width: 80%
    no-wrap()
    text-align: center
    line-height: 40px
    font-size: $font-size-large
    color: $color-text
  .icon-feed
    position: absolute
    top: 0
    right: 6px
    z-index: 55
    width: 40px
    height: 40px
    bg-image('feed_more_in_list')
    background-size: 100% 100%
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 65%
    background-size: cover
    background-position: center
    transform-origin: top
    .singer-info
      width: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      position: absolute
      bottom: 20px
      z-index: 50
      .singer-name
        flex: 1
        height: 40px
        line-height: 40px
        .title
          font-size: $font-size-large-x
      .singer-fans
        flex: 1
        height: 40px
        line-height: 40px
        .fansNumber
          font-size: $font-size-small
      .addSinger
        display: flex
        justify-content: center
        align-items: center
        span
          flex: 1
          padding: 5px 20px 5px 20px
          margin: 0 5px 0 5px
          border: 1px solid #ffffff
          border-radius: 15px
          text-align: center
          font-size: $font-size-medium
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid $color-theme
        color: $color-theme
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        .text
          display: inline-block
          vertical-align: middle
          font-size: $font-size-small
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.2)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .tab
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      justify-content: center
      align-items: center
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          padding-bottom: 5px
          color: $color-text-l
          &.current
            color: $color-theme
            border-bottom: 2px solid $color-theme
    .song-list-wrapper
      padding: 10px 20px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

