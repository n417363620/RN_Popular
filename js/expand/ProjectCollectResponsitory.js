/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-16 09:30
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import keys from '../../res/data/keys.json'
import languages from '../../res/data/langs.json'
export var FLAG_PROJECTTYPE={flag_popular:'flag_popular_',flag_trending:'flag_trending_'}
export default class ProjectCollectResponsitory {
     constructor(flag) {
        this.flag=flag;
        console.log(this.flag)
     }
    /**
     * 保存收藏项目
     * @param key  -项目ID或者名称
     * @param data --项目的数据
     * @param callback
     * @returns {Promise}
     */
    saveData(key,data){
        console.log('保存数据。。。')
        return new Promise((success,failure)=>{
            AsyncStorage.setItem(key,JSON.stringify(data),(error,result)=>{
                if(error){
                    console.log('数据保存失败：')
                    failure(error)
                }else {
                    console.log('数据保存成功：')
                    this.updateKeys(key,true)
                    success(result)
                }
            })
        })
    }
    /**
     * 移除收藏的内容
     * @param key
     */
    removeData(key){
        AsyncStorage.removeItem(key,error=>{
            if (!error){
                this.updateKeys(key,false)
                console.log('数据移除成功：')
            }else {
                console.log('数据移除失败：')
            }
        })
    }

    /**
     * 获取收藏内容的对应的key集合
     * @returns {Promise}
     */
    fetchKeyData(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                console.log('获取KEYS来比对：')
                console.log(result)
                if (!result){
                   resolve([])
                }else {
                    try {
                        resolve(JSON.parse(result))
                    } catch (error) {
                        reject(error)
                        console.log('数据类型转换出错')
                    }
                }
                if (error){
                    console.log(error)
                    reject(error)
                }
            });
        })
    }
    /**
     * 保存和移除收藏内容后都需要对应更新相应内容对应的key
     * 跟新 key集合
     * @param item
     * @param isAdd
     */
    updateKeys(key,isAdd){
        let keys=[]
        AsyncStorage.getItem(this.flag,(error,result)=>{
            console.log(result)
            if(result)keys=JSON.parse(result)
            let index=keys.indexOf(key)
            console.log('当前索引：'+index+'是否是添加：'+ isAdd+'当前元素KEY：'+key+'存储的所有KEY：')
            console.log(keys)
            if (isAdd){
                if (index===-1){
                    keys.push(key)
                }
            }else {
                if (index!==-1){
                    keys.splice( index,1)
                }
            }
            AsyncStorage.setItem(this.flag,JSON.stringify(keys),error=>{
               if(error){
                   console.log('保存数据失败！')
               }
            })
        })
    }
}

