<template>
  <scroll
    class="listview"
    :data="data"
    :scrollY="true"
    ref="listview"
    :listen-scroll="listenScroll"
    :scroll-start="scrollStart"
    :scroll-end="scrollEnd"
    @start="start"
    @end="end"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <scroll class="tag-wrapper" :scrollX="true" :data="data">
        <div class="tag-content">
          <div
            class="tag-list"
            v-for="(areaItem,areaIndex) in tagArea"
            :key="areaIndex"
            :ref="`tag-area-${areaIndex}`"
            @click="highLight('tag-area-' + areaIndex,'area')"
          >{{areaItem}}</div>
        </div>
      </scroll>
      <scroll class="tag-wrapper" :scrollX="true" :data="data">
        <div class="tag-content">
          <div
            class="tag-list"
            v-for="(statusItem,statusIndex) in tagStatus"
            :key="statusIndex"
            :ref="`tag-status-${statusIndex}`"
            @click="highLight('tag-status-' + statusIndex,'status')"
          >{{statusItem}}</div>
        </div>
      </scroll>
      <scroll class="tag-wrapper" :scrollX="true" :data="data">
        <div class="tag-content">
          <div
            class="tag-list"
            v-for="(styleItem,styleIndex) in tagStyle"
            :key="styleIndex"
            :ref="`tag-style-${styleIndex}`"
            @click="highLight('tag-style-' + styleIndex,'style')"
          >{{styleItem}}</div>
        </div>
      </scroll>
      <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,idx) in group.items" class="list-group-item" :key="idx" @click="selectItem(item)">
            <div class="left">
              <img class="avatar" v-lazy="item.avatar" alt="头像" />
              <span class="name">{{item.name}}</span>
            </div>
            <div class="arrow"></div>
          </li>
        </ul>
      </li>
    </ul>
    <div
      v-show="listShow"
      class="list-shortcut"
      :class="{'listShow':flag==='hidden'}"
      @touchstart="onFastListTouchStart"
      @touchmove.stop.prevent="onFastListTouchMove"
    >
      <ul>
        <li
          v-for="(item,index) in rightFastList"
          :key="index"
          class="item"
          :class="{'current':currentIndex===index}"
          :data-index="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle&&titleShow">
      <h1 class="fixed-title" ref="fixed">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading />
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getData } from "common/js/dom";
import Loading from "base/loading/loading";
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
    this.scrollStart = true;
    this.scrollEnd = true;
  },
  mounted() {
    this.$refs[this.height1][0].style.backgroundColor = "#79F8BA",
      this.$refs[this.height2][0].style.backgroundColor = "#79F8BA",
      this.$refs[this.height3][0].style.backgroundColor = "#79F8BA";
      this.$refs[this.height1][0].style.color = "#0E1224",
      this.$refs[this.height2][0].style.color = "#0E1224",
      this.$refs[this.height3][0].style.color = "#0E1224";
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      listShow: false,
      titleShow: false,
      diff: -1,
      flag: "",
      tagArea: ["全部", "内地", "港台", "欧美", "日本", "韩国", "其他"],
      tagStatus: ["全部", "男", "女", "组合"],
      tagStyle: [
        "全部",
        "流行",
        "嘻哈",
        "摇滚",
        "电子",
        "民谣",
        "R&B",
        "民歌",
        "轻音乐",
        "爵士",
        "古典",
        "乡村",
        "蓝调"
      ],
      height1: "tag-area-0",
      height2: "tag-status-0",
      height3: "tag-style-0"
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    refresh(){
      this.$refs.listview.refresh()
    },
    selectItem(item){
      this.$emit('select',item)
    },
    onFastListTouchStart(el) {
      let keyIndex = getData(el.target, "index");
      let touchData = el.touches[0];
      this.touch.y1 = touchData.pageY;
      this.touch.keyIndex = keyIndex;
      this._scrollTo(keyIndex);
    },
    onFastListTouchMove(el) {
      let touchData = el.touches[0];
      this.touch.y2 = touchData.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let keyIndex = parseInt(this.touch.keyIndex) + delta;
      this._scrollTo(keyIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
      if (pos.x === 0 && pos.y === 0) {
        return;
      }
      this.listShow = true;
    },

    start() {
      this.flag = "";
    },
    end() {
      this.flag = "hidden";
      setTimeout(() => {
        this.listShow = false;
      }, 2000);
      console.log(this.listShow);
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    highLight(index, name) {
      if (name === "area") {
        this._setColor(index, this.height1);
        this.height1 = index;
      }
      if (name === "status") {
        this._setColor(index, this.height2);
        this.height2 = index;
      }
      if (name === "style") {
        this._setColor(index, this.height3);
        this.height3 = index;
      }
    },
    _setColor(index, flag) {
      this.$refs[flag][0].style.color = "#fff";
      this.$refs[flag][0].style.backgroundColor = "#222637";
       this.$refs[index][0].style.color = "#0E1224";
      this.$refs[index][0].style.backgroundColor = "#79F8BA";
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      if (newY < -90) {
        this.titleShow = true;
      }
      if (newY > -50) {
        this.titleShow = false;
      }
      //滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      //中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let top = listHeight[i];
        let bottom = listHeight[i + 1];
        if (-newY >= top && -newY < bottom) {
          this.currentIndex = i;
          this.diff = bottom + newY;
          return;
        }
      }
      //滚动到底部
      this.currentIndex = 0;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      } else {
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    }
  },
  computed: {
    rightFastList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return;
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .tag-wrapper
    width: 100%
    overflow-x hidden
    white-space: nowrap
    .tag-content
      display: inline-block
      margin-left: 20px
      padding-right 100px
      .tag-list
        box-sizing: border-box
        width: 40px
        height: 20px
        line-height: 20px
        background-color: #222637
        margin: 5px
        border-radius: 10px
        border: none
        display: inline-block
        text-align: center
        font-size: $font-size-small
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background-color: #222637
    .list-group-item
      display: flex
      align-items: center
      justify-content: space-between
      padding: 20px 0 0 30px
      .left
        display: flex
        align-items: center
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
      .arrow
        display: inline-block
        width: 30px
        height: 30px
        bg-image('arrow_icon')
        background-size: 100% 100%
  .list-shortcut
    position: absolute
    z-index: 30
    right: 3%
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background-color: #222637
    font-family: Helvetica
    &.listShow
      animation: fade 2s ease
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background-color: #222637
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
@keyframes fade
  0%
    opacity: 1
  100%
    opacity: 0
</style>
