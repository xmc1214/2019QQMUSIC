<template>
  <div>
    <m-header :title="'发现'" :rightIcon="'iconListen'" @openSearch="search"></m-header>
    <mv-tag></mv-tag>
    <mv-list :mvList="mvList"></mv-list>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
import MvTag from 'components/mv_tag/mv_tag'
import {ERR_OK} from 'api/config'
import MvList from 'components/mv-list/mv-list'

export default {
  components: {
    MHeader,
    MvTag,
    MvList
  },
  data(){
    return{
      mvList:[]
    }
  },
  created(){
    this._getMvListTag()
  },
  methods: {
    _getMvListTag(){
      this.$api.getMvByTag().then((res)=>{
        if(res.response.code === ERR_OK){
          this.mvList = res.response.data.mvlist
        }
      })
    },
    search() {
      this.$router.push({
        name: "search"
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>

