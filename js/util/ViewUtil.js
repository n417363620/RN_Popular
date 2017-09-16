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

export default class ViewUtil extends Component {
    /**
     * 返回按钮
     * @param callBack
     * @returns {XML}
     */
    static  getLfetBackButton(callBack) {
          return <TouchableOpacity style={styles.leftButtonPadding}
              onPress={callBack}
           >
               <Image style={styles.imageButton} source={require('../../res/image/ic_back.png')}/>
          </TouchableOpacity>
    }
    static getRightTextButton(text,callBack){
        return <TouchableOpacity style={styles.rightButtonPadding}
            onPress={callBack}
        >
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
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
    }
});

