/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-18 19:34
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
import {NavigationActions} from 'react-navigation'
import LanguageResponsitory,{FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import ArrayUtils from "../../util/ArrayUtils";
import SortableListView from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import ViewUtil from '../../util/ViewUtil'
export default class KeySortPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params.flag)
        this.flag=this.props.navigation.state.params.flag
        this.dataArray=[];//原始的所有数据
        this.checkedOringinalArray=[];//原始的选中的数据
        if(this.flag===FLAG_LANGUAGE.flag_key){
            this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_key)
        }
        if(this.flag===FLAG_LANGUAGE.flag_language){
            this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_language)
        }
        this.state = {
           checkedArray:[],//排序后的选中数据

        };
    }
    componentDidMount() {
        this.languageDB.fetchData()
            .then(result=>{
            this.getCheckedKeys(result)
        })
            .catch(error=>{
                console.log(error)
            })
    }
    componentWillUnmount() {
        this.setState({
            checkedArray:[]
        })
    }
    getCheckedKeys(data){
        this.dataArray=data;
        let checkedArray=[];
        data.forEach((value,key,array)=>{
           if (value.checked) checkedArray.push(value);
        })
        this.setState({
            checkedArray:checkedArray
        })
        this.checkedOringinalArray=ArrayUtils.cloneArray(checkedArray)
    }
    reset(){
        this.setState({
            checkedArray:[]//解决排序控件在离开界面时报错的问题
        })
        const  reset1Action=NavigationActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Root'}),
            ]
        })
        this.props.navigation.dispatch(reset1Action)
    }
    back(){
        if (ArrayUtils.isEqual(this.state.checkedArray,this.checkedOringinalArray)){
            this.props.navigation.goBack();
            return
        }else {
            Alert.alert(
                '提示',
                '是否保存修改？',
                [
                    {text: '确定', onPress: () => {this.save(true)}},
                    {text: '取消', onPress: () => {this.props.navigation.goBack()}},
                ]
            ) 
        }
    }
    save(sorted){
        if (!sorted&&ArrayUtils.isEqual(this.state.checkedArray,this.checkedOringinalArray)){
            this.props.navigation.goBack()
            return
        }
        let finalArray=ArrayUtils.cloneArray(this.dataArray)
        for(let i=0;i<this.state.checkedArray.length;i++){
            let item=this.checkedOringinalArray[i] //依次获取排序后的数据去原始数据中挨个替换原始标记数据
            let index=this.dataArray.indexOf(item)//原始选中数据元素在原始数据的哪一个位置
            finalArray.splice(index,1,this.state.checkedArray[i])
        }
        this.languageDB.saveData(finalArray)
        this.reset()
    };
    render() {
        let title=''
        if(this.flag===FLAG_LANGUAGE.flag_key){
           title='标签排序'
        }
        if(this.flag===FLAG_LANGUAGE.flag_language){
            title='语言排序'
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                        this.back()
                    })}
                    rightButton={ViewUtil.getRightTextButton('保存',()=>{
                        this.save()
                    })}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                {this.state.checkedArray.length===0?null:<SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <RowComponent data={row} />}
                >
                </SortableListView>}
            </View>
        );
    }
}
class RowComponent extends React.Component {
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#f8f8f8'}
                activeOpacity={0.5}
                style={{
                    padding: 12,
                    backgroundColor: '#F8F8F8',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}
            >
                <View style={{flexDirection:'row',alignItems:'center',paddingVertical:4,paddingHorizontal:10}}>
                    <Image style={{height:20,width:20}}
                           resizeMode={'cover'}
                           source={require('../../../res/image/ic_sort.png')}/>
                    <Text style={{color:'#4c4c4c',flex:4,fontSize:15,marginLeft:10}}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

