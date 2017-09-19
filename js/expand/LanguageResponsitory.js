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
export var FLAG_LANGUAGE={flag_language:'flag_language_language',flag_key:'flag_language_key'}
export default class LanguageResponsitory {
     constructor(flag) {
        this.flag=flag;
     }
    fetchData(){
       return new Promise((resolve,reject)=>{
               AsyncStorage.getItem(this.flag,(error,result)=>{
                   if (error){
                       reject(error)
                   }else {
                       if (result){
                           try {
                               resolve(JSON.parse(result))
                           }catch(error) {
                               reject(error)
                           }
                       }else {
                           var  data = this.flag===FLAG_LANGUAGE.flag_key?keys:languages;
                           console.log(data)
                           this.saveData(data);
                           resolve(data)
                       }
                   }
               })
           }
           );

    }
    saveData(data){
        return new Promise((success,failure)=>{
            AsyncStorage.setItem(this.flag,JSON.stringify(data),(error,result)=>{
                if(error){
                    console.log('数据保存失败：'+error)
                    failure(error)
                }else {
                    console.log('数据保存成功：'+result)
                    success(result)
                }
            })
        })
    }
}

