/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 16:54
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    TouchableOpacity,
    DeviceEventEmitter, RefreshControl
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import DataRequest, {FLAG_MODULE} from "../../util/DataRequest";
import TrendingItem from "../../common/TrendingItem";
import {TabNavigator} from "react-navigation";
import LanguageResponsitory, {FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
const URL='https://github.com/trending/'

export default class TrendingPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_language)
        this.state = {
            languages:[]
        };
    }
    componentDidMount() {
        this.languageDB.fetchData()
            .then(result=>{
                if(result.length===0){
                    this.setState({
                        languages:{name:'All',path:'All',"checked":true}
                    })
                }else {
                    this.setState({
                        languages:result
                    })
                }
                console.log(result)
            })
            .catch(error=>{
                console.log(error)
            })
        this.obsever=DeviceEventEmitter.addListener('jumptodetail',(data)=>{
            NavigationBar.Push(this,'WebViewPage',data)
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
                    screen: TrendingPageTab,
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
        const TrendingPageTabs = TabNavigator(builderTabPage(),TabNavigatorConfig);
        return <TrendingPageTabs/>
    }
    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'趋势'}
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
class TrendingPageTab extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loading:true,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
        this.dataRequrest=new DataRequest(FLAG_MODULE.flag_trending);
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
        return URL+key;
    }
    onLoad(text){
        let url = this.genUrl(text)
        this.dataRequrest.getResponsitory(url)
            .then(result=>{
                //判断获取的result是否为空，在判断result的items是否为空，如果二者同时不为空设置值，在单独判断result是否为空
                let items=result&&result.items?result.items:result?result:[]
                this.setState({
                    loading:false,
                    dataSource:this.state.dataSource.cloneWithRows(items)
                })
                //判断result是否为空，result是否有update_data字段，unpdate_date是否过期
                if(result&&result.update_data&&this.dataRequrest.checkDataValid(result.update_data)===false){
                    //如果过期则重新获取网络数据，继续Promise的流程执行.thern
                    this.setState({
                        loading:true
                    })
                    return this.dataRequrest.get(url)
                }else {
                }
            })
            .then(result=>{
                this.setState({
                    loading:false,
                })
                if (result!=null&&result.items!=null&&result.items.length!==0){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.items)
                    })
                }else return
            })
            .catch(error=>{
                console.log(error)
            })
    }
    jumptoDetial(data){
        DeviceEventEmitter.emit('jumptodetail',data)
        //该界面注册的子页面无法关联的app根路由的navigation中，所以跳转页面必须用父页面订阅事件来进行跳转
        // this.props.navigation.navigate('Android')
    }
    collectResponsitory(data){
        DeviceEventEmitter.emit('toast','收藏')
    }
    _renderRow(data){
        return <TrendingItem data={data}
                            goDetail={(data)=>{
                                this.jumptoDetial(data)
                            }}
                            collect={(data)=>{
                                this.collectResponsitory(data)
                            }
                            }
        />
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
    }
});

