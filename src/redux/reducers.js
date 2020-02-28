import {combineReducers} from 'redux'

import {SEARCH_LOCATIONS,
    GET_LOCATION,GET_COMMENTS,
    GET_MOVIES,RESET_MOVIES,
    GET_USER,
    GET_MESSAGES,
    CHANGE_RE,
    UPDATE_USER,
    UPDATE_MESSAGES,
    DELETE_LOGIN,
    MSGDELETE_LOGIN
} from './types'

function messages(state=[],action){
    switch (action.type) {
        case GET_MESSAGES:
            return action.data
            break
        case UPDATE_MESSAGES:
            return [...state,action.data]
            break
        case MSGDELETE_LOGIN:
            return []
            break
        default:
            return state
            break;
    }
}

const initUser={username:'',sign:'',friends:[]}
function user(state=initUser,action){
    switch (action.type) {
        case GET_USER:
            return action.data
            break 
        case UPDATE_USER:
            return action.data
            break 
        case DELETE_LOGIN:
            return {username:'',sign:'',friends:[]}
            break 
        default:
            return state
            break
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
        id:1,
        share:30,
        rate:12,
        res:[
            {
                user:{avatar:'xxx',username:'tom',sign:'12'},
                content:'xxxxadsssssssssssssssssasdccccccccccccccccx664646855555555555555555555555555555555221245444aaa',
                stars:12,
                id:1,
                share:64,
                rate:22
            },
            {
                user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
                content:'qqqqqazzz',
                stars:5,
                id:2,
                share:64,
                rate:22,
            }
        ]
    },
    {
        user:{avatar:'sss',username:'bily',sign:'1aaaswdd2'},
        content:'qqqqqazzz',
        stars:5,
        id:2,
        share:141,
        rate:1142,
        res:[]
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
function badgeCount(state=2,action){
    switch (action.type) {
        default:
            return state
            break
    }
}


function location(state={},action){
    switch (action.type) {
        case GET_LOCATION:
            return action.data
            break
        default:
            return state
            break
    }
}
function locations(state=[],action){
     switch (action.type) {
         case SEARCH_LOCATIONS:
             return action.data
             break
         default:
            return state
             break
     }
}
export default combineReducers({
    movieComments,movies,refresh,badgeCount,location,locations,user,messages
})