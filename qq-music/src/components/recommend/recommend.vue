<template>
  <div class="recommend" ref="recommend">
    <scroll
      class="recommend-content"
      :scrollY="true"
      :data="discList"
      :stopPropagation="true"
      ref="scroll"
    >
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-double">
          <div class="recommend-left">
            <div class="icon">
              <img
                src="http://p.qpic.cn/music_cover/lYiaEbscaryrFiaicJFp8euuRMjfEaYwPochibTJMsxkJCXoy7jEchqwIg/600"
                alt="新歌新碟"
              />
            </div>
            <div class="text">
              <h2 class="name">新歌新碟</h2>
              <h3 class="desc">洗茶极致低音诱惑</h3>
            </div>
          </div>
          <div class="recommend-right">
            <div class="icon">
              <img
                src="http://p.qpic.cn/music_cover/Ye8xJJLS3zf0lX5xTNk0TFjSJkrLt6wgBCZWO4esCjTYJsa9nxia6gw/600"
                alt="数字专辑"
              />
            </div>
            <div class="text">
              <h2 class="name">数字专辑.票务</h2>
              <h3 class="desc">林俊杰疗愈新作</h3>
            </div>
          </div>
        </div>
        <div class="recommend-list">
          <list :listName="'官方歌单'" :data="discList" :horizontal="horizontal" />
          <list :listName="'达人歌单'" :data="goodDiscList" :horizontal="horizontal" />
          <list :listName="'最新专辑'" :data="goodDiscList" :horizontal="horizontal" />
          <list :listName="'一起听'" :data="goodDiscList" :horizontal="horizontal" />
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import List from "base/list/list";
import Loading from "base/loading/loading";
import { getRecommend, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";
export default {
  data() {
    return {
      recommends: [],
      discList: [],
      goodDiscList: [],
      horizontal: true
    };
  },
  components: {
    Slider,
    Scroll,
    List,
    Loading
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    loadImage() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
          console.log(res.data.list);
          let data = res.data.list.map(item => item);
          this.goodDiscList = data.reverse();
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 88px
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 90%
      left: 5%
      border-radius: 10px
      overflow: hidden
    .recommend-double
      width: 90%
      display: flex
      justify-content: space-between
      margin-left: 5%
      margin-top: 5%
      .recommend-left, .recommend-right
        flex: 1
        height: 80px
        margin: 5px
        border-radius: 10px
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 10px 20px 10px 10px
        overflow: hidden
        .icon
          flex: 0 0 50px
          width: 50px
          padding-right: 5px
          border-radius: 5px
          img
            max-width: 100%
            border-radius: 5px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          .name
            margin-bottom: 5px
            color: $color-text
            font-size: $font-size-small
          .desc
            font-size: $font-size-small-s
            color: $color-text-l
      .recommend-left
        background-color: #65CD9F
      .recommend-right
        background-color: #F6CE6A
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

