<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="toplist" :scrollX="false" :scrollY="true" :data="topList">
      <div>
        <span class="rankType" v-if="topType.length > 0">{{topType[0].top}}</span>
        <ul>
          <li @click="selectItem(item)" class="item" v-for="(item,index) in topList" :key="index">
            <ul class="songlist">
              <div class="divide" v-if="topType.length > 0">{{topType[index].main}}榜</div>
              <li class="song" v-for="(song,index) in item.songList" :key="index">
                <span>{{index + 1}}</span>
                <span>{{song.songname}}</span>
                <span class="singerName">-{{song.singername}}</span>
              </li>
            </ul>
            <div class="icon">
              <img width="100" height="100" v-lazy="item.picUrl" />
            </div>
          </li>
        </ul>
        <span class="rankType" v-if="areaList.length > 0">地区榜</span>
        <ul class="areaList">
          <li @click="selectItem(item)" class="areaItem" v-for="(item,index) in areaList" :key="index">
            <div class="icon">
              <img v-lazy="item.picUrl" />
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
   <transition name="slide">
      <router-view></router-view>
   </transition>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import { getTopList } from "api/rank";
import { ERR_OK } from "api/config";
import { playListMixin } from "common/js/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [playListMixin],
  data() {
    return {
      topList: [],
      areaList: [],
      specialList: [],
      topType: []
    };
  },
  created() {
    this._getTopList();
  },
  methods: {
    selectItem(item){
      this.$router.push({
        path:`/music/rank/${item.id}`
      })
      this.setTopList(item)
    },
    handlePlayList(playList) {
      const bottom = playList ? "88px" : "";

      this.$refs.rank.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this._normalizeList(res.data.topList);
        }
      });
    },
    _normalizeList(list) {
      list.forEach(item => {
        if (item.topTitle.indexOf("巅峰榜") !== -1) {
          let temp = item.topTitle.split("·");
          let title = {
            top: temp[0],
            main: temp[1]
          };
          this.topType.push(title);
          this.topList.push(item);
        }
        this.areaList.push(item);
        this.specialList.push(item);
      });
    },
    ...mapMutations({
      setTopList:'SET_TOP_LIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .toplist
    height: 100%
    overflow: hidden
    .rankType
      margin-left: 25px
    .item
      display: flex
      margin: 0 20px
      padding-top: 10px
      height: 100px
      &:last-child
        padding-bottom: 20px
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
        border-top-right-radius: 10px
        border-bottom-right-radius: 10px
        img
          border-top-right-radius: 10px
          border-bottom-right-radius: 10px
      .songlist
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 10px
        height: 100px
        overflow: hidden
        background: #212535
        font-size: $font-size-small
        border-top-left-radius: 10px
        border-bottom-left-radius: 10px
        .divide
          font-size: $font-size-medium
          margin-top: 5px
          padding-bottom: 5px
        .song
          no-wrap()
          line-height: 26px
          span
            color: $color-text
            &.singerName
              color: $color-text-d
  .areaList
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: center
    .areaItem
      flex: 0 0 120px
      margin: 5px 5px
      border-radius: 10px
      .icon
        border-radius: 10px
        img
          width: 100%
          height: 100%
          border-radius: 10px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%,0,0)
</style>
