<template>
  <div>
    <m-header :title="'推荐'" :rightIcon="'iconListen'" @openSearch="search"></m-header>
    <div class="recommend">
      <scroll class="wrapper" :data="discList" :scrollX="false" :scrollY="true">
        <div>
          <van-divider :style="{color:'#ffffff'}">Hi锥生零，今日为你打造</van-divider>
          <list :listName="'你的专属'" :data="goodDiscList" :horizontal="true" @select="selectItem" />
          <div class="recommend-list">
            <h1 class="list-title">更多为你推荐</h1>
            <ul>
              <li
                @click="selectItem(item)"
                v-for="(item,index) in discList"
                class="item"
                :key="index"
              >
                <div class="icon">
                  <img v-lazy="item.imgurl" />
                  <span class="listenNum">
                    <span class="play"></span>
                    {{item.listennum}}
                  </span>
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
          <loading v-show="!goodDiscList.length"></loading>
          <transition name="slide">
            <router-view></router-view>
          </transition>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
import Scroll from "base/scroll/scroll";
import List from "base/list/list";
import Loading from "base/loading/loading";
import { getRecommend, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      discList: [],
      goodDiscList: []
    };
  },
  components: {
    MHeader,
    List,
    Loading,
    Scroll
  },
  created() {
    this._getDiscList();
  },
  methods: {
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = this._normalize(res.data.list);
          console.log(res.data.list);
          let data = res.data.list.map(item => item);
          this.goodDiscList = data.reverse();
        }
      });
    },
    _normalize(list) {
      list.forEach(element => {
        element.listennum = `${(element.listennum / 10000.0).toFixed(1)}万`;
      });
      return list;
    },
    selectItem(item) {
      this.$router.push({
        path: `/music/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    search() {
      this.$router.push({
        name: "search"
      });
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.recommend
  position: fixed
  width: 100%
  top: 44px
  bottom: 88px
  .wrapper
    height: 100%
    overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: left
        font-size: $font-size-large
        color: $color-text
        padding-left: 20px
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 0 20px
        .icon
          flex: 0 0 105px
          width: 105px
          padding-right: 20px
          img
            max-width: 100%
            border-radius: 10px
          .listenNum
            width: 70px
            height: 20px
            background: $color-background-l
            border-radius: 10px
            position: relative
            bottom: 20px
            left: 30px
            display: inline-block
            text-align: center
            color $color-text
            .play
              display: inline-block
              border-right: 0
              width 0
              height 0
              border-left: 10px solid $color-text
              border-top: 5px solid transparent
              border-bottom: 5px solid transparent
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            font-size: $font-size-small
            color: $color-text-d
            text-overflow: ellipsis
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>

