import React, {Component} from 'react';
import {
    Alert,
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChiTietPhieuDeXuatScreen from "./ChiTietPhieuDeXuatScreen";
import ChiTietVatTuDeXuatScreen from "./ChiTietVatTuDeXuatScreen";
import DanhSachDinhKemDXScreen from "./DanhSachDinhKemDXScreen";
import CLoading from "../../libs/CLoading/CLoading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xndxvtAction from "../../redux/xac_nhan_de_xuat_vat_tu/xndxvt_actions";
import CAction from "../../libs/CAction/CAction";

class ChiTietDeXuatTabScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            isTab:0,
            isLoading: false,
            isSubmit: false,
            dataInventory:null
        };
        this.dataInventory = [];
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        if (!this.props.navigation.state.params.VoucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.props.xndxvtAction.getDetailConfirmProposal({VoucherID: this.props.navigation.state.params.VoucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSTHVKT: [],
                    isSubmit: false
                });
            } else if (data) {
                this.setState({
                    dataInventory: data,
                    StatusID: data && data.infoGeneral && data.infoGeneral.StatusID ? data.infoGeneral.StatusID : '',
                    isSubmit: false
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
        this.setState({
            dataInventory: data
        })
    };

    onLink = (name) => {
        const {getDetailConfirmProposal}= this.props;
        const {dataInventory} = this.state;
        const VoucherID = getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.VoucherID ? getDetailConfirmProposal.infoGeneral.VoucherID : '';
        this.props.navigationActions.changeScreen(name,{voucherID: VoucherID, inventory : dataInventory});

    };

    onSaveReject = () => {
        const {getDetailConfirmProposal} = this.props;
        const voucherID = getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.VoucherID ? getDetailConfirmProposal.infoGeneral.VoucherID : '';
        this.setState({isSubmit: true});
        Config.alertMess({err: '', message:Config.lang('PM_Ban_co_muon_huy_xac_nhan_khong')},'YES_NO',()=>{
            this.props.xndxvtAction.RmVoucherProposal({VoucherID: voucherID}, (error, data) => {
                if (error) {
                    this.setState({isSubmit: false});
                    Config.alertMess({code: '', message: error.message});
                } else if (data) {
                    this.setState({isSubmit: false});
                    this.props.xndxvtAction.getListConfirmProposal();
                    this.props.xndxvtAction.getListWaitingProposal();
                    this.props.xndxvtAction.getListAllProposal();
                    this.props.navigation.goBack();
                }
            });
        },()=>{
            this.setState({isSubmit: false});
        });
    };

    render() {
        const {isTab, isLoading, isSubmit, dataInventory} = this.state;
        const {getDetailConfirmProposal} = this.props;
        const isApproval = getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.IsConfirm;
        const dataTab = [
            {
                key: 'ChiTietPhieuDeXuatScreen',
                title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                screen:()=> <ChiTietPhieuDeXuatScreen onLoading={this.toggleLoading}
                                                      changeTab={this.changeTab}
                                                      // onChange={this.onChange}
                                                      // onChangeDataTab={this.onChangeDataTab}
                                                      dataInventory ={dataInventory}
                                                      navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'ChiTietVatTuDeXuatScreen',
                title: Config.lang('PM_Chi_tiet_vat_tu'),
                screen:()=><ChiTietVatTuDeXuatScreen onLoading={this.toggleLoading}
                                                     onChange={this.onChange}
                                                     // onChangeDataTab={this.onChangeDataTab}
                                                     navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'DanhSachDinhKemDXScreen',
                title: Config.lang('PM_Dinh_kem'),
                screen:()=><DanhSachDinhKemDXScreen onLoading={this.toggleLoading}
                                                    changeTab={this.changeTab}
                                                    dataInventory={dataInventory}
                                                    // onChang={this.onChange}
                                                    navigation={this.props.navigation}
                />,
                percent: 26
            }
        ];

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                            showBack={true}
                            headerName={Config.lang("PM_Chi_tiet_xac_nhan_de_xuat")}
                />
                {(!isTab || isTab) && <CTab swipeEnabled={false}
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
                {getDetailConfirmProposal && <CAction isApproval={isApproval}
                         isReject={isApproval}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onApproval={() => this.onLink('DuyetXacNhanDeXuatScreen')}
                         onSaveReject={this.onSaveReject}
                />}
            </View>
        );
    }

}

export default connect(state => ({
        getDetailConfirmProposal: state.xndxvt.getDetailConfirmProposal
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xndxvtAction: bindActionCreators(xndxvtAction, dispatch),
    })
)(ChiTietDeXuatTabScreen);

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
