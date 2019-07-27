import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULLSCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_PLAYLIST_URL](state, keyUrl) {
        state.playList[keyUrl.index].url = keyUrl.url
    },
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList
    },
    [types.SET_TAB_DISPLAY](state, tabDisplay) {
        state.tabDisplay = tabDisplay
    },
    [types.SET_BOTTOM](state, bottom) {
        state.bottom = bottom
    },
    [types.SET_BGCOLOR](state, bgColor) {
        state.bgColor = bgColor
    },
    [types.SET_SEARCH_HISTORY](state, searchHistory) {
        state.searchHistory = searchHistory
    },
    [types.SET_FAVORITE_LIST](state, favoriteList) {
        state.favoriteList = favoriteList
    }
}
export default mutations