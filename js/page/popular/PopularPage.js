/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 16:49
 */

import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ListView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';
import ScrollableTableView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view' 
import NavigationBar from "../../common/NavigationBar";
import DataRequest, {FLAG_MODULE} from "../../util/DataRequest";
import PopularItem from "../../common/PopularItem";
import LanguageResponsitory,{FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import ViewUtil from "../../util/ViewUtil";
import PopularModel from "../../model/PreojectModel";
import ProjectCollectResponsitory, {FLAG_PROJECTTYPE} from "../../expand/ProjectCollectResponsitory";
import ArrayUtils from "../../util/ArrayUtils";
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
            languages:[],
            isVisibel:false
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
            NavigationBar.Push(this,'WebViewPage',
                {        data,
                    flag:FLAG_MODULE.flag_popular,
                    callback: (data)=>{
                       DeviceEventEmitter.emit('needFreshPopular',true); // 打印值为：'回调参数'
                    }})
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
            let Tabs=[]
            KEYS.forEach((value,key,array)=>{
               Tabs.push(<PopularPageTab tabLabel={value}></PopularPageTab>)
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
                 {builderTabPage()}
             </ScrollableTableView>
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
            collcetKeys:[],
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
        this.dataRequrest=new DataRequest(FLAG_MODULE.flag_popular);
        this.projectCollectResponsitory=new ProjectCollectResponsitory(FLAG_PROJECTTYPE.flag_popular)
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
    componentDidMount() {
        this.tabLabel = this.props.tabLabel
        this.onLoad(this.tabLabel)
        this.observer=DeviceEventEmitter.addListener('needFreshPopular',(isfresh)=>{
            console.log('刷新页面');
            this.setState({
                loading:true
            })
            this.onLoad(this.tabLabel)
        })
    }

     componentWillUnmount() {
         this.observer.remove()
     }
     /**
      * 跟新Project每一项收藏的状态
      */
     flushFavoriteState(){
        let projectModes=[];
        let items=this.items;
        for(let i=0;i<items.length;i++){
            projectModes.push(new PopularModel(items[i],ArrayUtils.checkCollect(items[i],this.state.collcetKeys)))
        }
        this.updataState({
            loading:false,
            dataSource:this.state.dataSource.cloneWithRows(projectModes)
        })
     }

    /**
     * 生成URL
     * @returns {XML}
     */
    genUrl(key){
        return URL+key+QUERY_STR;
    }
    onLoad(text){
        let url = this.genUrl(text)
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
                }
            })
            .then(result=>{
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
        if (isFavorite) {
            this.projectCollectResponsitory.saveData(data.id.toString(),data)
        }
         if(!isFavorite) {
             this.projectCollectResponsitory.removeData(data.id.toString())
         }

     }
    _renderRow(data){
        return <PopularItem
                            key={data.item.id}
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
