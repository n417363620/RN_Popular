/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-19 14:26
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    WebView,
    DeviceEventEmitter
} from 'react-native'
import ViewUtil from "../../util/ViewUtil";
import NavigationBar from "../../common/NavigationBar";
export default class LinkWeb extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params)
        this.state = {
            url:this.props.navigation.state.params.url,
            title:'Popular Trending',
            canGoBack:false,
        };
    }

    back(){
           if(this.state.canGoBack){
               this.webview.goBack()
           }else {
               NavigationBar.Pop(this)
           }
    }
    onMyNavigationStateChange(navistate){
        this.setState({
            canGoBack:navistate.canGoBack,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                        this.back()
                    })}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                 <WebView ref={(webview)=>this.webview=webview}
                          javaScriptEnabled={true}
                          startInLoadingState={true}
                          onNavigationStateChange={(navistate)=>{
                         this.onMyNavigationStateChange(navistate)
                          }}
                          style={{flex:1}}
                          source={{uri:this.state.url}}>
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } ,
    imageButton:{
        width:20,
        height:20,
        tintColor:'white'
    },
    rightButtonPadding:{
        paddingLeft:15,
        paddingVertical:4
    },
});

