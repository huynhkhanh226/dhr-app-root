import React, {Component} from 'react';
import {
    Alert,
    View,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import ChiTietPhieuTaiSanDaNhanScreen from "./ChiTietPhieuTaiSanDaNhanScreen";
import ChiTietVatTuTaiSanDaNhanScreen from "./ChiTietVatTuTaiSanDaNhanScreen";
import DanhSachDinhKemTaiSanDaNhanScreen from "./DanhSachDinhKemTaiSanDaNhanScreen";
import CLoading from "../../libs/CLoading/CLoading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xntsdnAction from "../../redux/xac_nhan_tai_san_da_nhan/xntsdn_actions";
import CAction from "../../libs/CAction/CAction";

class ChiTietXNTaiSanDaNhanTabScreen extends Component {

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
        this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: this.props.navigation.state.params.VoucherID}, (error, data) => {
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
        const {getDetailConfirmReceived}= this.props;
        this.setState({
            dataInventory: data ? data : getDetailConfirmReceived
        })
    };

    onLink = (name) => {
        const {getDetailConfirmReceived}= this.props;
        const {dataInventory} = this.state;
        const VoucherID = getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.VoucherID ? getDetailConfirmReceived.infoGeneral.VoucherID : '';
        this.props.navigationActions.changeScreen(name,{voucherID: VoucherID, inventory : dataInventory});

    };

    onSaveReject = () => {
        const {getDetailConfirmReceived} = this.props;
        const voucherID = getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.VoucherID ? getDetailConfirmReceived.infoGeneral.VoucherID : '';
        const oBatchID = getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.OBatchID ? getDetailConfirmReceived.infoGeneral.OBatchID : '';
        const param = {
            VoucherID: voucherID,
            OBatchID: oBatchID,
        };
        this.setState({isSubmit: true});
        Config.alertMess({err: '', message:Config.lang('PM_Ban_co_muon_huy_xac_nhan_khong')},'YES_NO',()=>{
            this.props.xntsdnAction.RmVoucherReceived(param, (error, data) => {
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
                    this.props.xntsdnAction.getListConfirmReceived();
                    this.props.xntsdnAction.getListWaitingReceived();
                    this.props.xntsdnAction.getListAllReceived();
                    this.props.navigation.goBack();
                }
            });
        },()=>{
            this.setState({isSubmit: false});
        });
    };

    render() {
        const {isTab, isLoading, isSubmit, dataInventory} = this.state;
        const {getDetailConfirmReceived} = this.props;
        const isApproval = getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.KindVoucherID && parseInt(getDetailConfirmReceived.infoGeneral.KindVoucherID) === 3 ? 1 : 0;
        const dataTab = [
            {
                key: 'ChiTietPhieuTaiSanDaNhanScreen',
                title: Config.lang('PM_Chi_tiet_phieu_nhap'),
                screen:()=> <ChiTietPhieuTaiSanDaNhanScreen onLoading={this.toggleLoading}
                                                      changeTab={this.changeTab}
                                                      // onChange={this.onChange}
                                                      // onChangeDataTab={this.onChangeDataTab}
                                                      dataInventory ={dataInventory}
                                                      navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'ChiTietVatTuTaiSanDaNhanScreen',
                title: Config.lang('PM_Chi_tiet_vat_tu'),
                screen:()=><ChiTietVatTuTaiSanDaNhanScreen onLoading={this.toggleLoading}
                                                     onChange={this.onChange}
                                                     // onChangeDataTab={this.onChangeDataTab}
                                                     navigation={this.props.navigation}
                />,
                percent: 37
            },
            {
                key: 'DanhSachDinhKemTaiSanDaNhanScreen',
                title: Config.lang('PM_Dinh_kem'),
                screen:()=><DanhSachDinhKemTaiSanDaNhanScreen onLoading={this.toggleLoading}
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
                {getDetailConfirmReceived && <CAction isApproval={isApproval}
                         isReject={isApproval}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onApproval={() => this.onLink('DuyetXacNhanTaiSanDaNhanScreen')}
                         onSaveReject={this.onSaveReject}
                />}
            </View>
        );
    }

}

export default connect(state => ({
        getDetailConfirmReceived: state.xntsdn.getDetailConfirmReceived
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xntsdnAction: bindActionCreators(xntsdnAction, dispatch),
    })
)(ChiTietXNTaiSanDaNhanTabScreen);

const styles = {
    container: {
        flex: 1,
        width:'100%',
    },
};
