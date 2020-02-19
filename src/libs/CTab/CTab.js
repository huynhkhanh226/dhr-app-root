import React from 'react';
import Config, { Scale } from '../../config';
import {
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    UIManager,
    Image
} from 'react-native';


import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
const dataRouterVT = {};

export default class CTab extends React.PureComponent {

    constructor(props) {
        super(props);
        this.tabDf = props.indexDef ? props.indexDef : 0;
        this.dataRoutes = props.data;
        let routesTemp = [];
        this.dataRoutes.forEach((item, idx) => {
            routesTemp.push({ 'key': item.key, 'title': item.title ? item.title : '' })
        });
        this.state = {
            index: this.tabDf,
            routes: routesTemp,
        };
        this.arrRef = [];
        this.dataRoutes.forEach((item, idx) => {
            dataRouterVT[item.key] = item.screen;
        });
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    _handleIndexChange = index => {
        if (this.isSubmit) return;
        this.isSubmit = true;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        if (this.props.onChangeIndex) this.props.onChangeIndex(index);
        this.setState({
            index: index,
        }, () => {
            this.isSubmit = false;
        });
    };

    _renderTabBar = (props) => {
        const {
            styleTabBar,
            height,
            colorInActive,
            colorActive,
            paddingHorizontal,
            styleTabItem,
            tabBar,
            styleTabItemActive,
            badge,
            data
        } = this.props;

        const { index } = this.state;

        const clInActive = colorInActive ? colorInActive : '#77C1F6';
        const clActive = colorActive ? colorActive : '#179EFF';

        let left = 0;
        this.dataRoutes.forEach((item, idx) => {
            if (idx < index) {
                left += item.percent;
            }
        });

        return (
            <View style={[styleTabBar, { flex: 1, width: '100%', maxHeight: Scale(height), paddingHorizontal: paddingHorizontal }]}>
                <View style={[styles.tabBar, { height: Scale(30), backgroundColor: clInActive }, tabBar]}>
                    <Animated.View style={[styles.tabItem, {
                        position: 'absolute',
                        height: Scale(height),
                        width: data[index].percent + '%',
                        left: left + '%',
                        backgroundColor: clActive
                    }, styleTabItemActive]}
                    />
                    {data.map((route, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.tabItem, { width: route.percent + '%', height: Scale(height) }, styleTabItem]}
                                ref={ref => this.arrRef[i] = ref}
                                onPress={() => this._handleIndexChange(i)}>
                                {route.title &&
                                    <Text style={[styles.titleTab, {
                                        fontFamily: Config.getFont('Muli-Bold'),
                                    }]}
                                    >
                                        {route.title.toUpperCase()}
                                    </Text>
                                }
                                {
                                    route.icon ?
                                        route.icon && i !== index &&
                                        <Image source={route.icon}
                                            style={{
                                                width: Scale(20),
                                                height: Scale(20)
                                            }}
                                        />
                                        :
                                        route.svgIcon ?
                                            route.svgIcon && i !== index &&
                                            <route.svgIcon width={Scale(20)} height={Scale(20)} /> : <View></View>
                                }
                                {
                                    route.iconActive ?
                                        route.iconActive && i === index &&
                                        <Image source={route.iconActive}
                                            style={{
                                                width: Scale(20),
                                                height: Scale(20)
                                            }}
                                        /> :
                                        route.svgIconActive ?
                                            route.svgIconActive && i === index &&
                                            <route.svgIconActive width={Scale(20)} height={Scale(20)} /> : <View></View>
                                }
                                {!!route.badge && !!badge && <Text style={styles.txtBadge}>{parseInt(badge) > 99 ? '99+' : badge}</Text>}
                                {route.name === 'NotificationScreen' && <Text style={styles.txtNoti}>25</Text>}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    render() {
        const { swipeEnabled, tabBarPosition, renderTabBar } = this.props;
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap(dataRouterVT)}
                renderTabBar={renderTabBar ? renderTabBar(this.props) : this._renderTabBar}
                onIndexChange={this._handleIndexChange}
                screenDefault={this.tabDf}
                tabBarPosition={tabBarPosition ? tabBarPosition : "top"}
                lazy={true}
                swipeEnabled={swipeEnabled}
                initialLayout={{ width: Config.w }}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 0,
        width: '100%',
        borderRadius: Scale(15),
        justifyContent: 'space-between'
    },
    tabItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: Scale(15),
    },
    titleTab: {
        color: '#656D79',
        fontSize: Scale(16, true),
        height: Scale(16),
        lineHeight: Math.floor(Scale(16)),
    },
    txtBadge: {
        width: Scale(21),
        color: 'white',
        fontSize: Scale(10),
        lineHeight: Math.floor(Scale(16)),
        textAlign: 'center',
        height: Scale(16),
        borderRadius: Scale(8),
        backgroundColor: 'red',
        position: 'absolute',
        right: Scale(23),
        fontFamily: Config.getFont('Muli-Regular'),
        top: Scale(7)
    }
});
