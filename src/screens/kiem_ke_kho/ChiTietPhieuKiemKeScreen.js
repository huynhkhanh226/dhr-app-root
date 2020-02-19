import React, {Component} from 'react';
import {
    ActivityIndicator,
    Text, TouchableOpacity,
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as navigationActions from "../../navigation/redux/navigation_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as kiemkekhoAction from "../../redux/kiem_ke_kho/kiemkekho_actions";

import moment from 'moment';
import SelectInfoItems from "../../libs/CSelectInfoItems/select_info_items";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swipeout from "react-native-swipeout";
import CImage from "../../libs/CImage/CImage";
import SelectQuanity from "../../libs/CSelectedQuanity/Select-Quanity";

class ChiTietVatTuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    render() {
        const swiPeOutButton = [
            {
                component: (
                    <TouchableOpacity onPress={() => this.onChangeValue(0)}
                                      style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          flexDirection: 'column',
                                          flex: 1,
                                          backgroundColor: '#F85C5C',
                                          width: Scale(73)
                                      }}
                    >
                        <Icon name={'trash-alt'}
                              size={Scale(21)}
                              style={{marginRight: Scale(5)}}
                              color={"#FFFFFF"}/>
                    </TouchableOpacity>
                ),
                backgroundColor: '#F85C5C',
                // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                width: Scale(73),
                swipeEnabled: false,
                marginTop: Scale(15),
                height: Scale(92),
            },
        ];
        const {value, disable, disableRemove, isDetail} = this.props;
        // console.log("value", value);
        // console.log("disable", disable);
        // console.log("disableRemove", disableRemove);
        // console.log("isDetail", isDetail);

        // InventoryID: "APP0001"
        // InventoryName: "May Lien Hop Dien-CA531-LH045"
        // OQuantity: 1
        // PictureURL: "http://apricot.diginet.com.vn:6040/v1/file/C-Users-admin-Desktop-Picture-8-1411721971.jpg?path=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InBhdGgiOiIvMjAxOS8wNS9mMDQyODJjYjRiZDBjMDVmZTJlYzhlNTA3NDc5Y2FiOS5qcGciLCJvcmlnaW5hbEZpbGVOYW1lIjoiQy1Vc2Vycy1hZG1pbi1EZXNrdG9wLVBpY3R1cmUtOC0xNDExNzIxOTcxLmpwZyIsInB1cmwiOiJodHRwOi8vYXByaWNvdC5kaWdpbmV0LmNvbS52bjo2MDQwL3YxIiwiaXVybCI6Imh0dHA6Ly8xMC4wLjAuOTk6NjA0MC92MSJ9XSwiaWF0IjoxNTc1NjI0NDczLCJleHAiOjg3OTc1NjI0NDczfQ.fy7UXYb6i6NaURFDHdXyuHqIg5hpHSuEcBmGtWtLM9A"
        // UnitID: "CAI"
        // UnitName: "Cái"
        // WHQuantity: 200
        return (
            <View style={styles.viewSwi}>
                <Swipeout disabled={disableRemove} backgroundColor="white" right={swiPeOutButton}>
                    <View style={styles.ViewSwiContainer}>
                        <View style={{width: '30%', padding: Scale(3), height: '100%'}}>
                            <CImage source={value.PictureURL}
                                    style={styles.viewCImage}
                                    width={86} height={86}
                                    resizeMode="contain"
                            />
                        </View>
                        <View style={[styles.viewSwiContent,{ width: !disable ? '50%' : '70%'}]}>
                            <Text numberOfLines={2} style={styles.textViewHeader}>{value.InventoryName}</Text>
                            <Text numberOfLines={1} style={styles.textViewContent}>
                                {Config.lang('PM_Ma')} {value.InventoryID}</Text>
                            <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_nhap')}
                                {value && value.OQuantity ? value.OQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>
                            <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_nhap_thuc_te')}
                                {value && value.WHQuantity ? value.WHQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>
                        </View>
                        <View style={{width: '20%', height: '100%'}}>
                            {!disable && <SelectQuanity
                                paramTotal={value.WHQuantity}
                                paramValue={value.OQuantity}
                                changeValue={this.onChangeValue}
                            />}
                        </View>
                    </View>
                </Swipeout>
            </View>
        )
    }
}

class ChiTietKiemKeComponent extends Component {
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
        // console.log("data data",data);
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

class ChiTietPhieuKiemKeScreen extends Component {
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
        const {getDetailInventoryKKK} = this.props;

        const dataDetail = {
            dataMaster: [
                // {
                //     title: Config.lang('PM_Phieu'),
                //     value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.VoucherNo ? getDetailInventoryKKK.master.VoucherNo : '',
                // },
                {
                    title: Config.lang('PM_Nguoi_kiem_ke'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.EmployeeName ? getDetailInventoryKKK.master.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_kiem_ke'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.VoucherDate ? moment(getDetailInventoryKKK.master.VoucherDate).format("DD/MM/YYYY") : null,
                },
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.ProjectName ? getDetailInventoryKKK.master.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Kho'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.WareHouseName ? getDetailInventoryKKK.master.WareHouseName : '',
                },
                {
                    title: Config.lang('PM_Trang_thai'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.StatusName ? getDetailInventoryKKK.master.StatusName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.Description ? getDetailInventoryKKK.master.Description : '',
                },
            ],
            dataInventory: getDetailInventoryKKK && getDetailInventoryKKK.inventory ? getDetailInventoryKKK.inventory : [],
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
                                <ChiTietKiemKeComponent isLoading={!getDetailInventoryKKK} key={index} data={value}/>
                            )
                        })}
                        {dataDetail && dataDetail.dataInventory && dataDetail.dataInventory.length > 0 && dataDetail.dataInventory.map((item, idx) => {
                            return (
                                <SelectInfoItems value={item}
                                             key={idx}
                                             isDetail={true}
                                             disable={true}
                                             disableRemove={true}
                                             title1={Config.lang("PM_Ton_he_thong")}
                                             title2={Config.lang("PM_Ton_thuc_te")}
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
        paddingHorizontal: Scale(15)
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

    viewSwi: {
        marginTop: Scale(15),
        width: '100%',
        height: Scale(92),
    },
    ViewSwiContainer: {
        width: '100%',
        height: Scale(92),
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#FAFAFC',
        borderRadius: Scale(10),
        paddingRight: Scale(-10),
    },
    viewCImage: {
        resizeMode: 'contain',
        borderRadius: Scale(10),
        alignItems: 'center',
        paddingBottom: Scale(3),
        backgroundColor: '#FAFAFC',

    },
    viewSwiContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: Scale(5),
        paddingVertical: Scale(12),
        fontFamily: Config.getFont('Muli-Regular'),
    },
    textViewHeader: {
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(14),
        color: '#212121',
        lineHeight: Math.floor(Scale(18)),
    },
    textViewContent: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(14),
        color: '#212121',
        lineHeight: Math.floor(Scale(18)),
    },
    textViewFooter: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(14),
        color: '#212121',
        lineHeight: Math.floor(Scale(18)),
    },
};

export default connect(state => ({
        getDetailInventoryKKK: state.kiemkekho.getDetailInventoryKKK,
    }),
    (dispatch) => ({
        kiemkekhoAction: bindActionCreators(kiemkekhoAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietPhieuKiemKeScreen);
