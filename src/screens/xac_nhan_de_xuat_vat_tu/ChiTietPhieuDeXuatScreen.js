import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xndxvtAction from "../../redux/xac_nhan_de_xuat_vat_tu/xndxvt_actions";

import Config, {Scale} from '../../config';

import CScrollView from '../../libs/CScrollView/CScrollView';
import CSelectItemGeneral from "../../libs/CSelectedItem/ItemGeneral";
import CSelectItemCommodity from "../../libs/CSelectedItem/ItemCommodity";
import moment from 'moment';


class ChiTietPhieuDeXuatScreen extends Component {
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
        const {getDetailConfirmProposal} = this.props;
        let dataTest = {
            id: 'TTC',
            nameGeneral: Config.lang('PM_Thong_tin_chung'),
            dataGeneral: [
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.ProjectName ? getDetailConfirmProposal.infoGeneral.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Loai_de_xuat'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.ProposeTypeName ? getDetailConfirmProposal.infoGeneral.ProposeTypeName : '',
                },
                {
                    title: Config.lang('PM_So_ban_giao'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.DeliveryVoucherNo ? getDetailConfirmProposal.infoGeneral.DeliveryVoucherNo : '',
                },
                {
                    title: Config.lang('PM_Nguoi_yeu_cau'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.EmployeeName ? getDetailConfirmProposal.infoGeneral.EmployeeName : '',
                },
                {
                        title: Config.lang('PM_Ngay_yeu_cau'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.RequestDate ? moment(getDetailConfirmProposal.infoGeneral.RequestDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.StatusName ? getDetailConfirmProposal.infoGeneral.StatusName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.Description ? getDetailConfirmProposal.infoGeneral.Description : '',
                },
            ],
            nameConfirm: Config.lang('PM_Thong_tin_xac_nhan'),
            dataConfirm: getDetailConfirmProposal && getDetailConfirmProposal.confirm ? getDetailConfirmProposal.confirm : [],
        };
        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(140)}
                >
                    <View style={{paddingHorizontal: Scale(15), position: 'relative',}}>
                        <View style={{paddingTop: Scale(22),}}>
                            <Text style={styles.textTitleGeneral}> Thông tin chung
                            </Text>
                            {dataTest && dataTest.dataGeneral && dataTest.dataGeneral.length > 0 &&
                            <CSelectItemGeneral isLoading={!getDetailConfirmProposal}
                                                border={true}
                                                data={dataTest.dataGeneral}
                            />
                            }
                        </View>
                        {getDetailConfirmProposal && getDetailConfirmProposal.confirm && <View>
                            <Text style={styles.textTitleCommodity}>
                                {dataTest && dataTest.nameConfirm ? dataTest.nameConfirm : ''}
                            </Text>
                            {dataTest && dataTest.dataConfirm &&
                                    <CSelectItemCommodity data={[
                                                              {
                                                                  title: Config.lang('PM_Nguoi_xac_nhan'),
                                                                  value: dataTest.dataConfirm.ApprovalName,
                                                              },
                                                              {
                                                                  title: Config.lang('PM_Ngay_xac_nhan'),
                                                                  value: dataTest.dataConfirm.ApprovalDate ? moment(dataTest.dataConfirm.ApprovalDate).format("DD/MM/YYYY") : null,
                                                              },
                                                              {
                                                                  title: Config.lang('PM_Ghi_chu'),
                                                                  value: dataTest.dataConfirm.ApprovalNote,
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
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: Scale(12),
        width: '100%',

    },
    textTitleCommodity: {
        fontSize: Scale(18),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(23)),
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
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
        getDetailConfirmProposal: state.xndxvt.getDetailConfirmProposal
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xndxvtAction: bindActionCreators(xndxvtAction, dispatch),
    })
)(ChiTietPhieuDeXuatScreen);
