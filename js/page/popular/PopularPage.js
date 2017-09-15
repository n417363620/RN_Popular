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
                   <ScrollableTabView
                      tabBarBackgroundColor={'#912CEE'}
                      tabBarActiveTextColor={'mintcream'}
                      tabBarInactiveTextColor={'white'}
                      tabBarUnderlineStyle={{backgroundColor:'#ddd',height:2}}
                   >
                       <PopularPageTab tabLabel={'REACT'}>REACT</PopularPageTab>
                       <PopularPageTab tabLabel={'IOS'}>IOS</PopularPageTab>
                       <PopularPageTab tabLabel={'ANDROID'}>ANDROID</PopularPageTab>
                       <PopularPageTab tabLabel={'JAVA'}>JAVA</PopularPageTab>

                   </ScrollableTabView>
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

