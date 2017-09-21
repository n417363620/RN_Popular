/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 21:59
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {
    StackNavigator,
    NavigationActions
} from 'react-navigation';
export default class WelcomePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    reset(){
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'HomePage'}),
        ]
    })
    this.props.navigation.dispatch(resetAction)
    }
    componentDidMount() {
       this.timer = setTimeout(()=>{
           //  this.props.navigation.navigate('Home')
            this.reset();
        },1500)
    }

    componentUnWillMount() {
        this.timer&&clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={()=>{
                    this.reset();
                }}>WellCome!!!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

