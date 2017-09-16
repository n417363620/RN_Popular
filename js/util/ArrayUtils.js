/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-16 13:56
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class ArrayUtils extends Component {
    /**
     * 更新数组，若item已存在则从数组中将他一处，否则添加到数组
     */
   static updataArray(array,item){
       for(let i=0;i<array.length;i++){
           let temp=array[i];
           if (temp===item){
               array.splice(i,1);
               return
           }
       }
       array.push(item)
   }
}



