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
import DataRequest from "../../util/DataRequest";
import FavorityItem from "../../common/FavorityItem";
import FavoritePage from "../favorite/FavoritePage";
import LanguageResponsitory,{FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
const KEYS=['Android','IOS','React-Native']
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'

export default class PopularPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_key)
        this.state = {
            languages:[]
        };
    }
    componentDidMount() {
        this.languageDB.fetchData()
            .then(result=>{
                this.setState({
                    languages:result
                })
                console.log(result)
            })
            .catch(error=>{
                console.log(error)
            })

    }
    //todo 底部按钮注册位置
    renderTabBar(array){
        var KEYS=[]
        for(let i=0;i<array.length;i++){
            if(!array[i].checked) continue
            KEYS.push(array[i].name)
        }
        function builderTabPage() {
            let RouteConfigs={}
            KEYS.forEach((value,key,array)=>{
                let item = {
                    screen: PopularPageTab,
                    path: '/',
                    navigationOptions: {
                        tabBarLabel: value,
                    }
                }

                RouteConfigs[value] = item;
            })

            return RouteConfigs
        }
        let TabNavigatorConfig={
            tabBarPosition: 'top', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
            swipeEnabled: true, // 是否允许在标签之间进行滑动。
            animationEnabled: false, // 是否在更改标签时显示动画。
            lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
            // initialRouteName: 'MineTab', // 设置默认的页面组件
            backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
            tabBarOptions: {
                activeTintColor: 'mintcream', // label和icon的前景色 活跃状态下（选中）。
                inactiveTintColor: 'white', // label和icon的前景色 不活跃状态下(未选中)。
                style: {height: 40, backgroundColor: '#912CEE'},//整个bar的样式
                indicatorStyle: {backgroundColor: '#ddd', height: 2},
                showLabel: true, // 是否显示label，默认开启。
                showIcon: false,
                scrollEnabled:true
            }
        };
        const PopularPageTabs = TabNavigator(builderTabPage(),TabNavigatorConfig);
       return <PopularPageTabs></PopularPageTabs>
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
                    {this.state.languages.length==0?null:this.renderTabBar(this.state.languages)}
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
        this.tabLabel = this.props.navigation.state.routeName
        this.onLoad(this.tabLabel)
     
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
                        this.onLoad(this.tabLabel)
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
