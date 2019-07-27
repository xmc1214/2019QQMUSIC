<template>
  <div id="app">
    <transition name="boundle" mode="out-in">
      <router-view></router-view>
    </transition>
    <player ref="player"></player>
    <div class="bottomTab">
      <bottom-tab v-if="tabDisplay"></bottom-tab>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BottomTab from "components/bottomTab/bottomTab";
import Player from "components/player/player";
export default {
  name: "App",
  data(){
    return{
    }
  },
  components: {
    BottomTab,
    Player
  },
  computed: {
    tabDisplay() {
      return this.tabDisplay;
    },
    ...mapGetters(["tabDisplay"])
  },
  methods: {
  }
};
</script>

<style lang="stylus">
#app
  min-width: 350px
  .bottomTab
    width: 100%
    position: fixed
    bottom: 0
.boundle-enter-active, .boundle-leave-active
  transition: all 0.3s
.boundle-enter, .boundle-leave-to
  transform: translate3d(0, -100%, 0)
</style>
