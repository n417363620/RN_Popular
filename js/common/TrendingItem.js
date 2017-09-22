/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-14 22:24
 */

import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import HtmlView from 'react-native-htmlview'
export default class TrendingItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            checked:this.props.data.isFavorite
        };
    }
    static propTypes={
        goDetail:PropTypes.func,
        collect:PropTypes.func
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            checked:nextProps.data.isFavorite
        })
    }
    _renderAvatar(data){
        let imgs=[]
        for(let i=0;i<data.length;i++){
            imgs.push( <Image style={styles.avatarimg} source={{uri:data[i]}}/>)
        }
        return imgs
    }
    render() {
        let data=this.props.data.item
        return(

            <TouchableOpacity style={styles.cell} onPress={()=>{
                this.props.goDetail(this.props.data)
            }}>
                <View style={styles.container}>
                    <Text style={styles.title}>{data.fullName}</Text>
                    <HtmlView  value={data.description}
                               onLinkPress={(url)=>{}}></HtmlView>
                    <Text style={styles.language}>{'Language: '+data.language}</Text>
                    <View style={{height:24,flexDirection:'row'}}>
                        <Text style={styles.language}>{data.meta}</Text>
                        <Text style={styles.language}>     stars:  </Text>
                        <Text style={styles.language}>{data.starCount}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{height:24,flexDirection:'row'}}>
                            <Text style={styles.language}>Build By:  </Text>
                            {this._renderAvatar(data.contributors)}
                        </View>
                        <TouchableOpacity onPress={()=>{
                            this.props.collect(data,!this.state.checked)
                            this.setState({checked:!this.state.checked})
                        }}>
                            <Image style={this.state.checked?[styles.collectimg,{tintColor:'#912CEE'}]:styles.collectimg} source={require('../../res/image/ic_collect.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical:5,
        paddingHorizontal:5
    },
    title:{
        fontSize:16,
        color:'#121212',
        marginBottom:4
    },
    description:{
        color:'#717171',
        marginBottom:4
    },
    avatarimg:{
        height:24,
        width:24
    },
    collectimg:{
        height:20,
        width:20,
    },
    language:{
        alignItems:'center',
        fontSize:14,
        color:'#717171',
        marginBottom:4
    },
    cell:{
        backgroundColor:'white',
        marginVertical:5,
        marginHorizontal:10,
        borderWidth:1,
        borderColor:'#ddd',
        shadowColor:'#aaa',
        shadowOffset:{height:0.5, width:0.5},
        shadowRadius:1,
        shadowOpacity:0.5,
        elevation:2,
        borderRadius:4
    }
});

