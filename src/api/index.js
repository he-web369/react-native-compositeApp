import fetchAsync from './fetchAsync'
import axiosAsync from './axiosAsync'
//获取电影数据
export const getMoviesDataApi=(start,count)=>fetchAsync("https://douban.uieee.com/v2/movie/top250",{start,count})
//获得电影评论
export const getMovieComments=(movieName)=>fetchAsync('xxx',{movieName})
//请求汽车品牌列表
export const getCarBrands=()=>axiosAsync('http://xxx/brands')
//请求汽车品牌车型列表
export const getCars=()=>axiosAsync('http://xxx/cars')
//根据关键字查询周边地点
export const getAddress=(keywords,location)=>axiosAsync('https://restapi.amap.com/v3/place/around?key=4f7f3f5d985724e42dbd95479946eb29',{keywords,location})