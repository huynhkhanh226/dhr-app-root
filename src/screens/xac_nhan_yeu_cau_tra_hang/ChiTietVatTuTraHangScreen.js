import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";

import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Search from "../../libs/CSearch/Search_item";
import Swipeout from "react-native-swipeout";
import CImage from "../../libs/CImage/CImage";
import SelectQuanity from "../../libs/CSelectedQuanity/Select-Quanity";
import CAction from "../../libs/CAction/CAction";
import CScrollView from "../../libs/CScrollView/CScrollView";
import * as xnycthAction from "../../redux/xac_nhan_yeu_cau_tra_hang/xnycth_actions";

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
                height:'100%',
            },
        ];
        const {value, disable, disableRemove, isDetail} = this.props;
        return (
            <View style={styles.viewSwi}>
                <Swipeout style={{flex:1}} disabled={disableRemove} backgroundColor="white" right={swiPeOutButton}>
                    <View style={styles.ViewSwiContainer}>
                        <View style={{width: '30%', padding: Scale(3), height: '100%',flexDirection:'row', alignItems:'center'}}>
                            <CImage source={value.PictureURL}
                                    style={styles.viewCImage}
                                    width={86} height={86}
                                    resizeMode="contain"
                            />
                        </View>
                        <View style={[styles.viewSwiContent,{ width: !disable ? '50%' : '70%'}]}>
                            <Text style={styles.textViewHeader}>{value.InventoryName}</Text>
                            <Text numberOfLines={1} style={styles.textViewContent}>
                                {Config.lang('PM_Ma')} {value.InventoryID}</Text>
                            <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_ton')}
                                {value && value.WHQuantity ? value.WHQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>
                            <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_So_luong_kiem_ke')}
                                {value && value.OQuantity ? value.OQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>
                        </View>
                    </View>
                </Swipeout>
            </View>
        )
    }
}

class ChiTietVatTuTraHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    componentDidMount() {
        const {getDetailConfirmWH} = this.props;
        this.setState({
            dataInventory: getDetailConfirmWH ? getDetailConfirmWH : [],
        });
    }

    onLink = (name) => {
        const {dataInventory, onChangeDataTab}= this.state;
        const inventory = dataInventory && dataInventory.inventory && dataInventory.inventory.length>0 ? dataInventory.inventory : [];
        const VoucherID = dataInventory && dataInventory.master && dataInventory.master.VoucherID ? dataInventory.master.VoucherID : '';
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
        const {dataInventory, isSubmit} = this.state;
        const isApproval = getDetailConfirmWH && getDetailConfirmWH.master && getDetailConfirmWH.master.IsConfirm;

        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(150)}
                >
                    <View style={{flex:1, width:'100%',paddingHorizontal: Scale(16), flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start'}}>
                        {dataInventory && dataInventory.inventory && dataInventory.inventory.length>0 && dataInventory.inventory.map((item, index) => {
                            return (
                                <VatTuComponent
                                    value={item}
                                    key={index}
                                />
                            )
                        })}
                    </View>
                </CScrollView>
                {getDetailConfirmWH && <CAction isApproval={isApproval}
                                                isReject={isApproval}
                                                isHistory={false}
                                                isLoading={false}
                                                isSubmit={isSubmit}
                                                onApproval={() => this.onLink('DuyetXacNhanTraHangScreen')}
                                                onSaveReject={this.onSaveReject}
                />
                }
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
)(ChiTietVatTuTraHangScreen);
