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
import HardwareExecute from "../../module/HardwareExecute";
import ImagePicker from "../../module/ImagePicker";
export default class QRScannerPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            openLight:true
        };
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
    }

    _renderMenu() {
        return(
            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginTop:10}}>
                <TouchableOpacity
                    style={{height:30,width:30}}
                    onPress={()=>{
                        let state=this.state.openLight
                        this.setState({openLight:!state})
                        HardwareExecute.RNlightSwitch(state)}}
                >
                    <Image    source={require('../../../res/image/ic_light.png')}
                              style={{height:30,width:30,marginRight:10,tintColor:'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{height:30,width:30}}
                    onPress={()=>{
                        ImagePicker.RNselectImages(1,false).then(result=>{
                            console.log(result)
                            HardwareExecute.RNprocessImageFromPhotos(result[0]).then(result=>{
                                console.log(result)
                                ToastAndroid.show(result,ToastAndroid.LONG)
                            })
                        }).catch(error=>{console.log(error)})
                    }}
                >
                    <Image    source={require('../../../res/image/ic_photos.png')}
                              style={{height:30,width:30,marginRight:10,tintColor:'white'}}/>
                </TouchableOpacity>
            </View>
        );
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

