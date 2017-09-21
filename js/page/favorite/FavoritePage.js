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
    Button,
    TouchableOpacity
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import Popover, {PopoverTouchable} from 'react-native-modal-popover'
export default class FavoritePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            visible:false,
            buttonRect:{}
        };
    }
    showPopover() {

        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                visible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {

        this.setState({visible: false});
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'收藏'}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />

                    <Text ref={'button'} style={{height:24,width:100,backgroundColor:'red'}}  onPress={() => {
                         //this.showPopover()
                        NavigationBar.Push(this,'Test')
                    }}>弹出弹框</Text>
                    <Popover
                        fromRect={this.state.buttonRect}
                        visible={this.state.visible}
                        contentStyle={styles.content}
                        arrowStyle={styles.arrow}
                        backgroundStyle={styles.background}
                        onClose={()=>{
                            this.closePopover()
                        }}
                    >
                        <Text>Hello from inside popover!</Text>
                    </Popover>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 8,
    },
    arrow: {
        borderTopColor: 'pink',
    },
    background: {
        backgroundColor: 'rgba(0, 0, 255, 0.5)'
    },
});

