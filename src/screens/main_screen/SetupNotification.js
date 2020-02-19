import React from 'react';
import {
    AppState,
    View,
} from 'react-native';

import Config from '../../config/index';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as navigationActions from '../../navigation/redux/navigation_actions.js';
import * as mainActions from '../../redux/main/main_actions';
import * as homeActions from '../../redux/home/home_actions';
import AsyncStorage from "@react-native-community/async-storage";

import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

class SetupNotification extends React.PureComponent {

    constructor(props){
        super(props);
        this.appState='';
    }
    componentDidMount = () => {
        if(!Config.registerNotification){
            this.checkPermission();
            this.createNotificationListeners();
        }
        AppState.addEventListener('change', this._handleAppStateChange);

    };

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        this.removeNotificationDisplayedListener();
        this.removeNotificationListener();
        this.removeNotificationOpenedListener();
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // console.log('App has come to the foreground!');
            this.props.mainActions.getBadge();
        }
        this.appState =  nextAppState;
    };

    //1
    checkPermission = () => {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    firebase.messaging().getToken().then(token => {
                        // console.log("===== token 1: ", token);
                        AsyncStorage.setItem('IOS_DEVICE_TOKEN', token);
                        Config.deviceToken = token;
                    })
                } else {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            firebase.messaging().getToken().then(token => {
                                // console.log("===== token 2: ", token);
                                AsyncStorage.setItem('IOS_DEVICE_TOKEN', token);
                                Config.deviceToken = token;
                            })
                        })
                        .catch(error => {
                            console.log("Error", error)
                        });
                }
            });
    };

    createNotificationListeners = async () => {
        // firebase.notifications().getInitialNotification()
        //     .then((notificationOpen: NotificationOpen) => {
                // if (notificationOpen) {
                    // console.log('notificationOpennotificationOpen',notificationOpen);
                    // App was opened by a notification
                    // Get the action triggered by the notification being opened
                    // const action = notificationOpen.action;
                    // Get information about the notification that was opened
                    // const notification: Notification = notificationOpen.notification;
                // }
            // });

        this.messageListener = new firebase.messaging().onMessage(async (message) => {
            // console.log('=====> message', message);
            // const data = message._data.payload ? JSON.parse(message._data.payload) : null;
            let notification = new firebase.notifications.Notification()
                .setNotificationId("lemonerp.diginet.com.vn")
                .setTitle(message._data.sender ? message._data.sender : '')
                .setBody(Config.language === '84' ? message._data.title : '')
                .setData(message._data.payload ? JSON.parse(message._data.payload) : 0);

            const badge = message._data.badge ? parseInt(message._data.badge) : 0;
            firebase.notifications().setBadge(badge);
            this.props.mainActions.updateBadge(badge);
            this.props.homeActions.getVoucherNum();
            await firebase.notifications().displayNotification(notification);

            this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
                // console.log('=== notificationOpen:', notificationOpen); // returns { key2: false, key: true }
                if(notificationOpen && notificationOpen.notification && notificationOpen.notification.data)
                this.haveMess(notificationOpen.notification.data)
            });
        });

        this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // console.log('notificationnotification',notification);
            const badge = notification._data && notification._data.badge ? parseInt(notification._data.badge) : 0;
            firebase.notifications().setBadge(badge);
            this.props.mainActions.updateBadge(badge);
            this.props.homeActions.getVoucherNum();
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // console.log('notificationnotification',notification);
            const data = notification._data.payload ? JSON.parse(notification._data.payload) : null;
            const dataTemp = notification._data;
            dataTemp.payload=data;
            const badge = notification._data && notification._data.badge ? parseInt(notification._data.badge) : 0;
            firebase.notifications().setBadge(badge);
            this.props.mainActions.updateBadge(badge);
            this.props.homeActions.getVoucherNum();
        });

        this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // console.log('=== notificationOpen:', notificationOpen); // returns { key2: false, key: true }
            if(notificationOpen && notificationOpen.notification && notificationOpen.notification._data){
                // console.log('=== notificationOpen:', notificationOpen.notification._data); // returns { key2: false, key: true }
                this.haveMess(notificationOpen.notification && notificationOpen.notification._data && notificationOpen.notification._data.payload ? JSON.parse(notificationOpen.notification._data.payload) : null)
            }
        });
    };

    haveMess = (data) => {
        if(data && data.P_form_id && data.voucher_id && Config.getForm(data.P_form_id)){
            this.props.navigationActions.changeScreen(Config.getForm(data.P_form_id),{VoucherID:data.voucher_id});
        }
    };

    render() {
        return(
            <View/>
        )
    }
}


export default connect(state=>({}),(dispatch)=>({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
        homeActions: bindActionCreators(homeActions, dispatch),
    })
)(SetupNotification);
