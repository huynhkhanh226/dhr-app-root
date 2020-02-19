/**
 * @copyright 2019 @ DigiNet
 * @author rocachien
 * @create 2019/04/15 21:10
 * @update 2019/04/15 21:10
 */

import Config, {Scale} from '../config';
import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class Api extends React.Component{
    static headers() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': 'content-type,token,secret'
        };

        if (Config.getToken) {
            Config.getToken = false;
            headers.secret = Config.secret;
        } else {
            headers.token = Config.token.id;
        }

        return headers;
    }

    static get(route) {
        return this.xhr(route, null, 'GET');
    }

    static put(route, params) {
        return this.xhr(route, params, 'PUT');
    }

    static post(route, params) {
        return this.xhr(route, params, 'POST');
    }

    static delete(route, params) {
        return this.xhr(route, params, 'DELETE')
    }

    static upload(route, params) {
        const url = Config.hostCDN + route;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': Config.tokenCDN
            },
            body: params
        };

        return fetch(url, options)
            .then(resp => {
                if (resp && resp.ok) {
                    return resp.json();
                }

                return resp.json().then(err => {
                    Api.checkSystemError(err);
                });
            });
    }

    static getCDN(route) {
        const url = Config.hostCDN + route;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'secret': Config.secretCDN,
            }
        };

        return fetch(url, options)
            .then(resp => {
                if (resp && resp.ok) {
                    return resp.json();
                }

                return resp.json().then(err => {
                    Api.checkSystemError(err);
                });
            });
    }

    static xhr(route, params, method) {

        let url = route.indexOf("://");
        url = url === -1 ? Config.host + route : route;
        if(method !== 'GET') params.AppID='APM';
        const options = {
            method: method,
            headers: Api.headers(),
            body: params ? JSON.stringify(params) : null
        };

        // console.log('==== url: ', url);
        // console.log('==== options: ', options);

        return fetch(url, options)
            .then(async (resp) => {
                // console.log('===== API.xhr => data111:', resp);
                if (resp && resp.ok) {
                    // console.log('===== API.xhr => data:', resp);
                    try {
                        const data = await resp.json();

                        // console.log('===== API.xhr => data:', data);
                        if (data && data.code && data.message) {
                            return Api.checkSystemError(url,data);
                        } else {
                            return data;
                        }

                    } catch (e) {
                        return Api.checkSystemError(url,{code: 'SYS001', message: Config.lang('PM_Not_connect')});
                    }
                } else {
                    return Api.checkSystemError(url,{code: 'SYS001', message: Config.lang('PM_Not_connect')});
                }
            })
            .catch(e => {return Api.checkSystemError(url,{code: 'SYS001', message: Config.lang('PM_Not_connect')});})
    }

    static checkSystemError = (url,error) => {
        const code = error.code || null;

        switch (code) {
            case "SYS001":
                error = {code: 'SYS001', message: Config.lang('PM_Not_connect')};
                Alert.alert('',error.message);
                break;
            case "SYS002":
                error = {code: 'SYS002', message: "Authentication token is required"};
                break;
            case "SYS003":
                error = {code: 'SYS003', message: "Authentication token are not matching"};
                break;
            case "SYS004":
                error = {code: 'SYS004', message: "Authentication token is expired"};
                Alert("Phiên làm việc đã hết hạn.\nVui lòng đăng nhập lại.");
                break;
            case "SYS005":
                error = {code: 'SYS005', message: "Authentication error request timeout"};
                break;
            case "SYS006":
                error = {code: 'SYS006', message: "Update token fail"};
                break;
            case "SYS007":
                error = {code: 'SYS007', message: "Socket error"};
                break;
            case "SYS008":
                error = {code: 'SYS008', message: "The data is not in JSON format"};
                break;
            case "SYS009":
                error = {code: 'SYS009', message: "The data is not in list"};
                break;
            case "SYS010":
                error = {code: 'SYS010', message: "The data is not number"};
                break;
            case "SYS011":
                error = {code: 'SYS011', message: "The data is unique"};
                break;
            case "SYS500":
                error = {code: 'SYS500', message: "The unknown error has occurred"};
                break;
            default:
                error = {code: 'SYS500', message: "The unknown error has occurred", ...error};
                break;
        }

        if (error.code === 'SYS002' || error.code === 'SYS003') {
            AsyncStorage.removeItem('TOKENHR');
            AsyncStorage.removeItem('PROFILEHR');
            AsyncStorage.removeItem('ADMINHR');
            AsyncStorage.removeItem('SETTINGHR');
            Config.host=Config.hostDigiNet;
            Config.secret=Config.secretDigiNet;

            // Config.CPopup.show('INFO',Config.lang('Dang_nhap_lai'),null,null,()=>{
                // window.location.reload();
            // });
            return true;

        } else return error;
    }
}

export default Api;
