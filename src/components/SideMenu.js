
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    InteractionManager, ActivityIndicator
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';

import {bindActionCreators} from 'redux';
import * as navigationActions from '../navigation/redux/navigation_actions.js';
import * as mainActions from '../redux/main/main_actions';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import Config, {Scale} from '../config';
import CImage from "../libs/CImage/CImage";

class SideMenu extends Component {

    constructor(props){
        super(props);
        this.state={
            login: null
        }

    }

    componentDidMount(){
        // this._checkLogin();
    }

    goLink = (key) => {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.dispatch(DrawerActions.closeDrawer());
        });
        if(key.link === 'LogOutScreen'){
            AsyncStorage.removeItem('TOKENHR');
            AsyncStorage.removeItem('PROFILEHR');
            AsyncStorage.removeItem('ADMINHR');
            AsyncStorage.removeItem('SETTINGHR');
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({routeName: 'Main'})
                ]
            });
            this.props.navigation.dispatch(resetAction);

        }
        else if(key.link){
            this.props.navigationActions.changeScreen(key.link);
        }
    };

    render() {
        let data = [
            {
                id: 1,
                name: 'Edit Profile',
                icon: require('../assets/images/side-menu/icon-profile.png'),
                link:'EditProfileScreen'
            },
            {
                id: 2,
                name: 'Notifications',
                icon: require('../assets/images/side-menu/icon-notificcation.png'),
                link:'NotificationScreen'
            },
            {
                id: 6,
                name: 'Chat',
                icon: require('../assets/images/side-menu/icon-message.png'),
                link:'ChatScreen'
            },
            {
                id: 7,
                name: 'App',
                icon: require('../assets/images/side-menu/icon-app.png'),
                link:'AppScreen'
            },
            {
                id: 3,
                name: 'Help',
                icon: require('../assets/images/side-menu/icon-help.png'),
                link:'ContactScreen'
            },
            {
                id: 4,
                name: 'T&C',
                icon: require('../assets/images/side-menu/icon-TC.png'),
                link:'TC1Screen'
            },
            {
                id: 5,
                name: 'Log Out',
                icon: require('../assets/images/side-menu/icon-logout.png'),
                link:'LogOutScreen'
            }
        ];
        const {profile} = this.props;
        const salesPersonNameU = profile && profile.SalesPersonNameU ? profile.SalesPersonNameU : 'No Name';
        const salesURL = profile && profile.URL ? profile.URL : Config.avaDefURL;
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <CImage width={70}
                            height={70}
                            source={salesURL}
                            style={styles.imgAvatar}
                    />
                    <View>
                        <Text style={styles.txtName}>{salesPersonNameU}</Text>
                    </View>
                </View>
                <ScrollView>
                    {data.map((key,idx)=>{
                        return(
                            <TouchableOpacity onPress={()=>this.goLink(key)}
                                              key={idx}
                                              style={styles.row}>
                                <Image source={key.icon} style={styles.rowIcon}/>
                                <Text style={styles.rowName}>
                                    {key.name}
                                </Text>
                                {key.name === 'Notifications' &&
                                    <View style={styles.badgeNumber}>
                                        <Text style={styles.badgeTxt}>15</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            </View>
        );
    }
}

export default connect(state => ({
        profile: state.main.profile,
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch)

    })
)(SideMenu);


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerView:{
        height: Scale(100),
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
    },

    badgeNumber:{
        left: Scale(220),
        position:'absolute',
        backgroundColor:Config.gStyle.color_D0021B,
        borderRadius:Scale(20),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: Scale(40),
        height: Scale(40)
    },

    badgeTxt:{
        color: Config.gStyle.color_white,
        fontSize: Scale(20),
        // //fontFamily:'OpenSans-Semibold',
    },

    txtName:{
        fontSize:Scale(15),
        lineHeight:Math.floor(Scale(18)),
        color: Config.gStyle.color_def,
        marginLeft: Scale(17),
        marginTop:Scale(12),
        //fontFamily:'OpenSans-Semibold'
    },

    txtJobTitle:{
        fontSize:Scale(15),
        color: Config.gStyle.color_grey,
        lineHeight:Math.floor(Scale(18)),
        marginLeft: Scale(17),
        marginTop:Scale(6),
        //fontFamily:'OpenSans-Semibold'
    },

    row:{
        height: Scale(75),
        paddingLeft:Scale(30),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    rowIcon:{
        height: Scale(37),
        width: Scale(37),
        resizeMode:'contain',
        alignItems:'center',
    },

    rowName:{
        color: Config.gStyle.color_black,
        fontSize: Scale(15),
        left: Scale(100),
        position:'absolute',
        //fontFamily:'OpenSans-Semibold'
    },

    imgAvatar:{
        // position:'absolute',
        width: Scale(70),
        height: Scale(70),
        marginLeft: Scale(17),
        borderRadius: Scale(100),
    },

    imgLogo:{
        position:'absolute',
        width: Scale(92),
        height: Scale(92),
        right: Scale(18),
        borderRadius: Scale(46),
        top: Scale(21)
    }
};
