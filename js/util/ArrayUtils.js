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

    /**
     * 复制一个数组
     * @param array
     * @returns {Array}
     */
   static cloneArray(array){
       if (!array) return [];
       let clonedArray=[];
       array.forEach((value,key,array)=>{
           clonedArray.push(value)
       })
       return clonedArray;
   }

    /**
     * 比较两个数组是否相等
     * @param array1
     * @param array2
     * @returns {boolean}
     */
   static isEqual(array1,array2){
       console.log(array1)
       console.log(array2)
       if(array1===null&&array2===null) return false;
       if(array1.length!==array2.length)return false;
       for (let i=0;i<array1.length;i++){
           if(array1[i]!==array2[i]) {
               return false
           }
       }
       return true;
   }

    /**
     * 从数组中移除某个元素
     * @param array
     * @param item
     */
   static removeItem(array,item){
       for(let i=1;i<array.length;i++){
           if (item===array[i]){
               console.log('两个元素相等')
               array.splice(i,1);
           }
       }
   }
}



