<template>
  <div class="song-list">
    <button class="song-search">
      <div class="search-icon"></div>搜索此歌手的歌曲
    </button>
    <div class="play-wrapper" @click="playAll">
      <div class="play-left">
        <div class="play-icon"></div>
        <h2 class="play-text">全部播放（{{songs.length}}）</h2>
      </div>
      <div class="play-right">
        <div class="sort-icon"></div>
        <div class="edit-icon"></div>
      </div>
    </div>
    <ul>
      <li v-for="(song,index) in songs" :key="index" class="item" @click="selectItem(song,index)">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
        <div class="content-icon">
          <div class="icon-cell"></div>
          <div class="icon-feed"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    playAll(){
      this.$emit('playAll')
    },
    selectItem(item,index){
      this.$emit('select',item,index)
    },
    getDesc(song) {
      return `${song.singer}.${song.album}`;
    },
    onSelect() {},
    onCancel() {},
    showActionSheet() {
      this.sortShow = !this.sortShow;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.song-list
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    font-size: $font-size-medium
    justify-content: space-between
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 30px
      text-align: center
      .icon
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex: 6
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        color: $color-text
      .desc
        no-wrap()
        margin-top: 4px
        color: $color-text-d
    .content-icon
      flex: 1
      display: flex
      justify-content: space-between
      align-items: center
      .icon-cell
        width: 25px
        height: 25px
        flex: 0 0 25px
        bg-image('cell_mv_button')
        background-size: 100% 100%
      .icon-feed
        width: 25px
        height: 25px
        flex: 0 0 25px
        bg-image('feed_more_in_list')
        background-size: 100% 100%
  .song-search
    width: 100%
    border: none
    background-color: #222637
    color: $color-text-d
    border-radius: 15px
    padding-top: 5px
    padding-bottom: 5px
    display: flex
    justify-content: center
    align-items: center
    .search-icon
      display: inline-block
      width: 20px
      height: 20px
      bg-image('search')
      background-size: 100% 100%
      margin-right: 5px
  .play-wrapper
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 10px
    .play-left
      display: flex
      justify-content: flex-start
      align-items: center
      flex: 6
      .play-icon
        width: 30px
        height: 30px
        background-image: url('./play_normal.png')
        background-size: 100% 100%
        margin-right: 5px
      .play-text
        font-size: $font-size-medium
    .play-right
      display: flex
      flex: 1
      justify-content: space-between
      align-items: center
      .sort-icon
        width: 10px
        height: 10px
        bg-image('navagation_btn_manage')
        background-size: 100%
        padding: 2px
        margin: 2px
      .edit-icon
        width: 10px
        height: 10px
        bg-image('navagation_btn_manage')
        background-size: 100%
        padding: 2px
        margin: 2px
</style>
