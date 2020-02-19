import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xntsdnAction from "../../redux/xac_nhan_tai_san_da_nhan/xntsdn_actions";

import Config, {Scale} from '../../config';

import CScrollView from '../../libs/CScrollView/CScrollView';
import CSelectItemGeneral from "../../libs/CSelectedItem/ItemGeneral";
import CSelectItemCommodity from "../../libs/CSelectedItem/ItemCommodity";
import moment from 'moment';


class ChiTietPhieuTaiSanDaNhanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

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
        const {getDetailConfirmReceived} = this.props;
        let dataTest = {
            id: 'TTC',
            nameGeneral: Config.lang('PM_Thong_tin_chung'),
            dataGeneral: [
                {
                    title: Config.lang('PM_So_phieu'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.VoucherNo ? getDetailConfirmReceived.infoGeneral.VoucherNo : '',
                },
                {
                    title: Config.lang('PM_Nguoi_yeu_cau'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.EmployeeName ? getDetailConfirmReceived.infoGeneral.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_yeu_cau'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.RequestDate ? moment(getDetailConfirmReceived.infoGeneral.RequestDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Ngay_muon'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.BorrowDate ? moment(getDetailConfirmReceived.infoGeneral.BorrowDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_CT_muon'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.BorrowProjectName ? getDetailConfirmReceived.infoGeneral.BorrowProjectName : '',
                },
                {
                    title: Config.lang('PM_CT_cho_muon'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.LendProjectName ? getDetailConfirmReceived.infoGeneral.LendProjectName : '',
                },
                {
                        title: Config.lang('PM_Ly_do_muon'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.ReasonName ? getDetailConfirmReceived.infoGeneral.ReasonName : '',
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.StatusName ? getDetailConfirmReceived.infoGeneral.StatusName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.Notes ? getDetailConfirmReceived.infoGeneral.Notes : '',
                },
            ],
            nameConfirmLend: Config.lang('PM_Thong_tin_xac_nhan_cho_muon'),
            dataConfirmLend: getDetailConfirmReceived && getDetailConfirmReceived.confirmLend ? getDetailConfirmReceived.confirmLend : [],

            nameConfirmReceived: Config.lang('PM_Thong_tin_xac_nhan_tai_san_da_nhan'),
            dataConfirmReceived: getDetailConfirmReceived && getDetailConfirmReceived.confirmReceived ? getDetailConfirmReceived.confirmReceived : [],
        };
        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(145)}
                >
                    <View style={{paddingHorizontal: Scale(15), position: 'relative',}}>
                        <View style={{paddingTop: Scale(22),}}>
                            <Text style={styles.textTitleGeneral}>{Config.lang('PM_Thong_tin_chung')}</Text>
                            {dataTest && dataTest.dataGeneral && dataTest.dataGeneral.length > 0 &&
                            <CSelectItemGeneral isLoading={!getDetailConfirmReceived}
                                                border={true}
                                                data={dataTest.dataGeneral}
                            />
                            }
                        </View>
                        {getDetailConfirmReceived && getDetailConfirmReceived.confirmLend && <View>
                            <Text style={styles.textTitleCommodity}>
                                {dataTest && dataTest.nameConfirmLend ? dataTest.nameConfirmLend : ''}
                            </Text>
                            {dataTest && dataTest.dataConfirmLend &&
                                    <CSelectItemCommodity data={[
                                        {
                                            title: Config.lang('PM_Nguoi_xac_nhan'),
                                            value: dataTest.dataConfirmLend.ApproverName,
                                        },
                                        {
                                            title: Config.lang('PM_Ngay_xac_nhan'),
                                            value: dataTest.dataConfirmLend.ApprovalDate ? moment(dataTest.dataConfirmLend.ApprovalDate).format("DD/MM/YYYY") : null,
                                        }, {
                                            title: Config.lang('PM_Ngay_cho_muon'),
                                            value: dataTest.dataConfirmLend.RecordDate ? moment(dataTest.dataConfirmLend.RecordDate).format("DD/MM/YYYY") : null,
                                        },
                                        {
                                            title: Config.lang('PM_Ghi_chu'),
                                            value: dataTest.dataConfirmLend.ApprovalNote,
                                        }
                                    ]}
                                    />}
                        </View>}
                        {getDetailConfirmReceived && getDetailConfirmReceived.confirmReceived && <View>
                            <Text style={styles.textTitleCommodity}>
                                {dataTest && dataTest.nameConfirmReceived ? dataTest.nameConfirmReceived : ''}
                            </Text>
                            {dataTest && dataTest.dataConfirmReceived &&
                                    <CSelectItemCommodity data={[
                                        {
                                            title: Config.lang('PM_Nguoi_xac_nhan'),
                                            value: dataTest.dataConfirmReceived.ApproverName_Confirm,
                                        },
                                        {
                                            title: Config.lang('PM_Ngay_xac_nhan'),
                                            value: dataTest.dataConfirmReceived.ApprovalDate_Confirm ? moment(dataTest.dataConfirmReceived.ApprovalDate_Confirm).format("DD/MM/YYYY") : null,
                                        }, {
                                            title: Config.lang('PM_Ngay_cho_muon'),
                                            value: dataTest.dataConfirmReceived.RecordDate_Confirm ? moment(dataTest.dataConfirmReceived.RecordDate_Confirm).format("DD/MM/YYYY") : null,
                                        },
                                        {
                                            title: Config.lang('PM_Ghi_chu'),
                                            value: dataTest.dataConfirmReceived.ApprovalNote_Confirm,
                                        }
                                    ]}
                                    />}
                        </View>}
                    </View>
                </CScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: '100%',
        justifyContent: 'center',
    },
    textTitleGeneral: {
        fontSize: Scale(18),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(23)),
        // borderBottomWidth: 1,
        // borderBottomColor: '#CCCCCC',
        paddingBottom: Scale(12),
        width: '100%',

    },
    textTitleCommodity: {
        fontSize: Scale(18),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(23)),
        paddingBottom: Scale(12),
        width: '100%',
        paddingTop: Scale(22)

    },
    viewApproval: {
        width: '100%',
        height: Scale(66),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopRightRadius: Scale(33),
        borderTopStartRadius: Scale(33),
        borderWidth: 0,
        position: 'relative',
        bottom: Scale(-5),

        shadowColor: '#95989A',
        shadowOffset: {
            width: 0,
            height: -4
        },
        shadowRadius: 10,
        shadowOpacity: 0.2,

        elevation: 3
    },
    touchableApproval: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    touchableApprovalOpa: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        opacity: 0.4,
    },
    textApproval: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(18)),
        marginTop: Scale(8)
    },
};

export default connect(state => ({
        getDetailConfirmReceived: state.xntsdn.getDetailConfirmReceived
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xntsdnAction: bindActionCreators(xntsdnAction, dispatch),
    })
)(ChiTietPhieuTaiSanDaNhanScreen);
