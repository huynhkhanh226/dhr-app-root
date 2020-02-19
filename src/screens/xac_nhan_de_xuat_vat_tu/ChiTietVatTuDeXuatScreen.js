import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xndxvtAction from "../../redux/xac_nhan_de_xuat_vat_tu/xndxvt_actions";

import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swipeout from "react-native-swipeout";
import CImage from "../../libs/CImage/CImage";
import SelectQuanity from "../../libs/CSelectedQuanity/Select-Quanity";
import CScrollView from "../../libs/CScrollView/CScrollView";
import CButton from "../../libs/CButton/CButton";
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";
import moment from "moment";


class VatTuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangeValue = (number) => {
        if (this.props.onChangeValue) this.props.onChangeValue(number);
    };

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
                height: '100%',
            },
        ];
        const {value, disable, disableRemove, isDetail, idx} = this.props;
        return (
            <View style={styles.viewSwi}>
                <Swipeout style={{flex: 1}} disabled={disableRemove} backgroundColor="white" right={swiPeOutButton}>
                    <View style={styles.ViewSwiContainer}>
                        <View style={{
                            width: '30%',
                            padding: Scale(3),
                            height: '100%',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <CImage source={value.PictureURL}
                                    style={styles.viewCImage}
                                    width={86} height={86}
                                    resizeMode="contain"
                            />
                        </View>
                        <View style={[styles.viewSwiContent, {width: !disable ? '50%' : '70%'}]}>
                            <Text style={styles.textViewHeader}>{value.InventoryName}</Text>
                            <Text numberOfLines={1} style={styles.textViewContent}>
                                {Config.lang('PM_Ma')} {value.InventoryID}</Text>
                            <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_nhap')}
                                {value && value.OriOQuantity ? value.OriOQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>
                            {!!isDetail && <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_nhap_thuc_te')}
                                {value && value.ActualQuantity ? value.ActualQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>}
                        </View>
                        <View style={{width: '20%', height: '100%'}}>
                            {!disable && <SelectQuanity
                                // paramTotal={value.ActualQuantity}
                                free={true}
                                paramValue={value.OriOQuantity}
                                changeValue={this.onChangeValue}
                            />}
                        </View>
                    </View>
                </Swipeout>
            </View>
        )
    }
}

class ChiTietVatTuDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.state = ({
            isSubmit: false,
        });
    }

    componentDidMount() {
        const {getDetailConfirmProposal} = this.props;
        this.setState({
            dataInventory: getDetailConfirmProposal ? getDetailConfirmProposal : [],
        });
    }

    onLink = (name, func) => {
        const {dataInventory} = this.state;
        const inventory = dataInventory && dataInventory.Inventory && dataInventory.Inventory.length > 0 ? dataInventory.Inventory : [];
            this.props.navigationActions.changeScreen(name, {onChange: func, SupplyDate: this.getDate,  Inventory: inventory});
    };

    onChangeVatTu = (info) => {
        let dataInventoryTemp = this.state.dataInventory ? {...this.state.dataInventory} : {};
        dataInventoryTemp.Inventory = info.Inventory;
        this.setState({
            dataInventory: dataInventoryTemp,
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.dataInventory);
        });
    };

    onChangeValue = (number, idx) => {
        this.dataInventoryTemp = this.state.dataInventory ? {...this.state.dataInventory} : {};
        if (!this.dataInventoryTemp.Inventory[idx]) return;
        if (!number && number !== '') {
            this.dataInventoryTemp.Inventory.splice(idx, 1);
        } else if (this.dataInventoryTemp.Inventory[idx]) {
            this.dataInventoryTemp.Inventory[idx].ActualOQuantity = number ? parseInt(number) : 0;
            this.dataInventoryTemp.Inventory[idx].ActualQuantity = number ? parseInt(number) : 0;
        }
        this.setState({
            dataInventory: this.dataInventoryTemp,
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.dataInventory);
        });
    };

    onChangeDate = (date, index) => {
        this.dataInventoryTemp = this.state.dataInventory ? {...this.state.dataInventory} : {};
        if (!this.dataInventoryTemp.Inventory[index]) return;
        if (this.dataInventoryTemp.Inventory[index]) {
            this.dataInventoryTemp.Inventory[index].SupplyDate = date ? date : this.getDate;
        }
        this.setState({
            dataInventory: this.dataInventoryTemp,
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.dataInventory);
        });
    };

    render() {
        const {getDetailConfirmProposal} = this.props;
        const {dataInventory} = this.state;
        const isApproval = getDetailConfirmProposal && getDetailConfirmProposal.infoGeneral && getDetailConfirmProposal.infoGeneral.IsConfirm;

        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(150)}
                >
                    <View style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start'
                    }}>
                        {dataInventory && dataInventory.Inventory && dataInventory.Inventory.length > 0 && dataInventory.Inventory.map((item, index) => {
                            return (
                                <SelectProposeItems
                                    onChangeValue={(number) => this.onChangeValue(number, index)}
                                    onChangeDate={(date) => {this.onChangeDate(date, index)}}
                                    disable={!!isApproval}
                                    isDetail={!!isApproval}
                                    title1={Config.lang('PM_So_luong_de_xuat')}
                                    title2={Config.lang('PM_So_luong_xac_nhan')}
                                    titleDate={Config.lang('PM_Ngay_YC')}
                                    disableRemove={true}
                                    value={item}
                                    key={index}
                                />
                            )
                        })
                        }
                    </View>
                    {!isApproval && <View style={{
                        justifyContent: 'center',
                        width: '100%',
                        height: Scale(36),
                        flexDirection: 'row',
                        marginTop: Scale(20),
                    }}>
                        <CButton
                            width={140}
                            height={36}
                            style={styles.button}
                            styleCustomText={styles.textButton}
                            onPress={() =>
                                this.onLink('ChonVatTuXacNhanDeXuatScreen', this.onChangeVatTu)
                            }
                            text={Config.lang("PM_Them_vat_tu")}
                            iconAweSome={"plus"}
                            iconAweSomeSize={Scale(16)}
                            iconAweSomeColor={'#F94F37'}
                            iconAweSomeStyle={styles.iconButton}
                        />
                    </View>}
                </CScrollView>
            </View>
        );
    }
}

const styles = {
    viewSwi: {
        marginTop: Scale(15),
        width: '100%',
    },
    ViewSwiContainer: {
        width: '100%',
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
        justifyContent: 'space-around',
        // alignItems:'space-around',
        height: '100%',
        paddingLeft: Scale(5),
        paddingVertical: Scale(10),
        fontFamily: Config.getFont('Muli-Regular'),
        // backgroundColor:'red'
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
    button: {
        borderWidth: 1,
        borderRadius: Scale(18),
        borderColor: '#F94F37',
        width: Scale(137),
        height: Scale(36),
        flexDirection: 'row',
        paddingHorizontal: Scale(10)
    },
    textButton: {
        color: '#F94F37',
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(20)),
        fontFamily: Config.getFont('Roboto'),
    },
    iconButton: {
        lineHeight: Math.floor(Scale(20)),
    },
};

export default connect(state => ({
        getDetailConfirmProposal: state.xndxvt.getDetailConfirmProposal
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xndxvtAction: bindActionCreators(xndxvtAction, dispatch),
    })
)(ChiTietVatTuDeXuatScreen);
