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
import * as xnycthAction from "../../redux/xac_nhan_yeu_cau_tra_hang/xnycth_actions";
import CSelectItemGeneral from "../../libs/CSelectedItem/ItemGeneral";
import CSelectItemCommodity from "../../libs/CSelectedItem/ItemCommodity";
import CAction from "../../libs/CAction/CAction";
import moment from 'moment';

class ChiTietPhieuTraHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onLink = (name) => {
        const {getDetailConfirmWH, onChangeDataTab} = this.props;

        const inventory = getDetailConfirmWH && getDetailConfirmWH.inventory && getDetailConfirmWH.inventory.length>0 ? getDetailConfirmWH.inventory : [];
        const VoucherID = getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.VoucherID ? getDetailConfirmWH.master.VoucherID : '';

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


    render() {
        const {getDetailConfirmWH} = this.props;
        const {isSubmit}= this.state;
        let dataTest = {
            id: 'TTC',
            nameGeneral: Config.lang('PM_Thong_tin_chung'),
            dataGeneral: [
                {
                    title: Config.lang('PM_Nguoi_kiem_ke'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.EmployeeName ? getDetailConfirmWH.master.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_kiem_ke'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.VoucherDate ? moment(getDetailConfirmWH.master.VoucherDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.ProjectName ? getDetailConfirmWH.master.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Kho_kiem_ke'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.WareHouseName ? getDetailConfirmWH.master.WareHouseName : '',
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.ConfirmName ? getDetailConfirmWH.master.ConfirmName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.Description ? getDetailConfirmWH.master.Description : '',
                },
            ],
            nameConfirm: Config.lang('PM_Thong_tin_xac_nhan'),
            dataConfirm: getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.IsConfirm === 1 ? getDetailConfirmWH.master : null,
        };

        const isApproval = getDetailConfirmWH && getDetailConfirmWH.master && !!getDetailConfirmWH.master.IsConfirm;

        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(150)}
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
                        {dataTest && dataTest.dataConfirm && <View>
                            <Text style={styles.textTitleCommodity}>
                                {Config.lang('PM_Thong_tin_xac_nhan')}
                            </Text>
                            <CSelectItemGeneral border={true}
                                                data={[
                                                  {
                                                      title: Config.lang('PM_Nguoi_xac_nhan'),
                                                      value: dataTest.dataConfirm.EmployeeConfirmName,
                                                  },
                                                  {
                                                      title: Config.lang('PM_Ngay_xac_nhan'),
                                                      value: dataTest.dataConfirm.ConfirmDate ? moment(dataTest.dataConfirm.ConfirmDate).format("DD/MM/YYYY") : null,
                                                  },
                                                  {
                                                      title: Config.lang('PM_Ghi_chu'),
                                                      value: dataTest.dataConfirm.ConfirmDescription,
                                                  }]
                                                }
                            />
                        </View>}
                    </View>
                </CScrollView>
                {getDetailConfirmWH && <CAction isApproval={isApproval}
                         isReject={isApproval}
                         isHistory={false}
                         isLoading={false}
                         isSubmit={isSubmit}
                         onApproval={() => this.onLink('DuyetXacNhanTraHangScreen')}
                         onSaveReject={this.onSaveReject}
                />}
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
        getDetailConfirmWH: state.xnycth.getDetailConfirmRT
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnycthAction: bindActionCreators(xnycthAction, dispatch),
    })
)(ChiTietPhieuTraHangScreen);
