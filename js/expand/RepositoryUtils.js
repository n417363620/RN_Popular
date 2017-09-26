/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-26 10:44
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
var itemMap=new Map()
import DataRequest, {FLAG_MODULE} from "../util/DataRequest";

export default class RepositoryUtils {
    // 构造
    constructor(aboutCommon) {
        this.aboutCommon =new  AboutCommon()
        this.dataRepsitory = new DataRequest(FLAG_MODULE.flag_mine)
    }

    /**
     * 通知数据发生改变
     * @param arr
     */
    onNotifyDataChanged(items){
        
    }
    
    /**
     * 跟新数据
     * @param k
     * @param v
     */
    updateData(k,v){
        itemMap.set(k,v)
        var arr=[]
        for(let value of itemMap.values()){arr.push(value)}
        this.aboutCommon.onNotifyDataChanged(arr)
    }
    /**
     * 获取指定Url的数据
     * @param url
     */
    fetchRepository(url){
        this.dataRepsitory.getResponsitory(url).then(result=>{
            if (result){
                this.updateData(url,result);
                if (result.update_data&&!this.dataRepsitory.checkDataValid(result.update_data)){
                    return this.dataRepsitory.get(url)
                }
            }
        }).then(item=>{
            if (item){
                this.updateData(url,item)
            }
        }).catch(error=>console.log(error))
    }

    /**
     * 批量获取URL对应的数据
     * @param urls
     */
    fetchRepositories(urls){
        for(let i=0;i<urls.length;i++){
            this.fetchRepository(urls[i])
        }
    }

}