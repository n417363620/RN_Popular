/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 21:24
 */

export default  class DataRequest{
     get(url){
        return new Promise((resolve,reject)=>{
            fetch(url).then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }
     post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'POST',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
                .then(response=>response.json())
                .then(result=>{
                    resolve(result)
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }
}

