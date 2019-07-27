export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {}
}

export const disc = state => state.disc
export const topList = state => state.topList
export const tabDisplay = state => state.tabDisplay
export const bottom = state => state.bottom
export const bgColor = state => state.bgColor
export const searchHistory = state => state.searchHistory
export const favoriteList = state => state.favoriteList