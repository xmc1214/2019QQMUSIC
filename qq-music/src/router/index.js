import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Music from 'pages/music/music'
import PageRecommend from 'pages/recommend/recommend'
import Discovery from 'pages/discovery/discovery'
import Mine from 'pages/mine/mine'
import SingerDetail from 'components/singer-detail/singer-detail'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: 'music/recommend'
        },
        {
            path: '/music',
            component: Music,
            children: [{
                    path: '',
                    redirect: 'recommend'
                },
                {
                    path: 'recommend',
                    component: Recommend

                },
                {
                    path: 'singer',
                    component: Singer,
                    children: [{
                        path: ':id',
                        component: SingerDetail
                    }]
                },
                {
                    path: 'rank',
                    component: Rank
                },
                {
                    path: 'search',
                    component: Search
                }
            ]
        },
        {
            path: '/recommend',
            component: PageRecommend
        },
        {
            path: '/discovery',
            component: Discovery
        },
        {
            path: '/mine',
            component: Mine
        }
    ]
})