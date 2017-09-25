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
    ListView,
    StyleSheet,
    Button,
    DeviceEventEmitter,
    TouchableOpacity, RefreshControl
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import ScrollableTableView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view'
import {FLAG_PROJECTTYPE} from "../../expand/ProjectCollectResponsitory";
import PopularItem from "../../common/PopularItem";
import TrendingItem from "../../common/TrendingItem";
import ProjectCollectResponsitory from "../../expand/ProjectCollectResponsitory";
import ProjectModel from "../../model/PreojectModel";
import {FLAG_MODULE} from "../../util/DataRequest";
export default class FavoritePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
          loading:true
        };
    }

    componentDidMount() {
        this.obsever=DeviceEventEmitter.addListener('jumptodetail',(data)=>{
            console.log(data)
            if (data[0]===FLAG_PROJECTTYPE.flag_popular){
                NavigationBar.Push(this,'WebViewPage',
                    {   data:data[1],
                        flag:FLAG_MODULE.flag_popular,
                        callback: (data)=>{
                            DeviceEventEmitter.emit('needFreshPopular',true); // 打印值为：'回调参数'
                        }})
            }
            if (data[0]===FLAG_PROJECTTYPE.flag_trending){
                NavigationBar.Push(this,'WebViewPage',
                    {   data:data[1],
                        flag:FLAG_MODULE.flag_trending,
                        callback: (data)=>{
                            DeviceEventEmitter.emit('needFreshTrending',true); // 打印值为：'回调参数'
                        }})
            }
        })
    }

    componentWillUnmount() {
        this.obsever.remove()
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'收藏'}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                <ScrollableTableView
                    renderTabBar={()=>
                        <ScrollableTabBar style={{height:40}} barStyle={{height:42}}/>
                    }
                    tabBarUnderlineStyle={{height:2,backgroundColor:'#d9d9d9'}}
                    tabBarBackgroundColor={'#912CEE'}
                    tabBarActiveTextColor={'mintcream'}
                    tabBarInactiveTextColor={'white'}

                >
                 <FavoriteTab tabLabel={'最热'} flag={FLAG_PROJECTTYPE.flag_popular}></FavoriteTab>
                 <FavoriteTab tabLabel={'趋势'} flag={FLAG_PROJECTTYPE.flag_trending}></FavoriteTab>
                </ScrollableTableView>
            </View>
        );
    }
}
class FavoriteTab extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
          this.flag=this.props.flag
          this.projectDataDao=new ProjectCollectResponsitory(this.flag)
          this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.state = {
              loading:true,
              dataSource: this.ds,
          };
      }
    updataState(Dic){
        if (!this) return
        this.setState(Dic)
    }
    componentDidMount() {
         this.onLoad()
         this.observer=DeviceEventEmitter.addListener('needFreshPopular',(isfresh)=>{
            console.log('刷新页面');
            this.setState({
                loading:true
            })
            this.onLoad()
        })
        this.observer1=DeviceEventEmitter.addListener('needFreshTrending',(isfresh)=>{
            console.log('刷新页面');
            this.setState({
                loading:true
            })
            this.onLoad()
        })
    }

    componentWillUnmount() {
        this.observer.remove();
        this.observer1.remove();
    }
    onLoad(){
        var  items=[]
       this.projectDataDao.fetchAllData().then(result=>{
         for(let i=0;i<result.length;i++){
             items.push(result[i])
         }
           console.log(items)
           this.updataState({
               loading:false,
               dataSource:this.state.dataSource.cloneWithRows(items)
           })
       }).catch(error=>{
           console.log(error)
           return
       })
    }
    goDetail(data){
        let obj=[this.flag,data]
        DeviceEventEmitter.emit('jumptodetail',obj)
    }
    collect(data,isFavorite){
        data.isFavorite=isFavorite
        if (isFavorite) {
            this.projectDataDao.saveData(data.item.id.toString(),data)
        }
        if(!isFavorite) {
            this.projectDataDao.removeData(data.item.id.toString())
        }
    }
    _renderRow(data){
       if (this.flag===FLAG_PROJECTTYPE.flag_popular){
            console.log('加载Popular')
            return  <PopularItem data={data} key={data.item.id}
                                    goDetail={(data)=>{this.goDetail(data)}}
                                    collect={(data,isFavorite)=>{this.collect(data,isFavorite)}} />
        }
        if (this.flag===FLAG_PROJECTTYPE.flag_trending){
            console.log('加载Trending')
            return <TrendingItem data={data} key={data.item.fullName}
                                   goDetail={(data)=>{this.goDetail(data)}}
                                   collect={(data,isFavorite)=>{this.collect(data,isFavorite)}} />
        }
    }
    render(){
          return <View style={{flex:1}}>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) =>this._renderRow(rowData)}
                  enableEmptySections = {true}
                  refreshControl={
                      <RefreshControl
                          progressBackgroundColor={'#912CEE'}
                          colors={['white']}
                          tintColor={'#912CEE'}
                          title={'loading....'}
                          titleColor={'#912CEE'}
                          refreshing={this.state.loading}
                          onRefresh={()=>{
                              this.onLoad()
                          }
                          }
                      />
                  } />
          </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

