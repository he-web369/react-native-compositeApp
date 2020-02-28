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
//登录用户名检测
export const checkUserName=(username)=>axiosAsync('http://192.168.0.101:4000/user/check',{username})
//注册
export const logUp=({username,password,sign,nickName})=>axiosAsync('http://192.168.0.101:4000/user/logup',{username,password,sign,nickName},'post')
//登录
export const login=({username,password,validateCode})=>axiosAsync('http://192.168.0.101:4000/user/login',{username,password,validateCode},'post')
//更新用户信息
export const updateUser=({_id,username,sign,nickName})=>axiosAsync('http://192.168.0.101:4000/user/update',{_id,username,sign,nickName},'post')
//获取信息列表
export const getMsgs=(from)=>axiosAsync('http://192.168.0.101:4000/chat/chatList',{from})
//搜索好友
export const searchF=(username)=>axiosAsync('http://192.168.0.101:4000/user/search',{username})
//添加好友
export const addF=({ownName,addName})=>axiosAsync('http://192.168.0.101:4000/user/add',{ownName,addName})
//删除好友
export const removeF=({ownName,addName})=>axiosAsync('http://192.168.0.101:4000/user/remove',{ownName,addName})
//更新消息已读
export const updateRead=({from,to})=>axiosAsync('http://192.168.0.101:4000/chat/read',{from,to})