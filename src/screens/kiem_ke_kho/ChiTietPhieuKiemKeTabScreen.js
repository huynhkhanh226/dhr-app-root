import React, {Component} from 'react';
import {
    View,
    Alert, TouchableOpacity, Text,
} from 'react-native';

import CTab from "../../libs/CTab/CTab";
import Header from "../../components/Header";
import Config, {Scale} from '../../config';

import {connect} from "react-redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import {bindActionCreators} from "redux";
import * as kiemkekhoAction from '../../redux/kiem_ke_kho/kiemkekho_actions';

import ChiTietPhieuKiemKeScreen from "./ChiTietPhieuKiemKeScreen";
import DanhSachDinhKemKKKScreen from "./DanhSachDinhKemKKKScreen";
import IconAwe from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import CLine from "../../libs/CLine/CLine";
import CButton from "../../libs/CButton/CButton";


class ChiTietPhieuKiemKeTabScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTab: 0,
            isModalVisible: true,
            modalVisible: false,
            togglePopup: false,
            dataCTKKK: []
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        if (!this.props.navigation.state.params.VoucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.props.kiemkekhoAction.getDetailInventoryKKK({VoucherID: this.props.navigation.state.params.VoucherID}, (error, data) => {
            // console.log("kiemkekhoAction.getDetailInventoryKKK", error, data);
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataCTKKK: [],
                    isSubmit: true
                });
            } else if (data) {
                this.setState({
                    dataCTKKK: data ? data : [],
                    isSubmit: true
                });
            }
        })
    };


    changeTab = (number) => {
        if (this.refs['CTab']) this.refs['CTab']._handleIndexChange(number);
    };

    togglePopup = () => {
        this.setState({
            togglePopup: !this.state.togglePopup
        })
    };

    goLink = () => {
        this.togglePopup();
        this.props.navigationActions.changeScreen('KiemKeKhoScreen',{id: this.props.navigation.state.params.VoucherID, reload:this.getDetail});
    };

    onCreateRequest = () => {
        // createRequestInventory
        this.togglePopup();
        const {dataCTKKK} = this.state;
        const voucherID = dataCTKKK && dataCTKKK.master && dataCTKKK.master.VoucherID ? dataCTKKK.master.VoucherID : '';
        const params = {
            VoucherID: voucherID
        };
        this.props.kiemkekhoAction.createRequestInventory(params, (error, data) => {
            if(error){
                Config.alertMess({code:'', message: error.message});
            }
            else if(data){
                this.props.kiemkekhoAction.getListInventoryKKK();
                this.props.navigation.goBack();
            }
        })
    };

    onDelRequest = () => {
        const {dataCTKKK} = this.state;
        const voucherID = dataCTKKK && dataCTKKK.master && dataCTKKK.master.VoucherID ? dataCTKKK.master.VoucherID : '';
        const params = {
            VoucherID: voucherID
        };
        this.props.kiemkekhoAction.deleteRequestInventory(params, (error, data) => {
            if(error){
                Config.alertMess({code:'', message: error.message});
            }
            else if(data){
                this.props.kiemkekhoAction.getListInventoryKKK();
                this.props.navigation.goBack();
            }
        })
    };

    onDelInventoryKKK = () => {
        this.togglePopup();
        const {dataCTKKK} = this.state;
        const voucherID = dataCTKKK && dataCTKKK.master && dataCTKKK.master.VoucherID ? dataCTKKK.master.VoucherID : '';
        const params = {
            VoucherID: voucherID
        };
        this.props.kiemkekhoAction.deleteInventoryKKK(params, (error, data) => {
            // console.log("deleteInventoryKKK deleteInventoryKKK", error, data);
            if(error){
                let errorCode = error.code || null;
                let message = "";
                switch (errorCode) {
                    case "F2100E001":
                        message =  Config.lang("PM_Phieu_kiem_ke_da_duoc_lap_phieu_yeu_cau_tra_hang");
                        break;
                    case "F2100E005":
                        message = Config.lang("PM_Khong_tim_thay_ma");
                        break;
                    case "F2100E012":
                        message = Config.lang("PM_Xoa_khong_thanh_cong");
                        break;
                    default:
                        message = error.message ||Config.lang("LPT_Loi_chua_xac_dinh");
                        break;
                }
                Config.alertMess({code:'', message:message});
                this.setState({isSubmit: false});
                return false;
            }
            else if(data){
                this.props.kiemkekhoAction.getListInventoryKKK();
                this.props.navigation.goBack();
            }
        })
    };

    render() {
        const dataTab = [
            {
                key: 'ChiTietPhieuKiemKeScreen',
                title: Config.lang("PM_Chi_tiet"),
                screen: () => <ChiTietPhieuKiemKeScreen changeTab={this.changeTab}
                                             navigation={this.props.navigation}
                />,
                percent: 50
            },
            {
                key: 'DanhSachDinhKemKKKScreen',
                title: Config.lang("PM_Dinh_kem"),
                screen: () => <DanhSachDinhKemKKKScreen navigation={this.props.navigation}/>,
                percent: 50
            },
        ];
        const {isTab, togglePopup, dataCTKKK} = this.state;
        const isDisable = dataCTKKK && dataCTKKK.master && dataCTKKK.master.StatusID && parseInt(dataCTKKK.master.StatusID) === 10 ? false : true;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        headerName={Config.lang("PM_Chi_tiet_kiem_ke")}
                />
                <TouchableOpacity onPress={this.togglePopup}
                                  hitSlop={{top: Scale(10), bottom: Scale(10), left: Scale(10), right: Scale(10)}}
                                  style={{
                                      position: 'absolute',
                                      top: Scale(10),
                                      right: Scale(18)
                                  }}
                >
                    <IconAwe name={'ellipsis-v'} size={Scale(22)}/>
                </TouchableOpacity>

                <Modal isVisible={togglePopup} backdropOpacity={0.4}>
                    <View style={{
                        marginTop: 22, width: Scale(328),
                        height: Scale(247),
                        backgroundColor: 'white',
                        borderRadius: Scale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CButton
                            style={[styles.btnPopup,{opacity: !isDisable ? 1 : 0.4}]}
                            onPress={this.onCreateRequest}
                            disabled={isDisable}
                            styleCustomText={styles.txtPopup}
                            text={Config.lang('PM_Lap_yeu_cau_tra_hang')}
                        />
                        <CLine/>
                        <CButton
                            style={[styles.btnPopup,{opacity: !isDisable ? 1 : 0.4}]}
                            onPress={this.onDelInventoryKKK}
                            disabled={isDisable}
                            styleCustomText={styles.txtPopup}
                            text={Config.lang('PM_Xoa_kiem_ke')}
                        />
                        <CLine/>
                        <CButton
                            style={[styles.btnPopup,{opacity: isDisable ? 1 : 0.4}]}
                            onPress={this.onDelRequest}
                            disabled={!isDisable}
                            styleCustomText={styles.txtPopup}
                            text={Config.lang('PM_Xoa_yeu_cau_tra_hang')}
                        />
                        <CLine/>
                        <CButton
                            style={[styles.btnPopup,{opacity: !isDisable ? 1 : 0.4}]}
                            onPress={this.goLink}
                            disabled={isDisable}
                            styleCustomText={styles.txtPopup}
                            text={Config.lang('PM_Chinh_sua')}
                        />
                        <CLine/>
                        <CButton
                            style={[styles.btnPopupCl, {borderBottomWidth: 0}]}
                            onPress={this.togglePopup}
                            styleCustomText={styles.txtPopup}
                            text={Config.lang('PM_Huy')}
                        />
                    </View>
                </Modal>
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
            </View>
        );
    }

}

export default connect(state => ({
        getDetailInventoryKKK: state.kiemkekho.getDetailInventoryKKK,
    }),
    (dispatch) => ({
        kiemkekhoAction: bindActionCreators(kiemkekhoAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietPhieuKiemKeTabScreen);

const styles = {
    container: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center'
    },
    btnPopup: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
        color: Config.gStyle.color_666,
        height: Scale(48),
        // borderBottomWidth: 1,
        // borderBottomColor: Config.gStyle.color_border
    },
    txtPopup:{
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
    },
    btnPopupCl: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
        color: Config.gStyle.color_666,
        height: Scale(48),
        // borderTopWidth: 1,
        // borderTopColor: Config.gStyle.color_border
    }
};
