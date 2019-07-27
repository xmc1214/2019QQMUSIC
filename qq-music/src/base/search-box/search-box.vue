<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" autofocus :placeholder="placeholder" v-model="query" ref="box" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索音乐、视频、歌单、歌手..."
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    blur(){
      this.$refs.box.blur()
    },
    clear() {
      this.query = "";
      this.$nextTick(() => {
        this.$refs.box.focus();
      });
    },
    setQuery(query) {
      this.query = query;
    }
  },
  created() {
    this.$watch(
      "query",
      debounce((newQuery) => {
        this.$emit("query", newQuery);
        this.$nextTick(() => {
          this.$refs.box.focus();
        });
      }, 200)
    );
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.search-box
  display: flex
  align-items: center
  box-sizing: border-box
  width: 100%
  padding: 0 6px
  height: 30px
  background: $color-highlight-background
  border-radius: 10px
  .icon-search
    font-size: 24px
    color: $color-text-d
  .box
    flex: 1
    margin: 0 5px
    line-height: 18px
    background: $color-highlight-background
    color: $color-theme
    font-size: $font-size-medium
    border: 0
    outline: none
    text-shadow: 0px 0px 0px $color-text /* 文本颜色 */
    -webkit-text-fill-color: transparent
    &::placeholder
      color: $color-text-d
      padding-left: 5px
  .icon-dismiss
    font-size: 16px
    color: $color-text-d
</style>
