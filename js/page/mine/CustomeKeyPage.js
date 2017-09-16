/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-15 11:38
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-check-box'
import {NavigationActions} from 'react-navigation'
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import LanguageResponsitory,{FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import ArrayUtils from "../../util/ArrayUtils";
export default class CustomeKeyPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_key)
        this.changeValues=[];
        this.state = {
            keys:[]
        };
    }
    componentDidMount() {
        this.languageDB.fetchData()
            .then((result)=>{
             this.setState({
                 keys:result
             })
          })
            .catch((error)=>{
              console.log(error)
            })
    }
    save(){
          console.log(this.state.keys)
          if(this.changeValues.length===0){
              this.props.navigation.goBack()
             return
          }
          this.languageDB.saveData(this.state.keys)
         this.reset()
    }
    reset(){
        const  reset1Action=NavigationActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Root'})
            ]
        })
        this.props.navigation.dispatch(reset1Action)
    }
    back(){
        if (this.changeValues.length===0){
            this.props.navigation.goBack()
            return
        }
        Alert.alert(
            '提示',
            '是否保存修改？',
            [
                {text: '确定', onPress: () => {this.save()}},
                {text: '取消', onPress: () => {this.props.navigation.goBack()}},
            ]
        )
       
    }
    renderItemView(){
        if(!this.state.keys||this.state.keys.length===0)return null
        let len=this.state.keys.length
        let views=[];
        for(let i=0;i<len;i+=2){
            views.push(
                <View style={styles.item}>
                    {this.renderCheckBox(this.state.keys[i],i)}
                    {i+1<len?  this.renderCheckBox(this.state.keys[i+1],i+1):null}
                 </View>
            )
        }
         return views
    }
    oncheck(data){
        data.checked=!data.checked
       ArrayUtils.updataArray(this.changeValues,data)
    }
    renderCheckBox(data,key){

        return (<CheckBox key={key}
            style={styles.itemText}
            leftText={data.name}
            isChecked={data.checked}
            checkedImage={<Image style={styles.itemImag} source={require('../../../res/image/ic_checked.png')}/>}
            unCheckedImage={<Image style={styles.itemImag} source={require('../../../res/image/ic_unchecked.png')}/>}
            onClick={()=>{
                this.oncheck(data)
             }
            }
          />)
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'标签页'}
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
                <ScrollView>
                    {this.renderItemView()}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item:{
        flexDirection:'row'
    },
    itemText:{
        backgroundColor:'white',
        padding:10,
        flex:1,
        borderBottomWidth:0.5,
        borderColor:'#ddd'
    },
    itemImag:{
        height:18,
        width:18,
        tintColor:"#912CEE"
    }

});

