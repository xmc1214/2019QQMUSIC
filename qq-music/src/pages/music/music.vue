<template>
<div>
    <m-header :title="'音乐馆'" :rightIcon="'iconListen'"></m-header>
    <tab :title="title" :location="location"></tab>
   <keep-alive>
      <router-view></router-view>
   </keep-alive>
</div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
    components:{
        MHeader,
        Tab
    },
    data(){
        return{
            title:[
                '推荐',
                '歌手',
                '排行',
                '搜索'
            ],
            location:[
                '/music/recommend',
                '/music/singer',
                '/music/rank',
                '/music/search'
            ]
        }
    }
}
</script>

<style>

</style>
