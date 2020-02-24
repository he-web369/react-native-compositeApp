import {HAS_VALUE,GET_COMMENTS,GET_MOVIES,RESET_MOVIES,CHANGE_RE} from './types'
import {getMovieComments,getMoviesDataApi} from '../api/index'
import {Alert} from 'react-native'

export const cameraQRCode=(data)=>({type:HAS_VALUE,data})

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

export const getMovies=(data)=>({type:GET_MOVIES,data})
export const resetMov=(data)=>({type:RESET_MOVIES,data})
export const toggleRe=(data)=>({type:CHANGE_RE,data})