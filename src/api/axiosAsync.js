import axios from 'axios'
/**
 * 请求数据函数
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
export default function axiosAsync(url,params={},method='GET'){
    return new Promise((resolve,reject)=>{
        method=method.toUpperCase()
        try {
            if(method==='GET'||method==="DELETE"){
                let keys=Object.keys(params)
                if(keys.length>0){
                    let str=url.includes('?')?'&':'?'
                    keys.forEach(key=>{
                        str+=`${key}=${params[key]}&`
                    })
                    url+=str.substring(0,str.length-1)
                }
                axios(url).then(res=>{
                    resolve(res.data)
                })
            }else{
                axios(url,{
                    method,
                    data:JSON.stringify(params)
                }).then(res=>{
                    resolve(res.data)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })
}