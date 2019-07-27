<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <span class="back" @click="goback">取消</span>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" :data="shortcut" :scrollX="false" :scrollY="true" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="(item,index) in hotKey"
                :key="index"
                @click="addQuery(item.k)"
              >
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <ul>
              <li
                class="item"
                v-for="(item,index) in searchHistory"
                :key="index"
                @click="addQuery(item)"
              >
                <span>{{item}}</span>
                <span>
                  <i class="icon-delete"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SearchBox from "base/search-box/search-box";
import { getHotKey } from "api/search";
import { ERR_OK } from "api/config";
import Suggest from "components/suggest/suggest";
import getUrl from "common/js/getUrl";
import Scroll from "base/scroll/scroll";
import { playListMixin } from "common/js/mixin";
export default {
  mixins: [playListMixin],
  data() {
    return {
      hotKey: [],
      query: ""
    };
  },
  created() {
    this._getHotKey();
  },
  mounted() {
    this._setTabDisplay(false, 0, "#222637");
  },
  destroyed() {
    this._setTabDisplay(true, 50, "");
  },
  computed: {
    shortcut(){
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters(["searchHistory"])
  },
  methods: {
    handlePlayList(playList){
      const bottom = playList.length > 0 ? '50px':''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()
    },
    showConfirm() {
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 500);
        } else if (action === "cancel") {
          done();
        }
      }
      this.$dialog
        .confirm({
          title: "标题",
          message: "是否清空所有搜索历史",
          beforeClose,
          confirmButtonColor: "#79F8BA",
          confirmButtonText: "清空"
        })
        .then(() => {
          this.clearSearchHistory();
        })
        .catch(() => {});
    },
    deleteSearchHistory(item) {
      this.deleteSearchHistory(item);
    },
    saveSearch(item) {
      getUrl(item.mid).then(res => {
        let url = res;
        let index = 0;
        this.setPlaylistUrl({
          index,
          url
        });
      });
      this.saveSearchHistory(this.query);
    },
    ...mapMutations({ setPlaylistUrl: "SET_PLAYLIST_URL" }),
    blurInput() {
      this.$refs.searchBox.blur();
    },
    onQueryChange(query) {
      this.query = query;
    },
    _setTabDisplay(tabDisplay, bottom, bgColor) {
      this.tabPlayer({
        tabDisplay,
        bottom,
        bgColor
      });
    },
    goback() {
      this.$router.go(-1);
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
      this.saveSearchHistory(query);
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      })
    },
    ...mapActions({
      tabPlayer: "tabPlayer",
      saveSearchHistory: "saveSearchHistory",
      deleteSearchHistory: "deleteSearchHistory",
      clearSearchHistory: "clearSearchHistory"
    })
  },
  components: {
    SearchBox,
    Suggest,
    Scroll
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search
  display: flex
  justify-content: space-between
  align-items: center
  overflow: hidden
  .search-box-wrapper
    margin: 20px
    flex: 0 0 320px
  .back
    margin: 5px
    flex: 0 0 50px
  .shortcut-wrapper
    position: fixed
    top: 100px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-ll
        .item
          display: inline-block
          padding: 6px 15px
          margin: 0 20px 10px 0
          border-radius: 15px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-ll
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 30px
          font-size: $font-size-medium
          color: $color-text-ll
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
        .item
          display: inline-block
          padding: 6px 10px
          margin: 10px 25px 10px 0
          border-radius: 15px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-ll
          .icon-delete
            font-size: $font-size-small
            color: $color-text-d
            padding-left: 5px
  .search-result
    position: fixed
    width: 100%
    top: 70px
    bottom: 0
</style>
