<template>
  <div>
      <scroll class="tag-wrapper" :scrollX="true" :data="tagData">
        <div class="tag-content">
          <div class="tag-list">区域</div>
          <div
            class="tag-list"
            v-for="(areaItem,areaIndex) in tagArea"
            :key="areaIndex"
            :ref="`tag-area-${areaIndex}`"
            @click="highLight('tag-area-' + areaIndex,'area')"
          >{{areaItem}}</div>
        </div>
      </scroll>
      <scroll class="tag-wrapper" :scrollX="true" :data="tagData">
        <div class="tag-content">
          <div class="tag-list">版本</div>
          <div
            class="tag-list"
            v-for="(statusItem,statusIndex) in tagStatus"
            :key="statusIndex"
            :ref="`tag-status-${statusIndex}`"
            @click="highLight('tag-status-' + statusIndex,'status')"
          >{{statusItem}}</div>
        </div>
      </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  components:{
    Scroll
  },
  mounted(){
    this.$refs[this.height1][0].style.backgroundColor = "#79F8BA",
    this.$refs[this.height2][0].style.backgroundColor = "#79F8BA",
    this.$refs[this.height1][0].style.color = "#0E1224",
    this.$refs[this.height2][0].style.color = "#0E1224"
  },
  data(){
    return{
      height1: "tag-area-0",
      height2: "tag-status-0",
      flag: "",
      tagArea: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      tagStatus: ["全部", "MV", "现场", "翻唱","舞蹈","影视","综艺","儿歌"],
    }
  },
  computed:{
    tagData(){
      return this.tagArea.concat(this.tagStatus)
    }
  },
  methods:{
     highLight(index, name) {
      if (name === "area") {
        this._setColor(index, this.height1);
        this.height1 = index;
      }
      if (name === "status") {
        this._setColor(index, this.height2);
        this.height2 = index;
      }
    },
    _setColor(index, flag) {
      this.$refs[flag][0].style.color = "#fff";
      this.$refs[flag][0].style.backgroundColor = "#222637";
      this.$refs[index][0].style.color = "#0E1224";
      this.$refs[index][0].style.backgroundColor = "#79F8BA";
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.tag-wrapper
    width 100%
    overflow hidden
    white-space: nowrap
    .tag-content
      display: inline-block
      margin-left: 10px
      .tag-list
        box-sizing: border-box
        width: 60px
        height: 30px
        line-height: 30px
        background-color: #222637
        margin: 5px
        border: none
        display: inline-block
        text-align: center
        font-size: $font-size-small
</style>
