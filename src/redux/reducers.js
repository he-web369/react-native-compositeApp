import {combineReducers} from 'redux'

import {HAS_VALUE,GET_COMMENTS,GET_MOVIES,RESET_MOVIES,CHANGE_RE} from './types'

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
            return state.concat(action.data)
            break 
        case RESET_MOVIES:
            return action.data
            break 
        default:
            return state
            break
    }
}
const comments=[
    {
        user:{avatar:'xxx',username:'tom',sign:'12'},
        content:'xxxxa664646855555555555555555555555555555555221245444aaa',
        stars:12,
        id:1
    },
    {
        user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
        content:'qqqqqazzz',
        stars:5,
        id:2
    }
]
function movieComments(state=comments,action){
    switch (action.type) {
        case GET_COMMENTS:
            if(typeof action.data!=='object'){
                return state
            }
            return action.data
            break
        default:
            return state
            break
    }
}
function refresh(state=false,action){
    switch (action.type) {
        case CHANGE_RE:
            return action.data
            break
        default:
            return state
            break
    }

}
export default combineReducers({
    cameraData,movieComments,movies,refresh
})