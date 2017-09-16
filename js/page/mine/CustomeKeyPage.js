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
    TouchableOpacity
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation';
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
export default class CustomeKeyPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {};
    }
    save(){

    }
    renderCheckBox(){

    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'标签页'}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                        this.props.navigation.goBack()
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
                    {this.renderCheckBox()}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

