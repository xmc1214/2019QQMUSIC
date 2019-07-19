<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script>
import { mapGetters } from "vuex";
import { getSingerDetail } from "api/singer";
import { getPlayUrl } from "api/singer";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import MusicList from "components/music-list/music-list";
export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getSingerDetail(this.singer.id);
  },
  methods: {
    _getSingerDetail(id) {
      if (!this.singer.id) {
        this.$router.push("/music/singer");
        return;
      }
      getSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
          console.log(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        var { musicData } = item;
        if (musicData.songid && musicData.albumid) {
              ret.push(createSong(musicData));
            }
      });
      return ret;
    }
  }
};
</script>
<style lang="stylus" scoped></style>

