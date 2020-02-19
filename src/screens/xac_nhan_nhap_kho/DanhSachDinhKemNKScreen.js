import React, {Component} from 'react';
import {
    View,
    ScrollView, Text, TouchableOpacity, Image, Linking,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xnnktAction from "../../redux/xac_nhan_nhap_kho/xnnk_actions";

import Config, {Scale} from '../../config';
import CScrollView from "../../libs/CScrollView/CScrollView";
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CAttach from "../../libs/CAttach/CAttach";
import CAction from "../../libs/CAction/CAction";


class DanhSachDinhKemNKScreen extends Component {
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

    onSaveReject = () => {
        const {getDetailConfirmWH} = this.props;
        const voucherID = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.VoucherID ? getDetailConfirmWH.infoGeneral.VoucherID : '';
        this.setState({isSubmit: true});
        this.props.xnnktAction.RmVoucherConfirm({VoucherID: voucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                this.setState({isSubmit: false});
                this.props.xnnktAction.getListConfirmWH();
                this.props.xnnktAction.getListWaitingWH();
                this.props.xnnktAction.getListAllWH();
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
        const attachmentConfirm = getDetailConfirmWH && getDetailConfirmWH.AttachmentConfirm ? getDetailConfirmWH.AttachmentConfirm : [];
        const attachmentVoucher = getDetailConfirmWH && getDetailConfirmWH.AttachmentVoucher ? getDetailConfirmWH.AttachmentVoucher : [];
        const isApproval = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusID && getDetailConfirmWH.infoGeneral.StatusID === "001" ? 0 : 1;
        const isReject = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusID && getDetailConfirmWH.infoGeneral.StatusID === "002" ? 1 : 0;
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
                            {Config.lang('PM_Dinh_kem_xac_nhan')}
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
                            {Config.lang('PM_Dinh_kem_phieu_nhap_kho')}
                        </Text>
                        <CAttach onLink={true} data={attachmentVoucher}/>
                    </View>}
                </CScrollView>
                <CAction isApproval={isApproval}
                         isReject={isReject}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onSaveReject={this.onSaveReject}
                />
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
        getDetailConfirmWH: state.xnnk.getDetailConfirmWH
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnnktAction: bindActionCreators(xnnktAction, dispatch),
    })
)(DanhSachDinhKemNKScreen);
