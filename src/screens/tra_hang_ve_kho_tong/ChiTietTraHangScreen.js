import React, {Component} from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as navigationActions from "../../navigation/redux/navigation_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as thvktAction from "../../redux/tra_hang_ve_kho_tong/thvkt_actions";

import moment from 'moment';
import SelectInfoItems from "../../libs/CSelectInfoItems/select_info_items";

class ChiTietComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            dataDSTHVKT:[]
        });
    }

    onChangePress = () => {
        if (this.props.onChangePress) this.props.onChangePress();
    };

    render() {
        const {data, isLoading} = this.props;
        return (
            <View style={styles.viewDetail}>
                <Text style={styles.textDetailLb} numberOfLines={1}>
                    {data && data.title}
                </Text>
                <View style={styles.viewTextDetailVl}>
                    {isLoading && <ActivityIndicator size="small" color="#707070"/>}
                    <Text style={styles.textDetailVl} numberOfLines={1}>
                        {data && data.value}
                    </Text>
                </View>
            </View>
        );
    }
}

class ChiTietTraHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            isLoading: false,
            idParam: false,
            voucherDate: null,
        });
    }

    componentDidMount() {
    }

    render() {
        const {getDetailMDIVoucher} = this.props;
        const dataDetail = {
            dataMaster: [
                {
                    title: Config.lang('PM_Phieu'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.MDIVoucherNo ? getDetailMDIVoucher.MDIVoucherNo : '',
                },
                {
                    title: Config.lang('PM_Nguyen_nhan'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.MDIReasonName ? getDetailMDIVoucher.MDIReasonName : '',
                },
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.ProjectName ? getDetailMDIVoucher.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Kho_nhap'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.WareHouseName ? getDetailMDIVoucher.WareHouseName : '',
                },
                {
                    title: Config.lang('PM_Nhap_kho'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.StatusName ? getDetailMDIVoucher.StatusName : '',
                },
                {
                    title: Config.lang('PM_Nguoi_yeu_cau'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.EmployeeName ? getDetailMDIVoucher.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_yeu_cau'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.MDIVoucherDate ? moment(getDetailMDIVoucher.MDIVoucherDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.MDIStatusName ? getDetailMDIVoucher.MDIStatusName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailMDIVoucher && getDetailMDIVoucher.Description ? getDetailMDIVoucher.Description : '',
                },
            ],
            dataInventory: getDetailMDIVoucher && getDetailMDIVoucher.inventoryDetail && getDetailMDIVoucher.inventoryDetail.length > 0 ? getDetailMDIVoucher.inventoryDetail : [],
        };
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View style={{
                        flexDirection:'row',
                        flexWrap:'wrap',
                        justifyContent:'flex-start'
                    }}>
                        {dataDetail && dataDetail.dataMaster && dataDetail.dataMaster.length > 0 && dataDetail.dataMaster.map((value, index) => {
                            return (
                                <ChiTietComponent isLoading={!getDetailMDIVoucher} key={index} data={value}/>
                            )
                        })}
                        {dataDetail && dataDetail.dataInventory && dataDetail.dataInventory.length > 0 && dataDetail.dataInventory.map((item, idx) => {
                            return (
                                <SelectInfoItems value={item}
                                                 key={idx}
                                                 isDetail={true}
                                                 disable={true}
                                                 disableRemove={true}
                                                 isDate={true}
                                />
                            )
                        })}
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    viewDetail: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Scale(16),
        paddingHorizontal: Scale(16),
    },
    textDetailLb: {
        width: '40%',
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(24)),
        fontFamily: Config.getFont('Roboto'),
        color: '#707070',
    },
    viewTextDetailVl: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: Scale(8),
        width: '60%',
    },
    textDetailVl: {
        color: '#010101',
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(24)),
        fontFamily: Config.getFont('Roboto'),
    },
    textNote: {
        fontSize: Scale(20),
        color: '#212121',
        fontFamily: Config.getFont('Roboto'),
        fontWeight: 'bold',
        lineHeight: Math.floor(Scale(26)),
        paddingTop: Scale(10),
        paddingBottom: Scale(12),
    },
    contentNote: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Roboto'),
        lineHeight: Math.floor(Scale(24)),
        color: 'rgba(0,0,0,0.87)',
        height: Scale(75),
        borderRadius: Scale(16),
        borderColor: '#CECECE',
        borderWidth: 1,
        textAlignVertical: 'top',
        padding: Scale(15),
    },
};

export default connect(state => ({
        getDetailMDIVoucher: state.thvkt.getDetailMDIVoucher,
    }),
    (dispatch) => ({
        thvktAction: bindActionCreators(thvktAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietTraHangScreen);
