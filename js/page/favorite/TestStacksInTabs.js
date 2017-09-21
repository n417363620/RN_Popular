/**
 * @flow
 */

import React from 'react';
import { Button, ScrollView } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import SampleText from './SampleText';
import { NavigationActions } from 'react-navigation'
const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Profile')}
      title="Open profile screen"
    />
      <Button
          onPress={() => navigation.navigate('Profile1')}
          title="Open profile screen1"
      />
    <Button
      onPress={() => navigation.navigate('NotifSettings')}
      title="Open notifications screen"
    />
    <Button
      onPress={() => navigation.navigate('SettingsTab')}
      title="Go to settings tab"
    />
      <Button
          onPress={() => {
              let resetAciton=NavigationActions.reset({
                  index:0,//这里指定执行到第几个action
                  actions:[ NavigationActions.navigate({routeName:'Profile'}),
                            NavigationActions.navigate({routeName:'Profile1'}),
                            NavigationActions.navigate({routeName:'Profile'})]
              })
              let navigateAction1 = NavigationActions.navigate({
                  routeName: 'NotifSettings',//和设可以是跟路由，可以是子路由
                  params: {},
                 // action: NavigationActions.navigate({ routeName: 'NotifSettings'})//继续在该根路由中继续跳转
              })
              navigation.dispatch(resetAciton)
          }}
          title="Reset to Profile Screen(only in ProfileTab if in Setting Tab there has some error!)"
      />
      <Button
          onPress={() => navigation.navigate('Root')}
          title="Go to App Home"
      />
      <Button
          onPress={() => {
              let resetAciton=NavigationActions.reset({
                  index:0,
                  actions:[ NavigationActions.navigate({routeName:'Root'})]
              })
              navigation.dispatch(resetAciton)
          }}
          title="Go to App Home And Reset"
      />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={ 'Profile'}
    navigation={navigation}
  />
);
const MyProfileScreen1 = ({ navigation }) => (
    <MyNavScreen
        banner={'Profile'}
        navigation={navigation}
    />
);
const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const MainTab = StackNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Home',
      header:null
    },
  },
  Profile: {
    screen: MyProfileScreen,
    path: '/',
    navigationOptions: {
        title: 'Profile',
        header:null
    }
  },
    Profile1: {
        screen: MyProfileScreen1,
        path: '/',
        navigationOptions: {
            title: 'Profile1',

            tabBarVisible:true,
            tabBarStyle:{height:0},
            tabBarHeight:0,
            style:{height:0}
        }
    },
});

const SettingsTab = StackNavigator({
  Settings: {
    screen: MySettingsScreen,
    path: '/',
    navigationOptions: () => ({
      title: 'Settings',
      header:null
    }),
  },
  NotifSettings: {
    screen: MyNotificationsSettingsScreen,
    navigationOptions: {
      title: 'Notifications',
      header:null
    },
  },
});

const StacksInTabs = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
         header:null
      },
    },
    SettingsTab: {
      screen: SettingsTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Settings',
        header:null
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
export default StacksInTabs;
