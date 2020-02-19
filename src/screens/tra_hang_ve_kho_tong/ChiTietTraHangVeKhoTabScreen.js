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
import * as thvktAction from '../../redux/tra_hang_ve_kho_tong/thvkt_actions';

import ChiTietTraHangScreen from "./ChiTietTraHangScreen";
import DanhSachDinhKemTHVKScreen from "./DanhSachDinhKemTHVKScreen";
import IconAwe from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import CLine from "../../libs/CLine/CLine";


class ChiTietTraHangVeKhoTabScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTab: 0,
            isModalVisible: true,
            modalVisible: false,
            togglePopup: false,
            dataDSTHVKT: []
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        if (!this.props.navigation.state.params.MDIVoucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.props.thvktAction.getDetailMDIVoucher({MDIVoucherID: this.props.navigation.state.params.MDIVoucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSTHVKT: [],
                    isSubmit: true
                });
            } else if (data) {
                this.setState({
                    dataDSTHVKT: data ? data : [],
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
        this.props.navigationActions.changeScreen('TraHangVeKhoScreen',{id: this.props.navigation.state.params.MDIVoucherID, reload:this.getDetail});
    };

    onRemove = () => {
        const {dataDSTHVKT} = this.state;
        this.togglePopup();
        const params = {
            DivisionID: Config.profile.localHost,
            MDIVoucherID:dataDSTHVKT.MDIVoucherID
        };
        this.props.thvktAction.deleteMDIVoucher(params, (error, data) => {
            if(error){
                Config.alertMess({code:'', message: error.message});
            }
            else if(data){
                if(this.props.navigation.state.params.reload){
                    this.props.navigation.state.params.reload();
                    this.props.navigation.goBack();
                }
                this.props.changeTab(2);
            }
        })
    };

    render() {
        const dataTab = [
            {
                key: 'ChiTietTraHangScreen',
                title: Config.lang("PM_Chi_tiet"),
                screen: () => <ChiTietTraHangScreen changeTab={this.changeTab}
                                             navigation={this.props.navigation}
                />,
                percent: 50
            },
            {
                key: 'DanhSachDinhKemTHVKScreen',
                title: Config.lang("PM_Dinh_kem"),
                screen: () => <DanhSachDinhKemTHVKScreen navigation={this.props.navigation}/>,
                percent: 50
            },
        ];
        const {isTab, togglePopup, dataDSTHVKT} = this.state;
        const isDisableEdit = dataDSTHVKT && dataDSTHVKT.MDIStatusID && parseInt(dataDSTHVKT.MDIStatusID) === 10 ? 0 : 1;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        headerName={Config.lang("PM_Chi_tiet_tra_hang")}
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
                        height: Scale(147),
                        backgroundColor: 'white',
                        borderRadius: Scale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={[styles.btnPopup,{opacity: !isDisableEdit ? 1 : 0.4}]}
                            onPress={!isDisableEdit ? this.onRemove : this.togglePopup}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Xoa')}</Text>
                        </TouchableOpacity>
                        <CLine/>
                        <TouchableOpacity
                            style={[styles.btnPopup, {opacity: !isDisableEdit ? 1 : 0.4}]}
                            onPress={!isDisableEdit ? this.goLink : this.togglePopup}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Chinh_sua')}</Text>
                        </TouchableOpacity>
                        <CLine/>
                        <TouchableOpacity
                            style={[styles.btnPopupCl, {borderBottomWidth: 0}]}
                            onPress={this.togglePopup}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Huy')}</Text>
                        </TouchableOpacity>
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
        getDetailMDIVoucher: state.thvkt.getDetailMDIVoucher,
    }),
    (dispatch) => ({
        thvktAction: bindActionCreators(thvktAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietTraHangVeKhoTabScreen);

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
