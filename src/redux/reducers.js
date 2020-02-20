import {combineReducers} from 'redux'

import {HAS_VALUE} from './types'

function CameraData(state={},action){
    switch (action.type) {
        case HAS_VALUE:
            return action.data
            break
        default:
            return state
    }
}
export default combineReducers({
    CameraData
})