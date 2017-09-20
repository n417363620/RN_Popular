/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-13 17:04
 */

import React, {Component,
               PropTypes
               } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { NavigationActions } from 'react-navigation'
const NAVIBAR_HEIGHT_ANDROID=50;
const NAVIBAR_HEIGHT_IOS=44;
const STATUS_BAR_HEIGHT=20;
const StatusBarShape={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
    hidden:PropTypes.boolean
}
//默认的根路由
const resetAction=NavigationActions.reset({
    index:0,
    actions:[
        NavigationActions.navigate({routeName:'Root'})
    ]
})
//到指定的根路由
function getResetAction(key) {
    let resetAction = NavigationActions.reset({
        index:0,
        actions:[
            NavigationActions.navigate({ routeName: key })
        ]
    });
    return resetAction;
}
export default class NavigationBar extends Component {
    /**
     * 跳转页面(压栈)
     * @param owner  当前视图,直接传入{this}
     * @param key    跳转页面的key,和注册时填入的key一致
     * @param params 跳转时传入的参数
     * @constructor
     */
    static Push(owner,key:string,params){
        const { navigate } = owner.props.navigation;
        if (params) {
            navigate(key,{
                ...params
            });
        }else {
            navigate(key);
        }
    }
    /**
     * 返回上一页面
     * @param owner  当前视图,直接传入{this}
     * @constructor
     */
    static Pop(owner){
        const {goBack} = owner.props.navigation;
        goBack(null);
    }

    /**
     * 返回到指定视图
     * @param owner 当前视图,直接传入{this}
     * @param key   指定视图key,和注册时填入的key一致
     * @constructor
     */
    static PopToAppoint(owner,key){
        const {goBack} = owner.props.navigation;
        goBack(key);
    }
    /**
     * 重置到主视图
     * @param owner 当前视图,直接传入{this}
     * @param key   主视图key,和注册时填入的key一致
     * @constructor
     */
    static Reset(owner,key){
        if (!key) {
            owner.props.navigation.dispatch(resetAction)
        }else
        owner.props.navigation.dispatch(getResetAction(key))
    }

    static propTypes={
        style:View.propTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(StatusBarShape)
     }
     static defaultProps={
        statusBar:{
            backgroundColor:'#912CEE',
            barStyle:'light-content',
            hidden:false
        }
     }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            title:'',
            hide:false
        };
    }
    //获取导航按钮
    getNavButtonElement(button){
        return(
            <View style={styles.navBarButton}>
                {button}
            </View>
        );
    }
    render() {
        let status=!this.props.statusBar.hidden ?
            <View style={styles.statusBarView}><StatusBar {...this.props.statusBar}/></View>:null
        let titleView=this.props.titleView?this.props.titleView:
                      <Text ellipsizeMode={'head'}
                             numberOfLines={1}
                             style={styles.title}>{this.props.title}</Text>
        let content=this.props.hide?null:
            <View style={styles.nav}>
                         {this.getNavButtonElement(this.props.leftButton)}
                          <View style={styles.titleView}>
                            {titleView}
                           </View>
                         {this.getNavButtonElement(this.props.rightButton)}
                      </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {status}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#912CEE',
    },
    nav:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginLeft:10,
        marginRight:10,
        height:Platform.OS==='ios'?NAVIBAR_HEIGHT_IOS:NAVIBAR_HEIGHT_ANDROID,
        alignItems: 'center',
    },
    titleView:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        color:'white',
        fontSize:18,
    },
    statusBarView:{
        height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0,
    },
    navBarButton: {
        alignItems: 'center',
    },
});

