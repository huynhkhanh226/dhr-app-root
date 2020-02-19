import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import * as navigationActions from '../navigation/redux/navigation_actions.js';
import * as mainActions from '../redux/main/main_actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Config, {Scale} from '../config';
import Animated, { Easing } from 'react-native-reanimated';
const { Value, timing } = Animated;
import TabBar from "../components/TabNew";

class TabView extends React.Component {

    constructor(props){
        super(props);
        this.arrIcon = [
            {
                name: 'MenuStack',
                icon: require('../assets/images/tab-bar/home.png'),
                iconActive: require('../assets/images/tab-bar/home-active.png'),
            },
            {
                name: "NotificationStack",
                icon: require('../assets/images/tab-bar/notifycation.png'),
                iconActive: require('../assets/images/tab-bar/notifycation-active.png'),
            },
            {
                name: 'SettingStack',
                icon: require('../assets/images/tab-bar/setting.png'),
                iconActive: require('../assets/images/tab-bar/setting-active.png'),
            }
        ];
        this.indexRoute = 0;
        this._transX = new Value(this.indexRoute*Config.w/this.arrIcon.length);
    }

    _handleIndexChange = routeName => {
        this.props.navigationActions.changeScreen(routeName);
    };

    _renderTabBar1 = () => {
        const {props} = this;
        if((props.navigationState.index || props.navigationState.index === 0) && !!this.tabBar){
            this.tabBar.update(props.navigationState.index, true);
        }
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes && <TabBar
                    ref={ref=>this.tabBar=ref}
                    selectedIndex={props.navigationState.index}
                >
                    {this.arrIcon.map((key, idx) => {
                        const item = props.navigationState.routes.find(i=>i.routeName === key.name);
                        if(!item) return null;
                        return(
                            <TabBar.Item
                                key={idx}
                                icon={key.icon}
                                selectedIcon={key.iconActive}
                                title={key.name}
                                changeScreen={() => this._handleIndexChange(key.name)}
                            />
                        )}
                    )}
                </TabBar>
                }
            </View>
        );
    };

    _renderTabBar = () => {
        const {props} = this;
        if(props.navigationState.routeName){
            this.arrIcon.forEach((item, idx)=>{if(item.name === props.navigationState.routes[props.navigationState.index].routeName) {this.indexRoute = idx}});
            timing(this._transX, {
                duration: 100,
                toValue: this.indexRoute*Config.w/this.arrIcon.length,
                easing: Easing.inOut(Easing.cubic),
            }).start();
        }
        return (
            <View style={[styles.tabBar,{
                borderTopColor:'#707070',
                borderTopWidth: 1
            }]}>
                {props.navigationState.routes && props.navigationState.routes.length &&
                    <Animated.View style={{
                        height: 3,
                        width: Config.w/this.arrIcon.length,
                        position:'absolute',
                        left: this._transX,
                        backgroundColor:'#202020'}}
                    />
                }
                {this.arrIcon.map((key, idx) => {
                    const item = props.navigationState.routes.find(i=>i.routeName === key.name);
                    if(!item) return null;
                    return (
                        <TouchableOpacity
                            key={idx}
                            style={styles.tabItem}
                            onPress={() => this._handleIndexChange(key.name)}>
                            <View>
                                <Image source={this.indexRoute === idx ? key.iconActive : key.icon} style={{width: Scale(20), height: Scale(20)}}/>
                                {key.name === 'NotificationScreen' && <Text style={styles.txtNoti}>25</Text> }
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    render() {
        let show = this.props.main.tabBar;
        if(!show){
            return null;
        }
        return this._renderTabBar();
    }
}

export default connect(state => ({
        main: state.main
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
    })
)(TabView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 0
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: Scale(16),
        flexDirection:'row',
        justifyContent: 'center'
    },
    txtNoti:{
        backgroundColor:'#FF4600',
        color:'white',
        width:Scale(22),
        height: Scale(16),
        borderRadius: Scale(8),
        fontSize:Scale(12),
        fontFamily:'Muli',
        textAlign:'center',
        position:'absolute',
        right: Scale(-10),
        top: Scale(-6),
    }
});
