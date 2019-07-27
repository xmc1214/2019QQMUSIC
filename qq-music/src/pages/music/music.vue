<template>
  <div>
    <m-header :title="'音乐馆'" :rightIcon="'iconListen'" @openSearch="search"></m-header>
    <tab :title="title" :location="location"></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
import Tab from "components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  },
  data() {
    return {
      title: ["推荐", "歌手", "排行", "一起听"],
      location: [
        "/music/recommend",
        "/music/singer",
        "/music/rank",
        "/music/togehter"
      ]
    };
  },
  methods: {
    search() {
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.slideTop-enter-active, .slideTop-leave-active
  transition: all 0.3s
.slideTop-enter, .slideTop-leave-to
  transform: translate3d(0, -100%, 0)
</style>

