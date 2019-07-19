<template>
  <div id="app">
    <router-view></router-view>
    <player></player>
   <div class="bottomTab"> <bottom-tab></bottom-tab></div>
  </div>
</template>

<script>

import BottomTab from 'components/bottomTab/bottomTab'
import Player from 'components/player/player'
export default {
  name: 'App',
  components:{
    BottomTab,
    Player
  }
}
</script>

<style lang="stylus">
#app
  min-width 350px
  .bottomTab
    width 100%
    position fixed
    bottom 0
</style>
