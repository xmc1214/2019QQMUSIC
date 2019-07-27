<template>
  <disc-list :title="title" :bg-image="bgImage" :songs="songs"></disc-list>
</template>

<script>
import DiscList from "components/disc-list/disc-list";
import { mapGetters } from "vuex";
import { getMusicList } from "api/rank";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
export default {
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  components: {
    DiscList
  },
  created() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push("/music/rank");
        return;
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  computed: {
    title() {
      return this.topList.topTitle;
    },
    bgImage() {
      return this.topList.picUrl
    },
    ...mapGetters(["topList"])
  }
};
</script>

<style>
</style>
