/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-10-12 10:09
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {Button} from 'react-native-elements'
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";


export default class Elements extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Elements'}
                    leftButton={ViewUtil.getLfetBackButton(()=>{
                       NavigationBar.Pop(this)
                    })}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                <Button
                    title='BUTTON' />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    someButtonStyle:{

    }
});

