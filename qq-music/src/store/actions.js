import * as types from './mutation-types'
import { playMode } from 'common/js/config'
export const selectPlay = function({ commit }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
export const playAll = function({ commit }, { list }) {
    commit(types.SET_PLAY_MODE, playMode.sequence)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}