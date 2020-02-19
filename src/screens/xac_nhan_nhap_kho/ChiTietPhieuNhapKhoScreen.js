import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator, Platform,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";

import Config, {Scale} from '../../config';

import CScrollView from '../../libs/CScrollView/CScrollView';
import * as xnnktAction from "../../redux/xac_nhan_nhap_kho/xnnk_actions";
import CSelectItemGeneral from "../../libs/CSelectedItem/ItemGeneral";
import CSelectItemCommodity from "../../libs/CSelectedItem/ItemCommodity";
import CAction from "../../libs/CAction/CAction";
import moment from 'moment';

class ChiTietPhieuNhapKhoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onLink = (name) => {
        const {getDetailConfirmWH, onChangeDataTab} = this.props;

        const inventory = getDetailConfirmWH && getDetailConfirmWH.Inventory && getDetailConfirmWH.Inventory.length>0 ? getDetailConfirmWH.Inventory : [];
        const VoucherID = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.VoucherID ? getDetailConfirmWH.infoGeneral.VoucherID : '';

        this.props.navigationActions.changeScreen(name,{voucherID: VoucherID, inventory : inventory, onBackParent:onChangeDataTab});
    };

    onSaveReject = () => {
        const {getDetailConfirmWH} = this.props;
        const voucherID = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.VoucherID ? getDetailConfirmWH.infoGeneral.VoucherID : '';
        this.setState({isSubmit: true});
        this.props.xnnktAction.RmVoucherConfirm({VoucherID: voucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                this.setState({isSubmit: true});
                this.props.xnnktAction.getListConfirmWH();
                this.props.xnnktAction.getListWaitingWH();
                this.props.xnnktAction.getListAllWH();
                this.props.navigation.goBack();
            }
        });
    };


    render() {
        const {getDetailConfirmWH} = this.props;
        const {isSubmit}= this.state;
        let dataTest = {
            id: 'TTC',
            nameGeneral: Config.lang('PM_Thong_tin_chung'),
            dataGeneral: [
                {
                    title: Config.lang('PM_So_phieu'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.OVoucherNo ? getDetailConfirmWH.infoGeneral.OVoucherNo : '',
                },
                {
                    title: Config.lang('PM_Nguoi_nhap'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.OEmployeeName ? getDetailConfirmWH.infoGeneral.OEmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_nhap'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.OVoucherDate ? moment(getDetailConfirmWH.infoGeneral.OVoucherDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.ProjectName ? getDetailConfirmWH.infoGeneral.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Kho_nhap'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.WareHouseName ? getDetailConfirmWH.infoGeneral.WareHouseName : '',
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusName ? getDetailConfirmWH.infoGeneral.StatusName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.Note ? getDetailConfirmWH.infoGeneral.Note : '',
                },
            ],
            nameConfirm: Config.lang('PM_Thong_tin_xac_nhan'),
            dataConfirm: getDetailConfirmWH && getDetailConfirmWH.confirm ? getDetailConfirmWH.confirm : [],
        };

        const isApproval = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusID && getDetailConfirmWH.infoGeneral.StatusID === "001" ? 0 : 1;
        const isReject = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusID && getDetailConfirmWH.infoGeneral.StatusID === "002" ? 1 : 0;

        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(140)}
                >
                    <View style={{paddingHorizontal: Scale(15), position: 'relative',}}>
                        <View style={{paddingTop: Scale(22),}}>
                            <Text style={styles.textTitleGeneral}> Thông tin chung
                                {/*{dataTest && [1,2,3,4,5] ? dataTest.nameGeneral : 'Không có'}*/}
                            </Text>
                            {dataTest && dataTest.dataGeneral && dataTest.dataGeneral.length > 0 &&
                            <CSelectItemGeneral isLoading={!getDetailConfirmWH}
                                                border={true}
                                                data={dataTest.dataGeneral}
                            />
                            }
                        </View>
                        {getDetailConfirmWH && getDetailConfirmWH.confirm && <View>
                            <Text style={styles.textTitleCommodity}>
                                {dataTest && dataTest.nameConfirm ? dataTest.nameConfirm : ''}
                            </Text>
                            {dataTest && dataTest.dataConfirm &&
                                    <CSelectItemCommodity data={[
                                                              {
                                                                  title: Config.lang('PM_Nguoi_xac_nhan'),
                                                                  value: dataTest.dataConfirm.EmployeeName,
                                                              },
                                                              {
                                                                  title: Config.lang('PM_Ngay_xac_nhan'),
                                                                  value: dataTest.dataConfirm.VoucherDate ? moment(dataTest.dataConfirm.VoucherDate).format("DD/MM/YYYY") : null,
                                                              },
                                                              {
                                                                  title: Config.lang('PM_Ghi_chu'),
                                                                  value: dataTest.dataConfirm.AppNote,
                                                              }
                                                          ]}
                                    />}
                        </View>}
                    </View>
                </CScrollView>
                <CAction isApproval={isApproval}
                         isReject={isReject}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onApproval={() => this.onLink('DuyetXacNhanNhapKhoScreen')}
                         onSaveReject={this.onSaveReject}
                />
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
        getDetailConfirmWH: state.xnnk.getDetailConfirmWH
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnnktAction: bindActionCreators(xnnktAction, dispatch),
    })
)(ChiTietPhieuNhapKhoScreen);
