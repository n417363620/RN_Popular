/**
 *
 * @authors NYY
 *@company ijia-tech
 * @date   2017-09-25 16:24
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    PixelRatio,
    Dimensions,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtil from "../../util/ViewUtil";
import NavigationBar from "../../common/NavigationBar";
export const FLAG_ABOUT={flag_introduce:'flag_introduce',flag_aboutme:'flag_aboutme'}
export default class AboutCommon{
    constructor(props,updateState,flag) {
       this.props=props;
       this.updateState=updateState;
       this.flag=flag;
    }
    getParallaxRenderConfig(params){
        let  config={}
        config.renderBackground=() => (
            <View key="background">
                <Image source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT}}/>
            </View>
        )

        config. renderForeground=() => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={{
                    uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={ styles.sectionSpeakerText }>
                    {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                    {params.description}
                </Text>
            </View>
        )

        config.renderStickyHeader=() => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>Popular Trending</Text>
            </View>
        )

        config.renderFixedHeader=() => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLfetBackButton(()=>{this.props.navigation.goBack()})}
            </View>
        )
        return config
    }
    render(params,contentView) {
        let config=this.getParallaxRenderConfig(params)
        return (
                    <ParallaxScrollView
                        {...config}
                        headerBackgroundColor="#333"
                        backgroundColor={'#912CEE'}
                        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                        backgroundSpeed={10}
                    >
                        {contentView}
                    </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT =Platform.OS?45:50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {

        justifyContent: 'center',
        alignItems:'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        flexDirection:'row',
        position: 'absolute',
       alignItems:'center',
        bottom: 10,
        left:10,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});