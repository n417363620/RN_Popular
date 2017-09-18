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
    TouchableOpacity
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import CustomeKeyPage from "./CustomeKeyPage";


export default class MinePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    componentDidMount() {
      this.timer =  setTimeout(()=>{this.props.navigation.navigate('PopularTab')},200)
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
                    this.props.navigation.navigate('CustomeKeyPage',{})
                }}>自定义标签</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('KeySortPage')
                }}>标签排序页</Text>
                <Text onPress={()=>{
                    this.props.navigation.navigate('CustomeKeyPage',{removeKeys:true})
                }}>移除标签页</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

