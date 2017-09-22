/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-21 16:36
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import NavigationBar from "./NavigationBar";
import {NavigationActions} from "react-navigation";

export default class TransitionPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params)
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Root'},{flag_Tab:this.props.navigation.state.params.flag_Tab}),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

