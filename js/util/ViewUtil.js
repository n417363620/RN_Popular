/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-15 21:42
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Popover,{PopoverTouchable} from "react-native-modal-popover";

export default class ViewUtil extends Component {
    /**
     * 返回按钮
     * @param callBack
     * @returns {XML}
     */
    static getLfetBackButton(callBack) {
        return <TouchableOpacity style={styles.leftButtonPadding}
                                 onPress={callBack}
        >
            <Image style={styles.imageButton} source={require('../../res/image/ic_back.png')}/>
        </TouchableOpacity>
    }

    /**
     * 右侧文字按钮
     * @param text
     * @param callBack
     * @returns {XML}
     */
    static getRightTextButton(text, callBack) {
        return <TouchableOpacity style={styles.rightButtonPadding}
                                 onPress={callBack}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    }
    /**
     * 右侧图片按钮
     * @param text
     * @param callBack
     * @returns {XML}
     */
    static getRightImageButton(source, callBack) {
        return <TouchableOpacity style={styles.rightButtonPadding}
                                    onPress={callBack}
        >
            <Image source={source}
                style={[styles.imageButton,{tintColor:'white'}]}></Image>
        </TouchableOpacity>
    }
    /**
     * 右侧图片按钮组
     * @param text
     * @param callBack
     * @returns {XML}
     */
    static getRightImageButtons(urls, callBacks) {
        return <TouchableOpacity style={styles.rightButtonPadding}
                                 onPress={callBack}
        >
            <Image style={styles.imageButton}></Image>
        </TouchableOpacity>
    }
    /**
     * 中间文字按钮标题
     * @param text
     * @param callBack
     * @returns {XML}
     */
    static getCenterTextButton(text, callBack) {
        return <TouchableOpacity style={styles.centerButtonPadding}
                                 onPress={callBack}
        >
            <Text
                ellipsizeMode={'head'}
                numberOfLines={1}
                style={[styles.textButton, {textAlign: 'center'}]}>{text}</Text>
        </TouchableOpacity>
    }
   static getListCell(img,text,callBack){
        return (
            <View>
            <TouchableOpacity style={styles.item} onPress={callBack}>
                <View style={styles.icon}>
                    <Image style={styles.imgsize} source={img}/>
                    <Text style={styles.fontsizetitle}>{text}</Text>
                </View>
                <Image style={styles.imgsize} source={require('../../res/image/ic_jump.png')}/>
            </TouchableOpacity>
            <View style={styles.line}/>
            </View>
        )
   }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButton:{
        width:20,
        height:20,
        tintColor:'white'
    },
    textButton:{
        fontSize:18,
        color:'white'
    },
    leftButtonPadding:{
        paddingRight:15,
        paddingVertical:4
    },
    rightButtonPadding:{
        paddingLeft:15,
        paddingVertical:4
    },
    centerButtonPadding:{

    },
    item:{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:10,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between'
    },
    icon:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgsize:{
        tintColor:'#912CEE',
        height:16,
        width:16,
    },
    section:{
        flexDirection:'row',
        paddingVertical:4,
        paddingHorizontal:10,
        backgroundColor:'#d9d9d9',
    },
    fontsection:{
        fontSize:13,
        color:'#A6A6A6'
    },
    fontsizetitle:{
        marginLeft:10,
        fontSize:15,
        color:'#4C4C4C'
    },
    line:{
        height:0.5,
        backgroundColor:'#d9d9d9'
    }
});

