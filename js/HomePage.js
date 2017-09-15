/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import PopularPage from "./page/popular/PopularPage";
import MinePage from "./page/mine/MinePage";
export default class Index extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectedTab:'tb_popular'
        };
      }
    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_popular'}
                    title="最热"
                    selectedTitleStyle={{color:'blue'}}
                    renderIcon={() => <Image style={styles.tb_OffImage} source={require('../res/image/ic_popular.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tb_OnImage} Image source={require('../res/image/ic_popular.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        {
                           <PopularPage/>
                        }
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_trending'}
                    title="趋势"
                    selectedTitleStyle={{color:'blue'}}
                    renderIcon={() => <Image style={styles.tb_OffImage} source={require('../res/image/ic_trending.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tb_OnImage} Image source={require('../res/image/ic_trending.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                    {<View>
                        <Text>趋势</Text>
                    </View>}
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_favorite'}
                    title="收藏"
                    selectedTitleStyle={{color:'blue'}}
                    renderIcon={() => <Image style={styles.tb_OffImage} source={require('../res/image/ic_favorite.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tb_OnImage} Image source={require('../res/image/ic_favorite.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                    {<View>
                        <Text>收藏</Text>
                    </View>}
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'tb_mine'}
                    title="我的"
                    selectedTitleStyle={{color:'blue'}}
                    renderIcon={() => <Image style={styles.tb_OffImage} source={require('../res/image/ic_mine.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tb_OnImage} Image source={require('../res/image/ic_mine.png')} />}
                    onPress={() => this.setState({ selectedTab: 'tb_mine' })}>
                    {<MinePage {...this.props}></MinePage>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tb_OnImage:{
        height:24,
        width:24,
        tintColor:'blue'
    },
    tb_OffImage:{
        height:24,
        width:24,

    },

});


