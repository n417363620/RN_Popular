/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 16:49
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ListView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    RefreshControl
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';
import NavigationBar from "../../common/NavigationBar";
import ScrollableTabBar from 'react-native-scrollable-tab-view'
import DataRequest from "../../util/DataRequest";
import FavorityItem from "../../common/FavorityItem";
import FavoritePage from "../favorite/FavoritePage";


const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
var ScrollableTabView = require('react-native-scrollable-tab-view');
export default class PopularPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render() {

        return (
            <View style={{flex:1}}>
                <NavigationBar
                title={'最热'}
                statusBar={{
                    backgroundColor:"#912CEE",
                    barStyle:"light-content",
                    hidden:false
                }}
                />
                <View style={styles.container}>
                    <PopularPageTabs></PopularPageTabs>
                </View>
            </View>
        );
    }
}
 class PopularPageTab extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading:true,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
        this.dataRequrest=new DataRequest();
    }

    componentDidMount() {
       this.onLoad(this.props.tabLabel)
    }
     componentWillUnmount() {

     }
    /**
     * 生成URL
     * @returns {XML}
     */
    genUrl(key){
        return URL+key+QUERY_STR;
    }
    onLoad(text){

        this.dataRequrest.get(this.genUrl(text))
            .then(result=>{
                console.log(result)
                this.setState({
                    loading:false,
                    dataSource:this.state.dataSource.cloneWithRows(result.items)
                })
            })
            .catch(error=>{
                console.log(error)
            })

    }

    _renderRow(data){
        return <FavorityItem data={data}/>
    }
    render(){
        return <ListView
            dataSource={this.state.dataSource}
            renderRow={(data)=>this._renderRow(data)}
            refreshControl={
                <RefreshControl
                    progressBackgroundColor={'#912CEE'}
                    colors={['white']}
                    tintColor={'#912CEE'}
                    title={'loading....'}
                    titleColor={'#912CEE'}
                    refreshing={this.state.loading}
                    onRefresh={()=>{
                        this.onLoad(this.props.tabLabel)
                    }
                    }
                />
            }
        ></ListView>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F3F3F3'
    }
});
//todo 底部按钮注册位置
const PopularPageTabs = TabNavigator(
    {
        PopularTab: {
            screen: PopularPageTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '最热',
            },
        },
        TrendingTab: {
            screen: PopularPageTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '趋势',
            },
        },
        FavoriteTab: {
            screen: PopularPageTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '收藏',
            },
        },
        MineTab: {
            screen: PopularPageTab,
            path: '/',
            navigationOptions: {
                tabBarLabel: '我的',
            },
        },
    },
    {
        tabBarPosition: 'top', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
        swipeEnabled: true, // 是否允许在标签之间进行滑动。
        animationEnabled: false, // 是否在更改标签时显示动画。
        lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
        // initialRouteName: 'MineTab', // 设置默认的页面组件
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            // iOS属性
            // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
            activeTintColor: 'mintcream', // label和icon的前景色 活跃状态下（选中）。
            inactiveTintColor: 'white', // label和icon的前景色 不活跃状态下(未选中)。
            style:{height:40,backgroundColor:'#912CEE'},//整个bar的样式
            indicatorStyle:{backgroundColor:'#ddd',height:2},
            //activeBackgroundColor:'white', //label和icon的背景色 活跃状态下（选中） 。
            //  inactiveBackgroundColor:'white', // label和icon的背景色 不活跃状态下（未选中）。
            showLabel: true, // 是否显示label，默认开启。
            // style:{}, // tabbar的样式。
            // labelStyle:{}, //label的样式。
            // 安卓属性
            // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
            // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
            showIcon: false, // 是否显示图标，默认关闭。
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

