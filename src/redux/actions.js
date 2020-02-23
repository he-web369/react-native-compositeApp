import {HAS_VALUE,GET_MOVIES} from './types'
import {getMoviesDataApi} from '../api/index'

export const cameraQRCode=(data)=>{type:HAS_VALUE,data}

export const getMoviesDataAsync=(start,count)=>{
    return (dispatch)=>{
            getMoviesDataApi(start,count).then(res=>{
                let data=res.subjects
                dispatch({type:GET_MOVIES,data})
            })
    }
}