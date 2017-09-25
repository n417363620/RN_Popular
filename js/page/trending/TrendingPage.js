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
import ScrollableTableView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view'
import NavigationBar from "../../common/NavigationBar";
import DataRequest, { FLAG_MODULE} from "../../util/DataRequest";
import TrendingItem from "../../common/TrendingItem";
import {TabNavigator} from "react-navigation";
import LanguageResponsitory, {FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import TimeSpan from '../../model/TimeSpan'
import Popover, {PopoverTouchable} from 'react-native-modal-popover'
import ArrayUtils from "../../util/ArrayUtils";
import ProjectCollectResponsitory,{FLAG_PROJECTTYPE} from "../../expand/ProjectCollectResponsitory";
import TrendingModel from "../../model/PreojectModel";
const URL='https://github.com/trending/'
var timeSpans=[new TimeSpan('今日','since=daily'),
              new TimeSpan('本周','since=weekly'),
              new TimeSpan('本月','since=monthly')]
export default class TrendingPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_language)

        this.state = {
            languages:[],
            visible:false,
            buttonRect:{},
            title:'趋势 今日▼',
            timeSpan:'since-daily'
        };
    }
    componentDidMount() {
        this.languageDB.fetchData()
            .then(result=>{
                if(result.length===0){
                    this.setState({
                        languages:[{name:'All',path:'All',"checked":true}]
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
            NavigationBar.Push(this,'WebViewPage',
                                                {data,
                                                 flag:FLAG_MODULE.flag_trending,
                                                   callback: (data)=>{
                                                       DeviceEventEmitter.emit('needFreshTrending',true); // 打印值为：'回调参数'
                                                   }})
        })
    }

    componentWillUnmount() {
        this.obsever.remove()
    }
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                visible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({visible: false});
    }
     renderItem() {
        var items=[]
        for (let i=0;i<timeSpans.length;i++){
            items.push(<TouchableOpacity
                onPress={()=>{
                    this.closePopover()
                    this.setState({
                        title:'趋势 ' + timeSpans[i].showText +'▼',
                        timeSpan:timeSpans[i].searchText
                    })
                }
                }>
                <Text style={{color:'white',marginVertical:4}} >{timeSpans[i].showText}</Text>
            </TouchableOpacity>)
        }
        return items
    }
    renderTitleView(){
        return <View>
            <TouchableOpacity ref={'button'} onPress={()=>{this.showPopover()}}>
                <Text
                    ellipsizeMode={'head'}
                    numberOfLines={1}
                    style={[styles.textButton,{textAlign:'center'}]}>{this.state.title}</Text>
            </TouchableOpacity>
            <Popover
                placement={'bottom'}
                fromRect={this.state.buttonRect}
                visible={this.state.visible}
                contentStyle={styles.popoverContent}
                arrowStyle={styles.popoverArrow}
                backgroundStyle={styles.popoverBackground}
                onClose={()=>{
                    this.closePopover()
                }}
            >
                {this.renderItem()}
            </Popover>
        </View>

    }
    //todo 底部按钮注册位置
    renderTabBar(array){
        var KEYS=[]
        for(let i=0;i<array.length;i++){
            if(!array[i].checked) continue
            KEYS.push(array[i].name)
        }
        function builderTabPage(timeSpan) {
            let Tabs=[]
            KEYS.forEach((value,key,array)=>{
                Tabs.push(<TrendingPageTab key={key} tabLabel={value} timeSpan={timeSpan} {...this.props}></TrendingPageTab>)
            })
            return Tabs
        }
        return <ScrollableTableView
            renderTabBar={()=>
                <ScrollableTabBar style={{height:40}} barStyle={{height:42}}/>
            }
            tabBarUnderlineStyle={{height:2,backgroundColor:'#d9d9d9'}}
            tabBarBackgroundColor={'#912CEE'}
            tabBarActiveTextColor={'mintcream'}
            tabBarInactiveTextColor={'white'}
            locked={true}
        >
            {builderTabPage(this.state.timeSpan)}
        </ScrollableTableView>
    }
    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    titleView={this.renderTitleView()}
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
        this.timeSpan=this.props.timeSpan
        this.state = {
            loading:true,
            collcetKeys:[],
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        };
        this.dataRequrest=new DataRequest(FLAG_MODULE.flag_trending);
        this.projectCollectResponsitory=new ProjectCollectResponsitory(FLAG_PROJECTTYPE.flag_trending)
    }
    updataState(Dic){
        if (!this) return
        this.setState(Dic)
    }
    getCollectKeys(){
        this.projectCollectResponsitory.fetchKeyData()
            .then(keys=>{
                if(keys){
                    this.updataState({collcetKeys:keys})
                }
                this.flushFavoriteState();
            }).catch(error=>{
            this.flushFavoriteState();
            console.log(error)
        })
    }
    /**
     * 跟新Project每一项收藏的状态
     */
    flushFavoriteState(){
        let projectModes=[];
        let items=this.items;
        for(let i=0;i<items.length;i++){
            projectModes.push(new TrendingModel(items[i],ArrayUtils.checkCollect(items[i],this.state.collcetKeys)))
        }
        this.updataState({
            loading:false,
            dataSource:this.state.dataSource.cloneWithRows(projectModes)
        })
    }
    componentDidMount() {
        this.tabLabel = this.props.tabLabel
        this.onLoad(this.timeSpan)
        this.observer=DeviceEventEmitter.addListener('needFreshTrending',(isfresh)=>{
            console.log('刷新页面');
            this.setState({
                loading:true
            })
            this.onLoad(this.tabLabel)
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.timeSpan!==this.props.timeSpan){
            console.log(nextProps.timeSpan)
            this.timeSpan=nextProps.timeSpan,
            this.setState({
                loading:true
            })
            this.onLoad(this.timeSpan)
        }
    }
    /**
     * 生成URL
     * @returns {XML}
     */
    genUrl(timeSpan){
        return URL+this.tabLabel+"?"+timeSpan;
    }
    onLoad(timeSpan){
        let url = this.genUrl(timeSpan)
        console.log(url)
        this.dataRequrest.getResponsitory(url)
            .then(result=>{
                //判断获取的result是否为空，在判断result的items是否为空，如果二者同时不为空设置值，在单独判断result是否为空
                this.items=result&&result.items?result.items:result?result:[]
                this.getCollectKeys()
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
                    this.items=result.items
                    this.getCollectKeys()
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
    collectResponsitory(data,isFavorite){
        data.isFavorite=isFavorite
        if (isFavorite) {
            this.projectCollectResponsitory.saveData(data.item.fullName.toString(),data)
        }
        if(!isFavorite) {
            this.projectCollectResponsitory.removeData(data.item.fullName.toString())
        }
    }
    _renderRow(data){
        console.log(data)
        return <TrendingItem
                            key={data.item.fullName}
                            data={data}
                            goDetail={(data)=>{
                                this.jumptoDetial(data)
                            }}
                            collect={(data,isFavorite)=>{
                                this.collectResponsitory(data,isFavorite)
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
                        this.onLoad(this.timeSpan)
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
    },
    popoverContent: {
        paddingVertical:10,
        paddingHorizontal:36,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
    },
    popoverArrow: {
        borderTopColor: 'rgba(0,0,0,0.5)',
    },
    popoverBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    textButton:{
        fontSize:18,
        color:'white'
    },
});

