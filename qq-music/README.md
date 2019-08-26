# 项目介绍
此项目基于`vue-cli`+`vue-router`+`vuex`+`better-scroll`+`webpack`+`axios`+`stylus`的2019全新版QQ音乐,界面以及功能是参照移动端QQ音乐设计的
# 项目目录结构
此目录是src内的  
├── api   //对接口的封装以及配置  
├── base  //项目内的基础通用组件，不涉及业务逻辑  
│   ├── list  
│   ├── listView  
│   ├── loading  
│   ├── no-result  
│   ├── progress-bar  
│   ├── progress-circle  
│   ├── scroll  
│   ├── search-box  
│   ├── slider  
│   └── song-list  
├── common //公共字体、图片、js以及样式  
│   ├── fonts  
│   ├── image  
│   ├── js  
│   └── stylus  
├── components //业务逻辑组件，是由自定义dom和部分基础通用组件和相关业务逻辑组成  
│   ├── album  
│   ├── bottomTab  
│   ├── disc  
│   ├── disc-list  
│   ├── m-header  
│   ├── music-list  
│   ├── mv-list  
│   ├── mv_tag  
│   ├── player  
│   ├── rank  
│   ├── recommend  
│   ├── search  
│   ├── singer  
│   ├── singer-detail  
│   ├── song-detail  
│   ├── song-list  
│   ├── suggest  
│   ├── tab  
│   ├── top-list  
│   └── video  
├── pages  //页面级别组件，是由业务逻辑组件和部分自定义dom以及相关业务逻辑组成  
│   ├── discovery  
│   ├── mine  
│   ├── music  
│   ├── recommend  
│   └── test  
├── request //对axios的封装  
├── router // 路由的配置，此处使用路由的动态加载进行了性能优化  
└── store //vuex数据状态管理  
# 技术实现方案
## 前端实现
大部分数据使用jsonp模拟接口请求配合后端代理的方式获取，vue-cli快速搭建项目框架，
vue-router实现路由间的跳转，vuex管理播放歌曲的状态数据，better-scroll2.0实现歌单、歌手等列表的横向与纵向流畅滚动，
使用webpack对项目进行打包，fastclick解决移动端点击延迟问题，vconsole实现手机端的调试，对歌曲搜索进行了防抖优化，
## 后端实现
使用koa搭建的后端，部分无法通过jsonp获取的数据从后端获取
## 主要界面展示
[![mWbl3n.md.png](https://s2.ax1x.com/2019/08/26/mWbl3n.md.png)](https://imgchr.com/i/mWbl3n "歌单推荐")
[![mWbL5Q.md.png](https://s2.ax1x.com/2019/08/26/mWbL5Q.md.png)](https://imgchr.com/i/mWbL5Q "专属推荐")
[![mWbqUg.md.png](https://s2.ax1x.com/2019/08/26/mWbqUg.md.png)](https://imgchr.com/i/mWbqUg "歌手排行")
[![mWbbVS.md.png](https://s2.ax1x.com/2019/08/26/mWbbVS.md.png)](https://imgchr.com/i/mWbbVS "歌曲排行榜")
[![mWb7b8.md.png](https://s2.ax1x.com/2019/08/26/mWb7b8.md.png)](https://imgchr.com/i/mWb7b8 "歌手详情")
[![mWbXCj.md.png](https://s2.ax1x.com/2019/08/26/mWbXCj.md.png)](https://imgchr.com/i/mWbXCj "播放界面")
[![mWbTDf.md.png](https://s2.ax1x.com/2019/08/26/mWbTDf.md.png)](https://imgchr.com/i/mWbTDf "搜索界面")
# 总结
看到界面设计后是不是有一种这就是QQ音乐本人的感觉呢，哈哈，其实还有很多没有完善，最新版qq音乐的更换主题功能是本项目后续计划加入的功能，打算使用stylus或者postcss对样式进行变量化，进行整体替换样式达到主题更换