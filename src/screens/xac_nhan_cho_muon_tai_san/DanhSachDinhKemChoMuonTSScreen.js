import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity, Image, Linking,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xncmtsAction from "../../redux/xac_nhan_cho_muon_tai_san/xncmts_actions";

import Config, {Scale} from '../../config';
import CScrollView from "../../libs/CScrollView/CScrollView";
import CImage from "../../libs/CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CAttach from "../../libs/CAttach/CAttach";
import CAction from "../../libs/CAction/CAction";


class DanhSachDinhKemChoMuonTSScreen extends Component {
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
        const {getDetailConfirmBorrow} = this.props;
        const attachmentConfirm = getDetailConfirmBorrow && getDetailConfirmBorrow.resAttachmentConfirmBorrow ? getDetailConfirmBorrow.resAttachmentConfirmBorrow : [];
        const attachmentVoucher = getDetailConfirmBorrow && getDetailConfirmBorrow.resAttachmentRequestBorrow ? getDetailConfirmBorrow.resAttachmentRequestBorrow : [];
        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(160)}
                >
                    {attachmentVoucher && attachmentVoucher.length>0 &&
                    <View style={{paddingTop: Scale(15),}}>
                        <Text style={{
                            fontSize: Scale(16),
                            fontFamily: Config.getFont('Muli-Regular'),
                            marginHorizontal: Scale(15),
                        }}>
                            {Config.lang('PM_Dinh_kem_phieu_yeu_cau_muon')}
                        </Text>
                        <CAttach onLink={true} data={attachmentVoucher}/>
                    </View>}

                    {attachmentConfirm && attachmentConfirm.length>0 &&
                    <View style={{paddingTop: Scale(15),}}>
                        <Text style={{
                            fontSize: Scale(16),
                            fontFamily: Config.getFont('Muli-Regular'),
                            marginHorizontal: Scale(15),
                        }}>
                            {Config.lang('PM_Dinh_kem_xac_nhan_cho_muon')}
                        </Text>
                        <CAttach onLink={true} data={attachmentConfirm}/>
                    </View>}
                    {!attachmentConfirm.length && !attachmentVoucher.length && <View style={{width:'100%', flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{ color: Config.gStyle.color_grey,
                            fontSize: Scale( 16),
                            paddingVertical: Scale(100)}}>
                            {Config.lang('PM_Khong_tim_thay_du_lieu')}
                        </Text>
                    </View>}
                </CScrollView>
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
        getDetailConfirmBorrow: state.xncmts.getDetailConfirmBorrow
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xncmtsAction: bindActionCreators(xncmtsAction, dispatch),
    })
)(DanhSachDinhKemChoMuonTSScreen);
