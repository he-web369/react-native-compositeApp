import fetchAsync from './fetchAsync'
//获取电影数据
export const getMoviesDataApi=(start,count)=>fetchAsync("https://douban.uieee.com/v2/movie/top250",{start,count})


