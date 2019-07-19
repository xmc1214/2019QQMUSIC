<template>
  <song-list :songs="songs" @select="selectItem" @playAll="playAllItem"></song-list>
</template>

<script>
import SongList from "base/song-list/song-list";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import getUrl from "common/js/getUrl";
import { ERR_OK } from "api/config";
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  components: {
    SongList
  },
  methods: {
    playAllItem(){
       this.playAll({
        list: this.songs
      });
       getUrl(this.songs[0].mid).then(res => {
        let url = res
        let index = 0
        this.setPlaylistUrl({
          index,
          url
        });
      });
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
      getUrl(item.mid).then(res => {
        let url = res
        this.setPlaylistUrl({
          index,
          url
        });
      });
    },
    ...mapActions(["selectPlay","playAll"]),
    ...mapMutations({ setPlaylistUrl: "SET_PLAYLIST_URL" })
  }
};
</script>

<style>
</style>
