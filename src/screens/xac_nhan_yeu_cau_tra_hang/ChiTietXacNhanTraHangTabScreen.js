import React, {Component} from 'react';
import {
    Alert,
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChiTietPhieuTraHangScreen from "./ChiTietPhieuTraHangScreen";
import ChiTietVatTuTraHangScreen from "./ChiTietVatTuTraHangScreen";
import DanhSachDinhKemTHScreen from "./DanhSachDinhKemTHScreen";
import CLoading from "../../libs/CLoading/CLoading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xnycthAction from "../../redux/xac_nhan_yeu_cau_tra_hang/xnycth_actions";

class ChiTietXacNhanTraHangTabScreen extends Component {

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
        let dataTab = [
                {
                    key: 'ChiTietPhieuTraHangScreen',
                    title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                    screen:()=> <ChiTietPhieuTraHangScreen onLoading={this.toggleLoading}
                                                           changeTab={this.changeTab}
                                                           navigation={this.props.navigation}
                    />,
                    percent: 38
                },
                {
                    key: 'ChiTietVatTuTraHangScreen',
                    title: Config.lang('PM_Chi_tiet_vat_tu'),
                    screen:()=><ChiTietVatTuTraHangScreen onLoading={this.toggleLoading}
                                                          onChange={this.onChange}
                                                          navigation={this.props.navigation}
                    />,
                    percent: 38
                },
                {
                    key: 'DanhSachDinhKemTHScreen',
                    title: Config.lang('PM_Dinh_kem'),
                    screen:()=><DanhSachDinhKemTHScreen onLoading={this.toggleLoading}
                                                        onChange={this.onChange}
                                                        navigation={this.props.navigation}
                    />,
                    percent: 24
                }];
        this.setState({
            dataTab:dataTab
        })
    }

    getDetail = () => {
        if (!this.props.navigation.state.params.VoucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.props.xnycthAction.getDetailConfirmRT({VoucherID: this.props.navigation.state.params.VoucherID, IsConfirm: this.props.navigation.state.params.IsConfirm}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSTHVKT: [],
                    isSubmit: true
                });
            } else if (data) {
                this.dataInventory = data && data.inventory ?  data.inventory : [];
                this.setState({
                    IsConfirm: data && data.master && data.master.IsConfirm ? data.master.IsConfirm : '',
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
                            headerName={Config.lang("PM_Chi_tiet_yeu_cau_tra_hang")}
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
        getDetailConfirmWH: state.xnnk.getDetailConfirmRT
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnycthAction: bindActionCreators(xnycthAction, dispatch),
    })
)(ChiTietXacNhanTraHangTabScreen);

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
