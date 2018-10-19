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
        console.log(this.props.navigation.state.params)
        this.flag=this.props.navigation.state.params.flag
        if (this.flag===FLAG_LANGUAGE.flag_key){
            this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_key)
        }
        if (this.flag===FLAG_LANGUAGE.flag_language) {
            this.languageDB=new LanguageResponsitory(FLAG_LANGUAGE.flag_language)
        }
        this.changeValues=[];
        this.state = {
            keys:[],
            removeKeys:false
        };
    }
    componentDidMount() {
        this.setState({
            removeKeys:this.props.navigation.state.params.removeKeys
        })
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
          if(this.changeValues.length===0){
              this.props.navigation.goBack()
             return
          }
          if(this.state.removeKeys===true){
              let finalArray=ArrayUtils.cloneArray(this.state.keys)
              for(let i=0;i<this.changeValues.length;i++){
                  ArrayUtils.removeItem(finalArray,this.changeValues[i])
              }
              console.log(finalArray)
             this.languageDB.saveData(finalArray)
          }else {
              this.languageDB.saveData(this.state.keys)
          }
          this.reset()
    }
    reset(){
         /* const  reset1Action=NavigationActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'Mine'})
            ]
        })
        this.props.navigation.dispatch(reset1Action)*/
       this.props.navigation.navigate('TransitionPage',{flag_Tab:this.flag})
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
                <View style={styles.item} key={i}>
                    {this.renderCheckBox(this.state.keys[i],i)}
                    {i+1<len?  this.renderCheckBox(this.state.keys[i+1],i+1):null}
                 </View>
            )
        }
         return views
    }
    oncheck(data){
        if(!this.state.removeKeys===true){
            data.checked=!data.checked
        }
       ArrayUtils.updataArray(this.changeValues,data)
        console.log(this.changeValues)
    }
    renderCheckBox(data,key){
        return (<CheckBox key={key}
            style={styles.itemText}
            leftText={data.name}
            isChecked={this.state.removeKeys===true?false:data.checked}
            checkedImage={<Image style={styles.itemImag} source={require('../../../res/image/ic_checked.png')}/>}
            unCheckedImage={<Image style={styles.itemImag} source={require('../../../res/image/ic_unchecked.png')}/>}
            onClick={()=>{
                this.oncheck(data)
             }
            }
          />)
    }
    render() {
        let rightButtonText
        let title
        if (this.flag===FLAG_LANGUAGE.flag_key){
            rightButtonText=this.state.removeKeys===true?'移除':'保存'
            title=this.state.removeKeys===true?'移除标签':'自定义标签'
        }
        if (this.flag===FLAG_LANGUAGE.flag_language){
             rightButtonText=this.state.removeKeys===true?'移除':'保存'
             title=this.state.removeKeys===true?'移除语言':'自定义语言'
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                       this.back()
                    })}
                    rightButton={ViewUtil.getRightTextButton(rightButtonText,()=>{
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
        borderColor:'#ddd',
        padding:10,
        flex:1,
        borderBottomWidth:0.5,
    },
    itemImag:{
        height:18,
        width:18,
        tintColor:"#912CEE"
    }

});

