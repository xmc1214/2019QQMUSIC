<template>
  <disc-list :title="title" :bg-image="bgImage" :songs="songs"></disc-list>
</template>

<script>
import DiscList from "components/disc-list/disc-list";
import { getSongList } from "api/recommend";
import { ERR_OK } from "api/config";
import { mapGetters } from "vuex";
import { createDisc } from "common/js/song";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters(["disc"])
  },
  components: {
    DiscList
  },
  created() {
    this._getSongList();
  },
  methods: {
     _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/music/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            console.log(res)
          }
        })
      },
       _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.mid) {
            ret.push(createDisc(musicData))
          }
        })
        return ret
      }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>
