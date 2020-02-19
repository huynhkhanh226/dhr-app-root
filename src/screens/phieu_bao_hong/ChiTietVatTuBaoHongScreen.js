import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";

import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swipeout from "react-native-swipeout";
import CImage from "../../libs/CImage/CImage";
import SelectQuanity from "../../libs/CSelectedQuanity/Select-Quanity";
import CScrollView from "../../libs/CScrollView/CScrollView";
import CScrollViewModal from "../../libs/CScrollView/CScrollView";
import * as baohongAction from "../../redux/phieu_bao_hong/baohong_actions";
import Modal from "react-native-modal";
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";

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
        const {value, disable, disableRemove, isDetail, idx} = this.props;
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
                                {Config.lang('PM_So_luong')}
                                <Text style={{fontWeight:'bold'}}>
                                {value && value.OQuantity ? value.OQuantity : 0}{' '}
                                {value.UnitName}
                                </Text>
                            </Text>
                            {/*{!!isDetail && <Text numberOfLines={1} style={styles.textViewFooter}>*/}
                            {/*    {Config.lang('PM_So_luong_nhap_thuc_te')}*/}
                            {/*    {value && value.ActualQuantity ? value.ActualQuantity : 0}{' '}*/}
                            {/*    {value.UnitName}*/}
                            {/*</Text>}*/}
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

class ChiTietVatTuBaoHongScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            togglePopup: false
        });
    }

    componentDidMount() {
        const {getDetailBroken} = this.props;
        this.setState({
            dataInventory: getDetailBroken ? getDetailBroken : [],
        });
    }

    togglePopup = () => {
        this.setState({
            togglePopup: !this.state.togglePopup
        })
    };

    onViewDetail = (dataVT) => {
        if (!dataVT && !dataVT.VoucherID) {
            Alert.alert('', Config.lang('LPT_Khong_tim_thay_du_lieu'));
            return;
        } else {
            this.setState({
                dataDetailVT: dataVT ? dataVT : {},
                Phenomena: dataVT && dataVT.phenomena && dataVT.phenomena.length>0 ? dataVT.phenomena: [],
                isSubmit: true
            });
            this.togglePopup();
        }
    };

    render() {
        const {dataInventory, togglePopup,dataDetailVT, Phenomena} = this.state;
        return (
            <View style={styles.container}>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(150)}
                >
                    <View style={{
                        // paddingHorizontal: Scale(16),
                    }}>
                        {dataInventory && dataInventory.inventory && dataInventory.inventory.length>0 && dataInventory.inventory.map((value, idx)=>{
                            return(
                                <SelectProposeItems
                                    onChangeValue={(number)=>this.changeValue(number, index)}
                                    onChangeDetail={()=>this.onViewDetail(value)}
                                    disable={true}
                                    isDetail={true}
                                    disableRemove={true}
                                    viewDetail={true}
                                    isViewDetail={false}
                                    title1={Config.lang('PM_SL')}
                                    value={value}
                                    key={idx}
                                    idx={idx}
                                />
                            )
                        })}
                    </View>
                </CScrollView>

                <Modal isVisible={togglePopup} backdropOpacity={0.4}>
                    <View style={{
                        marginTop: 20,
                        width: '100%',
                        height: Scale(348),
                        backgroundColor: 'white',
                        borderRadius: Scale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: '100%',
                            height: Scale(131, true),
                        }}>

                            <View style={{
                                flex: 1, width: '100%',
                                paddingHorizontal: Scale(16),
                                paddingBottom: Scale(15),
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start'
                            }}>
                                {dataDetailVT && <VatTuComponent
                                    onChangeValue={(number) => this.changeValue(number, index)}
                                    disable={true}
                                    isDetail={true}
                                    disableRemove={true}
                                    value={dataDetailVT}
                                />}
                            </View>
                        </View>
                        <View style={{
                            paddingLeft: Scale(19),
                            width: '100%',
                            height: Scale(172),
                        }}>
                            <Text style={{
                                fontFamily: Config.getFont('Muli-Bold'),
                                fontSize: Scale(16, true),
                                lineHeight: Math.floor(Scale(20, true)),
                                color: '#212121',
                                // marginBottom:Scale(12),
                            }}>
                                {Config.lang('PM_Hien_tuong')}
                            </Text>
                            <View style={{
                                width: '100%',
                                height: Scale(152),
                                paddingVertical: Scale(12)
                            }}>
                                <CScrollViewModal style={{width: '100%', height: '100%'}}
                                    maxHeight={Config.h - Scale(196)}
                                >
                                    {Phenomena && Phenomena.length>0 && Phenomena.map((value, index)=>{
                                    return(
                                        <View key={index} style={{
                                            width: '100%',
                                            height: '100%',
                                            flex: 1,
                                            flexWrap:'wrap'
                                        }}>
                                            <Text style={{
                                                fontFamily: Config.getFont('Muli-Bold'),
                                                fontSize:Scale(16),
                                                color:'#141414',
                                                lineHeight:Math.floor(Scale(24, true))
                                            }}> - {' '}
                                                <Text style={{
                                                    fontFamily: Config.getFont('Muli-Bold'),
                                                    fontSize:Scale(16),
                                                    color:'#141414',
                                                    lineHeight:Math.floor(Scale(24, true))
                                                }}>{value.PhenomenaName}</Text>
                                            </Text>
                                        </View>
                                    )
                                    })
                                    }
                                </CScrollViewModal>
                            </View>
                        </View>
                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            justifyContent:'space-around',
                            alignItems:'center',
                            height: Scale(36)
                        }}>
                            <TouchableOpacity
                                style={{
                                    // width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: Config.gStyle.color_666,
                                    height: Scale(36),
                                }}
                                // onPress={()=>this.changPhenomena(Phenomena)}
                            >
                                <Text style={{
                                    fontSize: Scale(14),
                                    fontFamily: Config.getFont('Roboto-Light'),
                                    color:'#179EFF',
                                    opacity:0.4
                                }}>{Config.lang('PM_Chon_lai').toUpperCase()}</Text>
                            </TouchableOpacity>

                            <View style={{
                                borderWidth:1,
                                borderColor:Config.gStyle.color_border,
                                height:Scale(15),
                            }}/>

                            <TouchableOpacity
                                style={{
                                    // width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // fontSize: Scale(16),
                                    // fontFamily: Config.getFont('Muli'),
                                    color: '#707070',
                                    height: Scale(36),
                                }}
                                onPress={this.togglePopup}>
                                <Text style={{
                                    fontSize: Scale(14),
                                    fontFamily: Config.getFont('Roboto-Light'),
                                    color:'#179EFF',
                                }}>{Config.lang('PM_Xong').toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        height:'100%',
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
        fontSize: Scale(14, true),
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
        getDetailBroken: state.baohong.getDetailBroken
    }),
    (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        baohongAction: bindActionCreators(baohongAction, dispatch),
    })
)(ChiTietVatTuBaoHongScreen);
