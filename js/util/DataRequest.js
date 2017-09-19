/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 21:24
 */
import {AsyncStorage} from 'react-native'
export default  class DataRequest{
    /**
     * 获取网络数据
     * @param url
     * @param data
     * @returns {Promise}
     */
     get(url){
        return new Promise((resolve,reject)=>{
            fetch(url).then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'))
                        return
                    }
                    resolve(result);
                    this.saveRepository(url,result.items)
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @param data
     * @returns {Promise}
     */
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

    /**
     * 获取数据
     * @param url
     * @returns {Promise}
     */
     getResponsitory(url) {
         return new Promise((resolve,reject)=>{
             //获取本地数据
             this.getLocalResponsitory(url)
                 .then(result=>{
                     if (result){
                         console.log('加载到了本地数据')
                        resolve(result)
                     }
                     else {
                         this.get(url)
                             .then(result=>{
                                 console.log('未加载本地数据，加载到了网络数据')
                                 resolve(result)
                             })
                             .catch(e=>{
                                 reject(e)
                             })
                     }
                 })
                 .catch(e=>{
                     console.log('获取本地数组失败=》从网络获取数据')
                     this.get(url)
                         .then(result=>{
                             resolve(result)
                         })
                         .catch(e=>{
                             reject(e)
                         })
                 })
         })
     }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    getLocalResponsitory(url) {
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if (!error){
                    try {
                        resolve(JSON.parse(result))
                    }
                    catch (e){
                        reject(e)
                    }
                }else {
                    reject(error)
                }
            })
        })
    }

    /**
     * 保存网络数据到本地
     * @param url
     * @param items
     * @param callback
     */
    saveRepository(url,items,callback){
        console.log('加载网络数据后，存入本地')
        if (!url||!items) return
        let wrapDta={items:items,update_data:new Date().getTime()}
        AsyncStorage.setItem(url,JSON.stringify(wrapDta),(error,result)=>{
            if(error){
                console.log('数据保存失败：'+error)
            }else {
                console.log('数据保存成功：'+result)
            }
        })
    }

    /**
     * 检查时间是否过时
     * @param longTime 4小时过时
     */
    checkDataValid(longTime){
        let cDate=new Date()
        let tDate=new Date()
        tDate.setTime(longTime)
        if (cDate.getMonth()!==tDate.getMonth()) return false
        if (cDate.getDay()!==tDate.getDay()) return false
        if (cDate.getHours()>tDate.getHours()+4) return false
        return true
    }
}

