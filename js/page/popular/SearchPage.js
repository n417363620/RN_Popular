/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-26 15:28
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import ViewUtil from "../../util/ViewUtil";
import NavigationBar from "../../common/NavigationBar";
import DataRequest, {FLAG_MODULE} from "../../util/DataRequest";
import {FLAG_PROJECTTYPE} from "../../expand/ProjectCollectResponsitory";
import PopularModel from '../../model/PreojectModel'
import ArrayUtils from "../../util/ArrayUtils";
import ProjectCollectResponsitory from "../../expand/ProjectCollectResponsitory";
import PopularItem from "../../common/PopularItem";
import LanguageResponsitory, {FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
const window=Dimensions.get('window')
export default class SearchPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:'',
            languages:[],
            rightImageButton:true,
            loading:false,
            collcetKeys:[],
            showBottom:false,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        };
        this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_key)
        this.dataRequrest=new DataRequest(FLAG_MODULE.flag_popular);
        this.projectCollectResponsitory=new ProjectCollectResponsitory(FLAG_PROJECTTYPE.flag_popular)
    }

    renderTitleView(){
        return (<View>
             <TextInput
                         value={this.state.value}
                         placeholder={'输入搜索的内容'}
                         placeholderTextColor={'white'}
                         underlineColorAndroid={'transparent'}
                         onChangeText={(text)=>{
                             if(text===null||text===''){this.setState({showBottom:false,rightImageButton:true})}
                             this.setState({value:text})}}
                         style={{width:200,color:'white',fontSize:15,borderWidth:0}}
             ></TextInput>
        </View>)
    }
    flushFavoriteState(){
        let projectModes=[];
        let items=this.items;
        for(let i=0;i<items.length;i++){
            projectModes.push(new PopularModel(items[i],ArrayUtils.checkCollect(items[i],this.state.collcetKeys)))
        }
        this.setState({
            loading:false,
            dataSource:this.state.dataSource.cloneWithRows(projectModes)
        })
    }
    getCollectKeys(){
        this.projectCollectResponsitory.fetchKeyData()
            .then(keys=>{
                if(keys){
                    this.setState({collcetKeys:keys})
                }
                this.flushFavoriteState();
            }).catch(error=>{
            this.flushFavoriteState();
            console.log(error)
        })
    }
    search(){
        this.setState({
            loading:true,
            rightImageButton:!this.state.rightImageButton
        })
        let url=URL+this.state.value+QUERY_STR
        this.dataRequrest.get(url)
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
        NavigationBar.Push(this,'WebViewPage',
            {        data,
                flag:FLAG_MODULE.flag_popular,
                callback: (data)=>{
                    this.setState({
                        loading:true
                    })
                    this.search()
                }})
    }
    collectResponsitory(data,isFavorite){
        data.isFavorite=isFavorite
        if (isFavorite) {
            this.projectCollectResponsitory.saveData(data.item.id.toString(),data)
        }
        if(!isFavorite) {
            this.projectCollectResponsitory.removeData(data.item.id.toString())
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
    addTag(){
        this.state.languages.push({path:this.state.value,name:this.state.value,checked:false})
        console.log(this.state.languages)
        this.languageDB.saveData(this.state.languages).then(result=>{
            this.setState({showBottom:false})
        }).catch(error=>{console.log('保存失败re')})

    }
    checkTag(key){
        this.languageDB.fetchData()
            .then(result=>{
                console.log(result)
                this.setState({
                    showBottom:true,
                    languages:result
                })
                for (let i=0;i<result.length;i++){
                    if (result[i].name===this.state.value){
                        this.setState({showBottom:false})
                        return
                    }
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }
    renderBottom(){
       return (
           this.state.showBottom?
               <View>
                   <View style={{height:40}}></View>
                   <TouchableOpacity onPress={()=>this.addTag()}
                                     style={{position:'absolute',bottom:0,left:0}}>
                       <View style={{flexDirection:'row',justifyContent:'center', flex:1,
                           alignItems:'center'}}>
                           <Text style={{textAlign:'center',color:'white',
                               fontSize:16,paddingVertical:8,
                               borderWidth:0.5,borderRadius:3,
                               borderColor:'white', backgroundColor:'#912CEE',
                               width:window.width,
                           }}>添加到标签</Text>
                       </View>
                   </TouchableOpacity>
               </View>
               :null
       )
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={ViewUtil.getLfetBackButton(()=>{NavigationBar.Pop(this)})}
                    titleView={this.renderTitleView()}
                    rightButton={this.state.rightImageButton?ViewUtil.getRightImageButton(require('../../../res/image/ic_search.png'),()=>{
                        this.checkTag(this.state.value)
                        this.search()
                    }):ViewUtil.getRightTextButton('取消',()=>{
                       this.setState({value:'',rightImageButton:!this.state.rightImageButton,showBottom:false})
                    })}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                <ActivityIndicator
                    animating={this.state.loading}
                    style={[styles.centering, {height: this.state.loading?80:0}]}
                    size="large"
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>this._renderRow(data)}
                 ></ListView>

                {this.renderBottom()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});

