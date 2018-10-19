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
    ScrollView
} from 'react-native'
import NavigationBar from "../../common/NavigationBar";
import CustomeKeyPage from "./CustomeKeyPage";
import {FLAG_MODULE} from "../../util/DataRequest";
import {FLAG_LANGUAGE} from "../../expand/LanguageResponsitory";
import {NavigationActions} from "react-navigation";
import {NativeModules} from 'react-native'
import  RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker, {IMAGESELECTOR_MODE} from "../../module/ImagePicker";
export default class MinePage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        console.log(this.props.navigation.state.params)
        this.state = {
             base64:null
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
    renderImage(){
        return  <Image style={{height:100,width:100}} source={{ uri : 'data:image/png,base64,' + this.state.base64 }}/>
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('IntroducePage')
                    }}>
                        <View style={styles.icon}>
                            <Image style={{tintColor:'#912CEE',height:48,width:48}} source={require('../../../res/image/ic_popular.png')}/>
                            <Text style={{color:"#4c4c4c",fontSize:16}}>GitHub  Popular</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.fontsection}>趋势管理</Text>
                    </View>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_language})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_tagmanager.png')}/>
                            <Text style={styles.fontsizetitle}>自定义语言</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                     <View style={styles.line}/>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('KeySortPage',{flag:FLAG_LANGUAGE.flag_language})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_sort.png')}/>
                            <Text style={styles.fontsizetitle}>语言排序</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_language,removeKeys:true})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_tagdelete.png')}/>
                            <Text style={styles.fontsizetitle}>语言移除</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <View style={styles.section}>
                        <Text style={styles.fontsection}>最热管理</Text>
                    </View>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_key})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_tagmanager.png')}/>
                            <Text style={styles.fontsizetitle}>自定义标签</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('KeySortPage',{flag:FLAG_LANGUAGE.flag_key})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_sort.png')}/>
                            <Text style={styles.fontsizetitle}>标签排序</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        this.props.navigation.navigate('CustomeKeyPage',{flag:FLAG_LANGUAGE.flag_key,removeKeys:true})
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_tagdelete.png')}/>
                            <Text style={styles.fontsizetitle}>标签移除</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <View style={styles.section}>
                        <Text style={styles.fontsection}>设置</Text>
                    </View>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        //NativeModules.ToastExample.show('Hello World!',NativeModules.ToastExample.LONG).then(result=>{console.log(result)})
                        let array=["/storage/emulated/0/wandoujia/downloader/openscreen/open_screen_title_img_1245.png",
                            "/storage/emulated/0/DCIM/Camera/QuickCapture/IMG_20170903_143912_1R.jpg",
                            "/storage/emulated/0/wandoujia/downloader/openscreen/open_screen_bg_img_1203.png"]
                        let jsonString=JSON.stringify(array)
                        console.log(jsonString)
                       /* ImagePicker.RNselectImagesWithExistImages(jsonString,20,false).then(result=>{
                            console.log(result)
                        }).catch(error=>{console.log(error)})*/
                        ImagePicker.RNcropImage(true).then(result=>{
                            console.log(result)
                        }).catch(error=>{console.log(error)})
                       /* ImagePicker.RNselectImages(20,false).then(result=>{
                            console.log(result)
                        }).catch(error=>{console.log(error)})*/
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_theme.png')}/>
                            <Text style={styles.fontsizetitle}>自定义主题</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.item}  onPress={()=>{
                        this.props.navigation.navigate('AboutAuthorPage')
                    }} >
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_aboutme.png')}/>
                            <Text style={styles.fontsizetitle}>关于作者</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>


                    <View style={styles.section}>
                        <Text style={styles.fontsection}>其他</Text>
                    </View>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        NavigationBar.Push(this,'QRScannerPage')
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_qr.png')}/>
                            <Text style={styles.fontsizetitle}>挑选照片</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                 
                
                    <TouchableOpacity style={styles.item} onPress={()=>{
                        RNFetchBlob.fetch('GET', 'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=关键字&bk_length=600用例(请右击在新窗口打开)', {
                            //  Authorization : 'Bearer access-token...',
                            // more headers  ..
                        })
                        // when response status code is 200
                            .then((res) => {
                                // the conversion is done in native code
                               // let base64Str = res.base64()
                               // console.log(base64Str)

                                // the following conversions are done in js, it's SYNC
                                // let text = res.text()
                                let json = res.json()
                                console.log(json)
                            })
                            // Status code is not 200
                            .catch((errorMessage, statusCode) => {
                                // error handling
                            })
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_contact.png')}/>
                            <Text style={styles.fontsizetitle}>React-Native-Blob-simple</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity style={styles.item} onPress={()=>{
                        RNFetchBlob
                            .config({
                                // add this option that makes response data to be stored as a file,
                                // this is much more performant.
                                fileCache : true,
                            })
                            .fetch('GET', 'a1.33lc.com:801/small/douyutv_33lc.apk', {
                                //some headers ..
                            })
                            .then((res) => {
                                // the temp file path
                                console.log('The file saved to ', res.path())
                            })
                    }}>
                        <View style={styles.icon}>
                            <Image style={styles.imgsize} source={require('../../../res/image/ic_contact.png')}/>
                            <Text style={styles.fontsizetitle}>React-Native-Blob-bigfile</Text>
                        </View>
                        <Image style={styles.imgsize} source={require('../../../res/image/ic_jump.png')}/>
                    </TouchableOpacity>
                 
                    <View style={styles.line}/>
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
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:10,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'space-between'
    },
    icon:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgsize:{
        tintColor:'#912CEE',
        height:16,
        width:16,
    },
    section:{
        flexDirection:'row',
        paddingVertical:4,
        paddingHorizontal:10,
        backgroundColor:'#d9d9d9',
    },
    fontsection:{
        fontSize:13,
        color:'#A6A6A6'
    },
    fontsizetitle:{
        marginLeft:10,
        fontSize:15,
        color:'#4C4C4C'
    },
    line:{
        height:0.5,
        backgroundColor:'#d9d9d9'
    }
});

