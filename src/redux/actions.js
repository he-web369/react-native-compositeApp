import {
    GET_LOCATION,
    HAS_VALUE,
    GET_COMMENTS,
    GET_MOVIES,
    RESET_MOVIES,
    CHANGE_RE,
    SEARCH_LOCATIONS,
    GET_USER,
    GET_MESSAGES,
    UPDATE_USER,
    UPDATE_MESSAGES,
    DELETE_LOGIN,
    MSGDELETE_LOGIN
} from './types'
import {getMovieComments,getMoviesDataApi} from '../api/index'
import {Alert} from 'react-native'

//获取电影评论列表
export const getCommentsAsync=(name)=>{
    return async (dispatch)=>{
       const result=await  getMovieComments(name)
       if(result.status===0){
           dispatch({type:GET_COMMENTS,data})
       }else{
        Alert.alert('错误提示','数据请求错误')
       }
    }
}
export const msgLogOut=()=>({type:MSGDELETE_LOGIN,msg:'logout'})
export const deleteLogin=()=>({type:DELETE_LOGIN,msg:'remove'})
export const updateMessages=(data)=>({type:UPDATE_MESSAGES,data})
export const updateUser=(data)=>({type:UPDATE_USER,data})
export const getUser=(data)=>({type:GET_USER,data})
export const getMovies=(data)=>({type:GET_MOVIES,data})
export const resetMov=(data)=>({type:RESET_MOVIES,data})
export const toggleRe=(data)=>({type:CHANGE_RE,data})
export const getLocation=(data)=>({type:GET_LOCATION,data})
export const searchLocations=(data)=>({type:SEARCH_LOCATIONS,data})
export const getMessages=(data)=>({type:GET_MESSAGES,data})