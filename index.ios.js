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
  View
} from 'react-native';
import Setup from './js/Setup'
export default class GithubTrending extends Component {
  render() {
    return (
        <View style={{flex:1}}>
          <NavigationBar
              title={'首页'}
              leftButton={<Image style={{height:20,width:20}} source={require('./res/image/ic_back.png')}/>}
              rightButton={<Image style={{height:20,width:20}} source={require('./res/image/ic_more.png')}/>}
          />
          <Index/>
        </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubTrending', () => Setup);
