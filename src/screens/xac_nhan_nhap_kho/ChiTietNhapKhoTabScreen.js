import React, {Component} from 'react';
import {
    Alert,
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChiTietPhieuNhapKhoScreen from "./ChiTietPhieuNhapKhoScreen";
import ChiTietVatTuNhapKhoScreen from "./ChiTietVatTuNhapKhoScreen";
import DanhSachDinhKemNKScreen from "./DanhSachDinhKemNKScreen";
import CLoading from "../../libs/CLoading/CLoading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xnnktAction from "../../redux/xac_nhan_nhap_kho/xnnk_actions";

class ChiTietNhapKhoTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isTab:0,
            isLoading: false,
            dataTab:[]
        };
        this.dataInventory = [];
    }

    componentDidMount() {
        this.getDetail();
        const statusID  = this.props.navigation.state.params.StatusID && this.props.navigation.state.params.StatusID === "002" ? 0 : 1;
        let dataTab = [
                {
                    key: 'ChiTietPhieuNhapKhoScreen',
                    title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                    screen:()=> <ChiTietPhieuNhapKhoScreen onLoading={this.toggleLoading}
                                                           changeTab={this.changeTab}
                                                           onChangeDataTab={this.onChangeDataTab}
                                                           dataInventory ={this.dataInventory}
                                                           navigation={this.props.navigation}
                    />,
                    percent: !statusID ? 34 : 50
                },
                {
                    key: 'ChiTietVatTuNhapKhoScreen',
                    title: Config.lang('PM_Chi_tiet_vat_tu'),
                    screen:()=><ChiTietVatTuNhapKhoScreen onLoading={this.toggleLoading}
                                                          onChange={this.onChange}
                                                          onChangeDataTab={this.onChangeDataTab}
                                                          navigation={this.props.navigation}
                    />,
                    percent: !statusID ? 34 : 50
                },
            ];
        if (!statusID) {
            dataTab.push(
                {
                    key: 'DanhSachDinhKemNKScreen',
                    title: Config.lang('PM_Dinh_kem'),
                    screen:()=><DanhSachDinhKemNKScreen onLoading={this.toggleLoading}
                                                        navigation={this.props.navigation}
                    />,
                    percent: 32
                }
            );
        }
        this.setState({
            dataTab:dataTab
        })
    }

    onChangeDataTab = (statusID) => {
        const {dataTab} = this.state;
        const dataTemp = [
            {
                key: 'ChiTietPhieuNhapKhoScreen',
                title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                screen:()=> <ChiTietPhieuNhapKhoScreen onLoading={this.toggleLoading}
                                                       changeTab={this.changeTab}
                                                       dataInventory ={this.dataInventory}
                                                       onChangeDataTab={this.onChangeDataTab}
                                                       navigation={this.props.navigation}
                />,
                percent: statusID ? 34 : 50
            },
            {
                key: 'ChiTietVatTuNhapKhoScreen',
                title: Config.lang('PM_Chi_tiet_vat_tu'),
                screen:()=><ChiTietVatTuNhapKhoScreen onLoading={this.toggleLoading}
                                                      onChange={this.onChange}
                                                      onChangeDataTab={this.onChangeDataTab}
                                                      navigation={this.props.navigation}
                />,
                percent: statusID ? 34 : 50
            }
        ];
        if(statusID){
            dataTemp.push({
                key: 'DanhSachDinhKemNKScreen',
                title: Config.lang('PM_Dinh_kem'),
                screen:()=><DanhSachDinhKemNKScreen onLoading={this.toggleLoading}
                                                    onChangeDataTab={this.onChangeDataTab}
                                                    navigation={this.props.navigation}
                />,
                percent: 32
            })
        }
        if(dataTab.length < 3){
            this.setState({
                dataTab: null
            },()=>{
                this.setState({
                    dataTab:dataTemp
                })
            })
        }
    };

    getDetail = () => {
        if (!this.props.navigation.state.params.VoucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.props.xnnktAction.getDetailConfirmWH({VoucherID: this.props.navigation.state.params.VoucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSTHVKT: [],
                    isSubmit: true
                });
            } else if (data) {
                this.dataInventory = data && data.Invemtory ?  data.Invemtory : [];
                this.setState({
                    StatusID: data && data.infoGeneral && data.infoGeneral.StatusID ? data.infoGeneral.StatusID : '',
                    isSubmit: true
                });
            }
        })
    };

    toggleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading
        })
    };

    changeTab  = (number) => {
        if(this.refs['CTab']) this.refs['CTab']._handleIndexChange(number);
    };

    onChange = (data) => {
        this.dataInventory = data;
    };

    render() {
        const {isTab, isLoading, dataTab} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang("PM_Chi_tiet_nhap_kho")}
                />
                {(!isTab || isTab) && dataTab && dataTab.length > 0 && <CTab swipeEnabled={false}
                     height={30}
                     ref={'CTab'}
                     data={dataTab}
                     colorInActive={Config.gStyle.color_def1}
                     colorActive={Config.gStyle.color_def}
                     paddingHorizontal={Scale(15)}
                     onChange={(number) => {
                         this.setState({
                             isTab: number
                         })
                     }}
                     styleTabBar={{flex: 1, width: '100%', marginTop: Scale(5)}}
                />}
                {isLoading && <CLoading/>}
            </View>
        );
    }

}

export default connect(state => ({
        getDetailConfirmWH: state.xnnk.getDetailConfirmWH
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnnktAction: bindActionCreators(xnnktAction, dispatch),
    })
)(ChiTietNhapKhoTabScreen);

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
