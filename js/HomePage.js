/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
/*import TabNavigator from 'react-native-tab-navigator'*/
import PopularPage from "./page/popular/PopularPage";
import MinePage from "./page/mine/MinePage";
import TrendingPage from "./page/trending/TrendingPage";
import FavoritePage from "./page/favorite/FavoritePage";
import CustomeKeyPage from "./page/mine/CustomeKeyPage";
import KeySortPage from "./page/mine/KeySortPage";
import WebViewPage from "./common/WebViewPage";
import TestStacksInTabs from "./page/favorite/TestStacksInTabs";
import * as CardStackStyleInterpolator from "react-navigation";
import TransitionPage from "./common/TransitionPage";
import IntroducePage from "./page/mine/IntroducePage";
import AboutAuthor from "./page/mine/AboutAuthor";
//界面注册位置
/// todo: ////////流行模块下的界面///////////////////////////////////////////////////
/**
 * 注册流行界面（起始页）
 * @param navigation 传递的navigation
 * @constructor
 */
const PopularScreen = ({ navigation }) => (
    <PopularPage  navigation={navigation} />
);

const PopularTab = StackNavigator({
    Popular: {
        screen: PopularScreen,
        path: './page/popular/PopularPage',
        navigationOptions: {
            title: 'Welcome',
            header:null,
        },
    },
});
// todo: ////////趋势模块下的界面///////////////////////////////////////////////////
/**
 * 注册趋势界面（起始页！！！！）
 * @param navigation 传递的navigation
 * @constructor
 */
const TrendingScreen = ({ navigation }) => (
    <TrendingPage  navigation={navigation} />
);

const TrendingTab = StackNavigator({
    Trending: {
        screen: TrendingScreen,
        path: './page/trending/TrendingPage',
        navigationOptions: {
            title: 'Welcome',
            header:null,
        },
    },
});
// todo: ////////收藏模块下的界面///////////////////////////////////////////////////
/**
 * 注册收藏界面（起始页！！！！）
 * @param navigation 传递的navigation
 * @constructor
 */
const FavorityScreen = ({ navigation }) => (
    <FavoritePage  navigation={navigation} />
);
const FavoriteTab = StackNavigator({
    Favorite: {
        screen: FavorityScreen,
        path: './page/favorite/FavoritePage',
        navigationOptions: {
            title: 'Welcome',
            header:null,
        },
    },
});
// todo: ////////我的模块下的界面///////////////////////////////////////////////////
/**
 * 注册我的界面(起始页！！！！)
 * @param navigation 传递的navigation
 * @constructor
 */
const MineScreen = ({ navigation }) => (
    <MinePage  navigation={navigation} />
);
/**
 * 我的模块的标签页
 * @param navigation 传递的navigation
 * @constructor
 */
const CustomerKeyScreen = ({ navigation }) => (
    <CustomeKeyPage  navigation={navigation} />
);
/**
 * 我的模块的标签排序页
 * @param navigation 传递的navigation
 * @constructor
 */
const KeySortScreen = ({ navigation }) => (
    <KeySortPage  navigation={navigation} />
);
/**
 * 项目介绍页面
 */
const IntroduceScreen = ({ navigation }) => (
    <IntroducePage  navigation={navigation} />
);
/**
 *作者 介绍页面
 */
const AboutAuthorScreen = ({ navigation }) => (
    <AboutAuthor  navigation={navigation} />
);
const MineTab = StackNavigator({
    Mine: {
        screen: MineScreen,
        path: './page/mine/MinePage',
        navigationOptions: {
            title: 'Welcome',
            header:null,
        },
    },
    CustomeKeyPage: {
        screen: CustomerKeyScreen,
        path: './page/mine/CustomeKeyPage',
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name}'s CustomeKeyPage!`,
            header:null,
            tabBarVisible:false
        }),
    },
    KeySortPage: {
        screen: KeySortScreen,
        navigationOptions: {
            title: 'Notifications',
            header:null,
            tabBarVisible:false
        },
    },
    IntroducePage: {
        screen: IntroduceScreen,
        navigationOptions: {
            title: 'Notifications',
            header:null,
            tabBarVisible:false
        },
    },
    AboutAuthorPage: {
        screen: AboutAuthorScreen,
        navigationOptions: {
            title: 'Notifications',
            header: null,
            tabBarVisible: false
        },
    }
});


