/**
 * 请求数据函数
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
export default function fetchAsync(url,params={},method='GET'){
    return new Promise((resolve,reject)=>{
        method=method.toUpperCase()
        try {
            if(method==='GET'||method==="DELETE"){
                let keys=Object.keys(params)
                if(keys.length>0){
                    let str='?'
                    keys.forEach(key=>{
                        str+=`${key}=${params[key]}&`
                    })
                    url+=str.substring(0,str.length-1)
                }
                fetch(url).then(res=>{
                    res.json().then(res=>{
                        resolve(res)
                    })
                })
            }else{
                fetch(url,{
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(params)
                }).then(res=>{
                    res.json().then(res=>{
                        resolve(res)
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    })
}