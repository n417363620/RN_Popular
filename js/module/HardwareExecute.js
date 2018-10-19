/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-10-12 16:37
 */

import React, {Component} from 'react';
import {NativeModules} from 'react-native';
export default class HardwareExecute{
    /**
      * @param lightStatus -true false 打开或关闭手电筒
     */
  static RNlightSwitch(lightStatus){
      NativeModules.CameraModule.lightSwitch(lightStatus);
  }
  static RNprocessImageFromPhotos( path){
     return NativeModules.CameraModule.processImageFromPhotos(path)
  }
}


