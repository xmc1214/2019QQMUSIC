<template>
  <div>
    <div class="recommend-title">
      <span class="list-title-left">
        <h1>{{listName}}</h1>
      </span>
      <span class="list-title-right">
        <h3>更多》</h3>
      </span>
    </div>
    <scroll class="wrapper" :scrollX="scrollX" :data="data" :scrollY="false">
      <ul class="allItem" ref="allItem">
        <li
          @click="selectItem(item)"
          v-for="(item,index) in data"
          class="item"
          :key="index"
          ref="item"
        >
          <div class="icon">
            <img v-lazy ="item.imgurl" />
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <!-- <p class="desc" v-html="item.dissname"></p> -->
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
export default {
   props: ["listName", "horizontal", "data"],
  data() {
    return {
      scrollX: false,
      dataList: []
    }
  },
  components:{
    Scroll
  },
  mounted() {
    let horizontal = this.horizontal
    let data = this.data
    this.scrollX = horizontal;
    this.dataList = data;
  },
  methods:{
    selectItem(item){
      this.$emit('select',item)
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend-title
  display: flex
  justify-content: space-between
  .list-title-left
    flex: 1
    height: 65px
    line-height: 65px
    text-align: left
    font-size: $font-size-large
    color: $color-text
    padding-left: 20px
  .list-title-right
    flex: 1
    height: 65px
    line-height: 65px
    text-align: right
    font-size: $font-size-small
    color: $color-text
    padding-right: 20px
.wrapper
  width: 100%
  overflowX: hidden
  white-space: nowrap
  .allItem
    display: inline-block
    margin-left: 15px
    .item
      box-sizing: border-box
      width: 105px
      height: 105px
      background-color: $color-text
      margin: 5px
      border-radius: 10px
      border: none
      display: inline-block
      .icon
        width: 100%
        border-radius: 10px
        img
          max-width: 100%
          border-radius: 10px
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        text-align: left
        padding-left: 5px
        .name
          font-size:$font-size-small
          margin-bottom: 10px
          color: $color-text
        .desc
          color: $color-text-d
</style>

