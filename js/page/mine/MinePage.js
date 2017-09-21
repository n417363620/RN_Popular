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
    TouchableOpacity,
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import CustomeKeyPage from "./CustomeKeyPage";
import {FLAG_MODULE} from "../../util/DataRequest";
import {FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import {NavigationActions} from "react-navigation";



export default class MinePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params)
        this.state = {

        };
    }
    componentDidMount() {
      /*this.timer =  setTimeout(()=>{
          if (this.flag_Tab===FLAG_PAGETAB.flag_popular){
              this.props.navigation.navigate('PopularTab')
          }
          if (this.flag_Tab===FLAG_PAGETAB.flag_trending){
              this.props.navigation.navigate('TrendingTab')
          }else {
              this.props.navigation.navigate('PopularTab')
          }
      },5000)*/
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                <Text onPress={()=>{
                    this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_key})
                }}>自定义标签</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_language})
                }}>自定义语言</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_key,removeKeys:true})
                }}>移除标签</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_language,removeKeys:true})
                }}>移除语言</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('KeySortPage',{flag:FLAG_LANGUAGE.flag_key})
                }}>标签排序</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('KeySortPage',{flag:FLAG_LANGUAGE.flag_language})
                }}>语言排序</Text>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

