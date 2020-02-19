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
import * as baohongAction from "../../redux/phieu_bao_hong/baohong_actions";

import CSelectItemGeneral from "../../libs/CSelectedItem/ItemGeneral";

class ChiTietPhieuBaoHongScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            isLoading: false,
            idParam: false,
            voucherDate: null,
        });
    }

    render() {
        const {getDetailBroken} = this.props;

        const dataDetail = [
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailBroken && getDetailBroken.ProjectName ? getDetailBroken.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Kho'),
                    value: getDetailBroken && getDetailBroken.WareHouseName ? getDetailBroken.WareHouseName : '',
                },
                {
                    title: Config.lang('PM_Nguoi_bao_hong'),
                    value: getDetailBroken && getDetailBroken.EmployeeName ? getDetailBroken.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_bao_hong'),
                    value: getDetailBroken && getDetailBroken.VoucherDate ? getDetailBroken.VoucherDate : null,
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailBroken && getDetailBroken.AppStatusName ? getDetailBroken.AppStatusName : '',
                },
            ];
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View style={{paddingHorizontal: Scale(15), position: 'relative',}}>
                        <View style={{paddingTop: Scale(22),}}>
                            <Text style={styles.textTitleGeneral}> {Config.lang('PM_Thong_tin_chung')}
                            </Text>
                            {dataDetail && dataDetail.length > 0 &&
                            <CSelectItemGeneral isLoading={!getDetailBroken}
                                                border={true}
                                                data={dataDetail}
                            />
                            }
                        </View>

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
    textTitleGeneral: {
        fontSize: Scale(18),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(23)),
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: Scale(12),
        width: '100%',

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
        getDetailBroken: state.baohong.getDetailBroken,
    }),
    (dispatch) => ({
        baohongAction: bindActionCreators(baohongAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietPhieuBaoHongScreen);
