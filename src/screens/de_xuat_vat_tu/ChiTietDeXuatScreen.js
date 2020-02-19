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
import * as dxvtAction from "../../redux/de_xuat_vat_tu/dxvt_actions";

import moment from 'moment';
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";


class ChiTietComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
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

class ChiTietDeXuatScreen extends Component {
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
        const {isLoading, idParam} = this.state;

        const {getDetailPropose} = this.props;

        const dataDetail = {
            dataMaster: [
                {
                    title: Config.lang('PM_Loai_de_xuat'),
                    value: getDetailPropose && getDetailPropose.ProposeTypeName ? getDetailPropose.ProposeTypeName : '',
                },
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailPropose && getDetailPropose.ProjectName ? getDetailPropose.ProjectName : '',
                },
                {
                    title: Config.lang('PM_So_ban_giao'),
                    value: getDetailPropose && getDetailPropose.DeliveryVoucherNo ? getDetailPropose.DeliveryVoucherNo : '',
                },
                {
                    title: Config.lang('PM_Nguoi_yeu_cau'),
                    value: getDetailPropose && getDetailPropose.EmployeeName ? getDetailPropose.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_yeu_cau'),
                    value: getDetailPropose && getDetailPropose.RequestDate ? moment(getDetailPropose.RequestDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailPropose && getDetailPropose.StatusName ? getDetailPropose.StatusName : '',
                },
            ],
            dataInventory: getDetailPropose && getDetailPropose.inventory && getDetailPropose.inventory.length > 0 ? getDetailPropose.inventory : [],
        };
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View>
                        {dataDetail && dataDetail.dataMaster && dataDetail.dataMaster.length > 0 && dataDetail.dataMaster.map((value, index) => {
                            return (
                                <ChiTietComponent isLoading={!getDetailPropose} key={index} data={value}/>
                            )
                        })}
                        <View style={{marginTop: Scale(11), paddingHorizontal:Scale(15)}}>
                            <Text style={styles.textNote}>{Config.lang("PM_Ghi_chu")}</Text>
                            <Text style={styles.contentNote}>
                                {getDetailPropose && getDetailPropose.Description ? getDetailPropose.Description : ''}
                            </Text>
                        </View>
                        {dataDetail && dataDetail.dataInventory && dataDetail.dataInventory.length > 0 && dataDetail.dataInventory.map((item, idx) => {
                            return (
                                <SelectProposeItems value={item}
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
        paddingHorizontal: Scale(15),
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
        getDetailPropose: state.dxkvt.getDetailPropose,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietDeXuatScreen);
