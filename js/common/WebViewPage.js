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
import NavigationBar from "./NavigationBar";
import ViewUtil from "../util/ViewUtil";

export default class WebViewPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params)
        this.url=this.props.navigation.state.params.html_url
        this.title=this.props.navigation.state.params.full_name
        this.state = {
            url:this.url,
            title:this.title,
            canGoBack:false
        };
    }

    back(){
           if(this.state.canGoBack){
               this.webview.goBack()
           }else {
               //DeviceEventEmitter.emit('toast','到顶了')
               NavigationBar.Pop(this)
           }
    }
    goto(){
        this.setState({
            url:'www.baidu.com'
        })
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
                    /*rightButton={ViewUtil.getRightTextButton('Go',()=>{
                        this.goto()
                    })}*/
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

    }
});

