/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-25 16:24
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    PixelRatio,
    Dimensions,
    ListView,
    TouchableOpacity,
    Platform,
    Linking
} from 'react-native'
import ViewUtil from "../../util/ViewUtil";
import AboutCommon, {FLAG_ABOUT} from "./AboutCommon";
import NavigationBar from "../../common/NavigationBar";

export default class IntroducePage extends Component {
    constructor(props) {
        super(props);
       this.aboutCommon=new AboutCommon(props,(dic)=>{this.updateState()},FLAG_ABOUT.flag_introduce)
    }
    updateState(dic) {
        this.setState(dic)
    }

    render(){
       return this.aboutCommon.render({
            name:'NYY',
            description:'广受好评的好应用！！！！！',
        },(<View>
           {ViewUtil.getListCell(require('../../../res/image/ic_website.png'),'Website',()=>{
             //  this.props.navigation.navigate('LinkWebPage',{url:'http://www.i-jia.net/'})
               NavigationBar.Push(this,'LinkWebPage',{url:'http://www.i-jia.net/'})
           })}
           {ViewUtil.getListCell(require('../../../res/image/ic_aboutme.png'),'About Author',()=>{})}
           {ViewUtil.getListCell(require('../../../res/image/ic_feedback.png'),'Feed Back',()=>{})}
       </View>))
    }
}
