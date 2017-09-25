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
import {FLAG_MODULE} from "../util/DataRequest";
import ProjectCollectResponsitory, {FLAG_PROJECTTYPE} from "../expand/ProjectCollectResponsitory";
const trendingUrl='https://github.com/'
export default class WebViewPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log('传输过来的数据')
        console.log(this.props.navigation.state.params)
        this.item=this.props.navigation.state.params.data
        if(this.props.navigation.state.params.flag===FLAG_MODULE.flag_popular){
            this.url=this.props.navigation.state.params.data.item.html_url
            this.title=this.props.navigation.state.params.data.item.full_name
            this.projectCollectResponsitory=new ProjectCollectResponsitory(FLAG_PROJECTTYPE.flag_popular)
        }
        if(this.props.navigation.state.params.flag===FLAG_MODULE.flag_trending){
            this.url=trendingUrl+this.props.navigation.state.params.data.item.fullName
            console.log(this.url)
            this.title=this.props.navigation.state.params.data.item.fullName
            this.projectCollectResponsitory=new ProjectCollectResponsitory(FLAG_PROJECTTYPE.flag_trending)
            this.projectCollectResponsitory.fetchKeyData()
        }
        this.state = {
            url:this.url,
            title:this.title,
            canGoBack:false,
            collected:this.item.isFavorite,
        };
    }

    componentDidMount() {

    }
    back(){
           if(this.state.canGoBack){
               this.webview.goBack()
           }else {
               this.props.navigation.state.params.callback('刷新页面');
               NavigationBar.Pop(this)
           }
    }
    collect(isAdd){
        this.setState({
            collected:!this.state.collected
        })
       if(this.props.navigation.state.params.flag===FLAG_MODULE.flag_popular){
            if (isAdd){
                console.log('保存');
                this.projectCollectResponsitory.saveData(this.item.item.id.toString(),this.item)
            }else {
                this.projectCollectResponsitory.removeData(this.item.item.id.toString())
            }
        }
        if(this.props.navigation.state.params.flag===FLAG_MODULE.flag_trending){
            if (isAdd){
                this.projectCollectResponsitory.saveData(this.item.item.fullName,this.item)
            }else {
                this.projectCollectResponsitory.removeData(this.item.item.fullName)
            }
        }
    }
    onMyNavigationStateChange(navistate){
        this.setState({
            canGoBack:navistate.canGoBack,
        })
    }
    getRightImageButton() {
        return  <TouchableOpacity style={styles.rightButtonPadding}
                                 onPress={()=>{this.collect(!this.state.collected)}}>
            <Image source={require('../../res/image/ic_collect.png')}
                    style={this.state.collected?[styles.imageButton,{tintColor:'red'}]:styles.imageButton}/>
        </TouchableOpacity>
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                        this.back()
                    })}
                    rightButton={this.getRightImageButton()}
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

