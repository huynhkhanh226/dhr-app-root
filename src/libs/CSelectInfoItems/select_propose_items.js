import React from 'react';
import {
    TouchableOpacity,
    View,
    Text, Image,
} from 'react-native';
import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CImage from "../CImage/CImage";
import SelectQuanity from "../CSelectedQuanity/Select-Quanity";
import Swipeout from "react-native-swipeout";
import moment from 'moment';
import CDate from "../CDate/CDate";
import {SAGA_ACTION} from "redux-saga/utils";

class SelectProposeItems extends React.PureComponent {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.getDateS = moment().add(1, 'day').format(this.formatDate);
        this.state = ({
            isSubmit: false,
            supplyDate: props.value.SupplyDate || null,
        });
    }

    componentWillReceiveProps = (nextProps) => {
        const nextP = nextProps.value && nextProps.value.SupplyDate ? nextProps.value.SupplyDate : null;
        const supplyDate = this.props.value && this.props.value.SupplyDate ? this.props.value.SupplyDate : null;
        if (nextP !== supplyDate) {
            this.setState({
                supplyDate: nextP
            });
        }
    };

    onChangeValue = (number) => {
        if (this.props.onChangeValue) this.props.onChangeValue(number);
    };

    onChangeDate = (date) => {
        this.setState({
            supplyDate: date
        }, () => {
            if (this.props.onChangeDate) this.props.onChangeDate(this.state.supplyDate);
        });
    };

    onChangeDetail = () => {
        if (this.props.onChangeDetail) this.props.onChangeDetail();
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

        const {value, disable, disableRemove, isDetail, title1, title2, titleDate,viewDetail, title3, isViewDetail, isView} = this.props;
        const {supplyDate} = this.state;
        return (
            <View style={styles.viewSwi}>
                <Swipeout style={{flex:1}} disabled={disableRemove} backgroundColor="white" right={swiPeOutButton}>
                    <View style={styles.ViewSwiContainerDate}>
                        <View style={{
                            width: '35%',
                            padding: Scale(5),
                            height:'100%',
                            flexDirection:'row',
                            alignItems:'center',
                        }}>
                            <View style={{
                                width:'100%',
                            }}>
                                <CImage source={value.PictureURL}
                                        style={styles.viewCImage}
                                        width={86} height={86}
                                        resizeMode="contain"
                                />
                                {viewDetail && <TouchableOpacity onPress={this.onChangeDetail} style={{
                                    position: 'absolute',
                                    bottom:0,
                                    width: Scale(86),
                                    height:Scale(43),
                                    backgroundColor: 'rgba(255,0,0,0.6)',
                                    // backgroundColor:'#FF0000',
                                    borderBottomRightRadius: Scale(10),
                                    borderBottomLeftRadius: Scale(10),
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    // opacity:0.62
                                }}>
                                    {!isView && <Text style={{
                                        fontSize:Scale(14, true),
                                        fontFamily: Config.lang('Muli-Bold'),
                                        color:'#FFFFFF',
                                        // opacity:1,
                                        textAlign:'center',
                                        lineHeight:Math.floor(Scale(24, true))
                                    }}>{Config.lang('PM_Xem_chi_tiet')}</Text>}
                                    {(isViewDetail && !!isView) && <Icon name={'exclamation'} size={Scale(16, true)} color={"#FFFFFF"}/>}

                                </TouchableOpacity>}
                            </View>
                        </View>
                        <View style={[styles.viewSwiContent,{width:!disable ? '50%' : '65%'}]}>
                            <Text numberOfLines={2} style={styles.textViewHeader}>{value.InventoryName}</Text>
                            <Text numberOfLines={1} style={styles.textViewContent}>
                                {Config.lang('PM_Ma')} {value.InventoryID}</Text>
                            {(isDetail || title1) && <Text numberOfLines={1} style={styles.textViewFooter}>
                                {title1 ? title1 : Config.lang('PM_So_luong_xuat')}
                                {value && value.OQuantity ? value.OQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>}
                            {(isDetail && title2) && <Text numberOfLines={1} style={styles.textViewFooter}>
                                {title2 ? title2 : Config.lang('PM_So_luong_xuat')}
                                {value && value.ActualOQuantity ? value.ActualOQuantity : 0}{' '}
                                {value.UnitName}
                            </Text>}
                            {title3 && <Text numberOfLines={1} style={styles.textViewFooter}>
                                {title3}
                                <Text style={{
                                    fontWeight:'bold',
                                }}>
                                    {value && value.WHQuantity ? value.WHQuantity : 0}{' '}
                                </Text>
                                {value.UnitName}
                            </Text>}
                            {!isDetail && !title2 && !title3 && <Text numberOfLines={1} style={styles.textViewFooter}>
                                {Config.lang('PM_Don_vi')}
                                {value.UnitName}
                            </Text>}
                            {isDetail && <Text numberOfLines={1} style={styles.textViewContent}>
                                {titleDate ? titleDate : Config.lang('PM_Ngay_can')}
                                {value.SupplyDate}
                            </Text>}
                            {!isDetail &&
                            <View style={{
                                justifyContent: 'flex-start',
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: Scale(24),
                                borderRadius: Scale(12),
                                backgroundColor: '#2680EB',
                                paddingLeft: Scale(4),
                            }}>
                                <Text style={{
                                    textAlign:'center',
                                    fontSize: Scale(14, true),
                                    fontFamily: Config.getFont('Muli'),
                                    color: '#F1F1F1',
                                    // backgroundColor:'red',
                                    lineHeight: Math.floor(Scale(20, true)),
                                }}>{Config.lang("PM_Ngay_can")}</Text>
                                <CDate date={supplyDate}
                                       onDateChange={(date) => {
                                           this.onChangeDate(date)
                                       }}
                                       style={{width:'100%'}}
                                       minimumDate={this.getDateS}
                                       customStyles={{
                                           dateInput: {
                                               alignItems: 'flex-start',
                                               borderWidth: 0,
                                           },
                                           dateText: {
                                               color: '#F1F1F1',
                                               fontSize: Scale(14),
                                               // backgroundColor:'green',
                                               // lineHeight: Math.floor(Scale(20, true)),
                                           },
                                       }}
                                       iconSource={false}
                                       placeholder={' '}
                                       format={'DD/MM/YYYY'}
                                />
                            </View>}
                        </View>
                        <View style={{width: '15%', height: '90%',}}>
                            {!disable && <SelectQuanity
                                free={true}
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

const styles = {
    viewSwi: {
        marginTop: Scale(15),
        paddingHorizontal: Scale(15),
        width: '100%',
        // height: Scale(116),
    },
    ViewSwiContainerDate: {
        width: '100%',
        // height: Scale(116),
        flexDirection: 'row',
        // flexWrap: 'wrap',
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
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: Scale(5),
        paddingVertical: Scale(10),
        fontFamily: Config.getFont('Muli-Regular'),
        height: '100%',
    },
    textViewHeader: {
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(14),
        color: '#212121',
        lineHeight: Math.floor(Scale(20)),
    },
    textViewContent: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(14),
        color: '#212121',
        lineHeight: Math.floor(Scale(20)),
    },
    textViewFooter: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(14, true),
        color: '#212121',
        lineHeight: Math.floor(Scale(20)),
    },
    // textDate: {
    //     width: '40%',
    //     fontSize: Scale(16),
    //     fontFamily: Config.getFont('Roboto'),
    //     color: 'rgba(0,0,0,0.87)',
    //     lineHeight: Math.floor(Scale(24)),
    // },
    // viewCDate: {
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
};

export default SelectProposeItems;