/**
 * 公共的浏览器页
 * @param navigation
 * @constructor
 */
const WebViewScreen = ({ navigation }) => (
    <WebViewPage  navigation={navigation} />
);
/**
 * 跳转过渡页
 * @param navigation
 * @constructor
 */
const TransitionScreen = ({ navigation }) => (
    <TransitionPage  navigation={navigation} />
);



//todo 底部按钮注册位置
const StacksInTabs = TabNavigator(
    {
        PopularTab: {
            screen: PopularTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '最热',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image style={[styles.tb_OffImage,{tintColor:tintColor}]} source={require('../res/image/ic_popular.png')} />
                ),
            },
        },
        TrendingTab: {
            screen: TrendingTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '趋势',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image style={[styles.tb_OffImage,{tintColor:tintColor}]} source={require('../res/image/ic_trending.png')} />
                ),
            },
        },
        FavoriteTab: {
            screen: FavoriteTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '收藏',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image style={[styles.tb_OffImage,{tintColor:tintColor}]} source={require('../res/image/ic_favorite.png')} />
                ),
            },
        },
        MineTab: {
            screen: MineTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Image style={[styles.tb_OffImage,{tintColor:tintColor}]} source={require('../res/image/ic_mine.png')} />
                ),
            },
        },
    },
    {
        tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
        swipeEnabled: false, // 是否允许在标签之间进行滑动。
        animationEnabled: false, // 是否在更改标签时显示动画。
        lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
        initialRouteName: 'MineTab', // 设置默认的页面组件
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            // iOS属性
            // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
            activeTintColor: '#912CEE', // label和icon的前景色 活跃状态下（选中）。
            inactiveTintColor: 'gray', // label和icon的前景色 不活跃状态下(未选中)。
            style:{height:60,backgroundColor:'white',borderWidth:1,borderColor:'#ddd'},//整个bar的样式
            indicatorStyle:{height:0},
            //activeBackgroundColor:'white', //label和icon的背景色 活跃状态下（选中） 。
            //  inactiveBackgroundColor:'white', // label和icon的背景色 不活跃状态下（未选中）。
            showLabel: true, // 是否显示label，默认开启。
            // style:{}, // tabbar的样式。
            // labelStyle:{}, //label的样式。
            // 安卓属性
            // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
            // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
            showIcon: true, // 是否显示图标，默认关闭。
            // showLabel:true, //是否显示label，默认开启。
            // style:{}, // tabbar的样式。
            // labelStyle:{}, // label的样式。
            //  upperCaseLabel: false, // 是否使标签大写，默认为true。
            // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
            // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
            // scrollEnabled:false, // 是否启用可滚动选项卡。
            // tabStyle:{}, // tab的样式。
            // indicatorStyle:{}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
            // labelStyle:{}, // label的样式。
            // iconStyle:{}, // 图标的样式。
        }}
);
const StacksOverTabs = StackNavigator({
    Root: {
        screen: StacksInTabs,
    },
    //公共界面不注入单独模块中
    WebViewPage:{
        screen:WebViewScreen,
        navigationOptions:{
            header:null,
            title:'WebView'
        }
    },
    TransitionPage:{
      screen:TransitionScreen,
      navigationOptions:{
          header:null
      }
    },
    Test:{
        screen:TestStacksInTabs,
        navigationOptions:{
            header:null
        }
    },
},{
    initialRouteName: 'Root',
    initialRouteParams: {initPara: '初始页面参数'},
    navigationOptions: {
        title: '标题',
        headerTitleStyle: {fontSize: 18, color: 'white'},
        headerStyle: {height: 48, backgroundColor: '#912CEE'},
        header:null,
    },
    paths: './page/favorite/TestStackInTabs',
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
});

export default StacksOverTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tb_OnImage:{
        height:24,
        width:24,
        tintColor:'blue'
    },
    tb_OffImage:{
        height:24,
        width:24,

    },
});


