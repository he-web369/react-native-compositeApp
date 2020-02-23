import {combineReducers} from 'redux'

import {HAS_VALUE,GET_MOVIES} from './types'

function cameraData(state={},action){
    switch (action.type) {
        case HAS_VALUE:
            return action.data
            break
        default:
            return state
    }
}
function movies(state=[],action){
    switch (action.type) {
        case GET_MOVIES:
            const newState=[...state,...action.data]
            newState.isRefresh=false
            return newState
            break
        default:
            return state
    }
}
export default combineReducers({
    cameraData,movies
})