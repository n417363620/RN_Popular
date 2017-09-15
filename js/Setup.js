/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 21:58
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';
import WelcomePage from './WelcomePage'
import HomePage from "./HomePage";
import * as CardStackStyleInterpolator from "react-navigation";
const RouteConfigs = {
    Welcome: {
        screen: WelcomePage,
        navigationOptions: ({navigation}) => ({
            title: '欢迎页',
        }),
    },
    Home: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({
            title: '主页',
        }),
    },
};
const StackNavigatorConfig = {
    initialRouteName: 'Welcome',
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '标题',
        headerTitleStyle: {fontSize: 18, color: '#666666'},
        headerStyle: {height: 48, backgroundColor: '#fff'},
        header:null,
    },
    paths: './WelcomePage',
    mode: 'card',
    headerMode: 'screen',
    cardStyle: {backgroundColor: "#ffffff"},
    transitionConfig: (() => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })),
    onTransitionStart: (() => {
        console.log('页面跳转动画开始');
    }),
    onTransitionEnd: (() => {
        console.log('页面跳转动画结束');
    }),
};
const Navigator = StackNavigator(RouteConfigs, StackNavigatorConfig);
function setup() {
    class Root extends Component{
        render(){
            return(
            <Navigator/>
            )
        }
    }
    return <Root/>
}
module.exports=setup;

