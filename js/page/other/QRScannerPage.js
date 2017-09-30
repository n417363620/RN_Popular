/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-30 11:00
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import ViewUtil from "../../util/ViewUtil";
import { QRScannerView } from 'ac-qrcode';
export default class QRScannerPage extends Component {
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
                    title={'二维码扫描'}
                    leftButton={ViewUtil.getLfetBackButton(()=>{NavigationBar.Pop(this)})}
                    statusBar={{
                        backgroundColor:"#912CEE",
                        barStyle:"light-content",
                        hidden:false
                    }}
                />
                < QRScannerView
                    onScanResultReceived={this.barcodeReceived.bind(this)}

                    renderTopBarView={() => this._renderTitleBar()}

                    renderBottomMenuView={() => this._renderMenu()}
                />
            </View>
        );
    }
    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >Here is title bar</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            >Here is bottom menu</Text>
        )
    }

    barcodeReceived(e) {
        ToastAndroid.show(e.data,ToastAndroid.LONG);
        NavigationBar.Pop(this)
        console.log(e)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

