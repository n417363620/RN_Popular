/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-29 17:15
 */

import React, {Component} from 'react';
import {NativeModules} from 'react-native';
export default class RNImagePicker{
    /**
     *
     * @param maxNum 最大选择数
     * @param isShowCamera 是否显示照相机
     */
    static RNselectImages( maxNum,isShowCamera){
        return NativeModules.ImagePicker.selectImages(maxNum,isShowCamera)
    }
    /**
     * @param jsonArray 携带过去的图片路径
     * @param maxNum  最大选择数
     * @param isShowCamera 是否显示照相机
     */
    static  RNselectImagesWithExistImages(jsonArray, maxNum,isShowCamera){
        return NativeModules.ImagePicker.selectImagesWithExistImages(jsonArray,maxNum,isShowCamera)
    }

    /**
     * @param isShowCamera 是否显示照相机
     */
    static RNcropImage(isShowCamera){
        return NativeModules.ImagePicker.cropImage(isShowCamera)
    }
}
