<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listView/listView";
import { mapMutations } from "vuex";
import {playListMixin} from 'common/js/mixin'
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  mixins:[playListMixin],
  data() {
    return {
      singers: []
    };
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList();
  },
  methods: {
    handlePlayList(playList){
      const bottom = playList?"88px":""
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/music/singer/${singer.id}`
      });
      this.setSinger(singer);
    },

    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);
        }
      });
    },
    //对请求来的歌手数据进行重新组合属性
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
              area: item.Farea,
              genre: item.Fgenre
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
            area: item.Farea,
            genre: item.Fgenre
          })
        );
      });
      let ret = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom:0
  width: 100%
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
