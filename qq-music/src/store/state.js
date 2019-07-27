import { playMode } from 'common/js/config'
import { loadSearch, loadFavorite } from 'common/js/cache'
const state = {
    singer: {

    },
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    tabDisplay: true,
    bottom: 50,
    bgColor: "",
    searchHistory: loadSearch(),
    favoriteList: loadFavorite()
}

export default state