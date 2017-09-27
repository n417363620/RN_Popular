/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-27 10:14
 */

export default function makeCancelable(promise)  {
    let hasCancled=false
    const wrappedPromise=new Promise((resolve,reject)=>{
       promise.then((val)=>{
           hasCancled?reject({isCanceled:true}):resolve(val)
       })
        promise.catch((error)=>{
           hasCancled?reject({isCanceled:true}):resolve(error)
        })
    })
    return {
       promise:wrappedPromise,
        cancel(){
            hasCancled=true
        }
    }
}


