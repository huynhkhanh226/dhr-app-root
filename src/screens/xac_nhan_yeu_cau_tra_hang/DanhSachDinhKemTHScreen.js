import React, {Component} from 'react';
import {
    View,
    ScrollView, Text, TouchableOpacity, Image, Linking,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xnycthAction from "../../redux/xac_nhan_yeu_cau_tra_hang/xnycth_actions";

import Config, {Scale} from '../../config';
import CScrollView from "../../libs/CScrollView/CScrollView";
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CAttach from "../../libs/CAttach/CAttach";
import CAction from "../../libs/CAction/CAction";


class DanhSachDinhKemTHScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: ''
        };
    }

    onLink = (name) => {
        const {dataInventory}= this.state;
        const inventory = dataInventory && dataInventory.inventory && dataInventory.inventory.length>0 ? dataInventory.inventory : [];
        const VoucherID = dataInventory && dataInventory.master && dataInventory.master.VoucherID ? dataInventory.master.VoucherID : '';
        this.props.navigationActions.changeScreen(name,{voucherID: VoucherID, inventory : inventory});
    };

    onSaveReject = () => {
        const {getDetailConfirmWH} = this.props;
        const voucherID = getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.VoucherID ? getDetailConfirmWH.master.VoucherID : '';
        this.setState({isSubmit: true});
        this.props.xnycthAction.RmVoucherConfirmRT({VoucherID: voucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                this.setState({isSubmit: true});
                this.props.xnycthAction.getListConfirmRT();
                this.props.xnycthAction.getListWaitingRT();
                this.props.xnycthAction.getListAllRT();
                this.props.navigation.goBack();
            }
        });
    };

    openLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    renderIcon(item) {
        let imgFile = null;
        switch (item.FileExt) {
            case 'doc':
                imgFile = require("../../assets/images/file/icon-doc.png");
                break;
            case 'docx':
                imgFile = require("../../assets/images/file/icon-docx.png");
                break;
            case 'xls':
                imgFile = require("../../assets/images/file/icon-xls.png");
                break;
            case 'xlsx':
                imgFile = require("../../assets/images/file/icon-xlsx.png");
                break;
            case 'ppt':
                imgFile = require("../../assets/images/file/icon-ppt.png");
                break;
            case 'pptx':
                imgFile = require("../../assets/images/file/icon-pptx.png");
                break;
            case 'pdf':
                imgFile = require("../../assets/images/file/icon-pdf.png");
                break;
            case 'txt':
                imgFile = require("../../assets/images/file/icon-txt.png");
                break;
            case 'vid':
                imgFile = require("../../assets/images/file/video-icon.png");
                break;
            case 'ytb':
                imgFile = require("../../assets/images/file/youtube-icon.png");
                break;
            default:
                imgFile = false;
                break;
        }

        if (imgFile)
            return <TouchableOpacity onPress={() => this.openLink(item.URL)}>
                <Image source={imgFile}
                       style={{
                           width: Scale(50),
                           height: Scale(50),
                           resizeMode: 'contain'
                       }}
                /></TouchableOpacity>
        else return (
            <CImage width={50}
                    height={50}
                    source={item.file}
                    onPress={() => this.openLink(item.file)}
                    style={{
                        resizeMode: 'contain',
                        borderRadius: Scale(10)
                    }}
            />
        )
    }

    render() {
        const {getDetailConfirmWH} = this.props;
        const {isSubmit} = this.state;
        const attachmentConfirm = getDetailConfirmWH && getDetailConfirmWH.attRequireCheck ? getDetailConfirmWH.attRequireCheck : [];
        const attachmentVoucher = getDetailConfirmWH && getDetailConfirmWH.attStockCheck ? getDetailConfirmWH.attStockCheck : [];
        const isApproval = getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.IsConfirm;
        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(160)}
                >
                    {attachmentConfirm && attachmentConfirm.length>0 &&
                    <View style={{paddingTop: Scale(15),}}>
                        <Text style={{
                            fontSize: Scale(16),
                            fontFamily: Config.getFont('Muli-Regular'),
                            marginHorizontal: Scale(15),
                        }}>
                            {Config.lang('PM_Dinh_kem_yeu_cau_tra_hang_ve_kho')}
                        </Text>
                        <CAttach onLink={true} data={attachmentConfirm}/>
                    </View>}

                    {attachmentVoucher && attachmentVoucher.length>0 &&
                    <View style={{paddingTop: Scale(15),}}>
                        <Text style={{
                            fontSize: Scale(16),
                            fontFamily: Config.getFont('Muli-Regular'),
                            marginHorizontal: Scale(15),
                        }}>
                            {Config.lang('PM_Dinh_kem_kiem_ke_kho')}
                        </Text>
                        <CAttach onLink={true} data={attachmentVoucher}/>
                    </View>}
                </CScrollView>
                {getDetailConfirmWH && <CAction isApproval={isApproval}
                                                isReject={isApproval}
                                                isHistory={false}
                                                isLoading={false}
                                                isSubmit={isSubmit}
                                                onApproval={() => this.onLink('DuyetXacNhanTraHangScreen')}
                                                onSaveReject={this.onSaveReject}
                />
                }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        // flex: 1,
        width: '100%',
        height: '100%',
    },
    txtNoData: {
        color: Config.gStyle.color_grey,
        fontSize: Scale(16),
        paddingVertical: Scale(100)
    }

};

export default connect(state => ({
        getDetailConfirmWH: state.xnycth.getDetailConfirmRT
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnycthAction: bindActionCreators(xnycthAction, dispatch),
    })
)(DanhSachDinhKemTHScreen);
