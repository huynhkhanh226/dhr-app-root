import React, {Component} from 'react';
import {
    Alert,
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChiTietPhieuChoMuonTSScreen from "./ChiTietPhieuChoMuonTSScreen";
import ChiTietVatTuChoMuonTSScreen from "./ChiTietVatTuChoMuonTSScreen";
import DanhSachDinhKemChoMuonTSScreen from "./DanhSachDinhKemChoMuonTSScreen";
import CLoading from "../../libs/CLoading/CLoading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xncmtsAction from "../../redux/xac_nhan_cho_muon_tai_san/xncmts_actions";
import CAction from "../../libs/CAction/CAction";

class ChiTietXNChoMuonTSTabScreen extends Component {

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
        this.props.xncmtsAction.getDetailConfirmBorrow({VoucherID: this.props.navigation.state.params.VoucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    isSubmit: false
                });
            } else if (data) {
                this.setState({
                    dataInventory: data,
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
        const {getDetailConfirmBorrow}= this.props;
        this.setState({
            dataInventory: data ? data : getDetailConfirmBorrow
        })
    };

    onLink = (name) => {
        const {getDetailConfirmBorrow}= this.props;
        const {dataInventory} = this.state;
        const VoucherID = getDetailConfirmBorrow && getDetailConfirmBorrow.infoGeneral && getDetailConfirmBorrow.infoGeneral.VoucherID ? getDetailConfirmBorrow.infoGeneral.VoucherID : '';
        this.props.navigationActions.changeScreen(name,{voucherID: VoucherID, inventory : dataInventory});

    };

    onSaveReject = () => {
        const {getDetailConfirmBorrow} = this.props;
        const voucherID = getDetailConfirmBorrow && getDetailConfirmBorrow.infoGeneral && getDetailConfirmBorrow.infoGeneral.VoucherID ? getDetailConfirmBorrow.infoGeneral.VoucherID : '';
        const oBatchID = getDetailConfirmBorrow && getDetailConfirmBorrow.infoGeneral && getDetailConfirmBorrow.infoGeneral.OBatchID ? getDetailConfirmBorrow.infoGeneral.OBatchID : '';
        const param = {
            VoucherID: voucherID,
            OBatchID: oBatchID,
        };
        this.setState({isSubmit: true});
        Config.alertMess({err: '', message:Config.lang('PM_Ban_co_muon_huy_xac_nhan_khong')},'YES_NO',()=>{
            this.props.xncmtsAction.RmVoucherBorrow(param, (error, data) => {
                if (error) {
                    let errorCode = error.code || null;
                    let message = "";
                    switch (errorCode) {
                        case "F2560E006":
                            message =  Config.lang("PM_Huy_khong_thanh_cong");
                            break;
                        case "F2560E005":
                            message = Config.lang("PM_Ban_khong_the_huy_phieu");
                            break;
                        default:
                            message = error.message ||Config.lang("PM_Loi_chua_xac_dinh");
                            break;
                    }
                    this.setState({isSubmit: false});
                    Config.alertMess({code: '', message: error.message});
                } else if (data) {
                    this.setState({isSubmit: false});
                    this.props.xncmtsAction.getListConfirmBorrow();
                    this.props.xncmtsAction.getListWaitingBorrow();
                    this.props.xncmtsAction.getListAllBorrow();
                    this.props.navigation.goBack();
                }
            });
        },()=>{
            this.setState({isSubmit: false});
        });
    };

    render() {
        const {isTab, isLoading, isSubmit, dataInventory} = this.state;
        const {getDetailConfirmBorrow} = this.props;
        const isApproval = getDetailConfirmBorrow && getDetailConfirmBorrow.infoGeneral && getDetailConfirmBorrow.infoGeneral.KindVoucherID && parseInt(getDetailConfirmBorrow.infoGeneral.KindVoucherID) === 1 ? 0 : 1;
        const dataTab = [
            {
                key: 'ChiTietPhieuChoMuonTSScreen',
                title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                screen:()=> <ChiTietPhieuChoMuonTSScreen onLoading={this.toggleLoading}
                                                      changeTab={this.changeTab}
                                                      // onChange={this.onChange}
                                                      // onChangeDataTab={this.onChangeDataTab}
                                                      dataInventory ={dataInventory}
                                                      navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'ChiTietVatTuChoMuonTSScreen',
                title: Config.lang('PM_Chi_tiet_vat_tu'),
                screen:()=><ChiTietVatTuChoMuonTSScreen onLoading={this.toggleLoading}
                                                     onChange={this.onChange}
                                                     // onChangeDataTab={this.onChangeDataTab}
                                                     navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'DanhSachDinhKemChoMuonTSScreen',
                title: Config.lang('PM_Dinh_kem'),
                screen:()=><DanhSachDinhKemChoMuonTSScreen onLoading={this.toggleLoading}
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
                            headerName={Config.lang("PM_Chi_tiet_phieu_xac_nhan")}
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
                {getDetailConfirmBorrow && <CAction isApproval={isApproval}
                         isReject={isApproval}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onApproval={() => this.onLink('DuyetXacNhanChoMuonTSScreen')}
                         onSaveReject={this.onSaveReject}
                />}
            </View>
        );
    }

}

export default connect(state => ({
        getDetailConfirmBorrow: state.xncmts.getDetailConfirmBorrow
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xncmtsAction: bindActionCreators(xncmtsAction, dispatch),
    })
)(ChiTietXNChoMuonTSTabScreen);

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
