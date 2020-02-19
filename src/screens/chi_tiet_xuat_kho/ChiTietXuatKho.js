import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as xkvtAction from "../../redux/xuat_kho_vat_tu/xkvt_actions";
import * as navigationActions from "../../navigation/redux/navigation_actions";

import Config, {Scale} from '../../config';
import SelectInfoItems from "../../libs/CSelectInfoItems/select_info_items";
import Header from "../../components/Header";
import ScrollView from '../../libs/CScrollView/CScrollView'

import moment from 'moment';
import IconAwe from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";

class ChiTietXuatKhoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            value: moment('2019-09-06T02:09:22.143Z').format('DD/MM/YYYY'),
            count: 0,
            countQn: 0,
            countQnTotal: 900,
            getDetailExportWH: null,
            isModalVisible: true,
            modalVisible: false,
            togglePopup: false
        });
    }

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        let params = {
            VoucherID: this.props.navigation.state.params.id || '',
        };
        this.props.xkvtAction.getDetailExportWH(params, (error, data) => {
            if(error){
                Config.alertMess({code:'', message: error.message});
                this.setState({isSubmit: false});
            }
        });
    };

    togglePopup = () => {
        this.setState({
            togglePopup: !this.state.togglePopup
        })
    };

    goLink = () => {
        this.togglePopup();
        this.props.navigationActions.changeScreen('XuatKhoVatTuScreen',{id: this.props.navigation.state.params.id, reload:this.getDetail});
    };

    onRemove = () => {
        const {getDetailExportWH} = this.props;
        this.togglePopup();
            this.props.xkvtAction.removeExportWH({VoucherID:getDetailExportWH.VoucherID}, (error, data) => {
                if(error){
                    Config.alertMess({code:'', message: error.message});
                }
                else if(data){
                    if(this.props.navigation.state.params.reload){
                        this.props.navigation.state.params.reload();
                        this.props.navigation.goBack();
                    }
                }
            })
    };

    render() {
        const {getDetailExportWH} = this.props;
        const {togglePopup} = this.state;
        const dataTemp = {
            master: [
                {
                    title: Config.lang('PM_Du_an'),
                    value: getDetailExportWH && getDetailExportWH.ProjectName? getDetailExportWH.ProjectName : '',
                },
                {
                    title: Config.lang('PM_Nguoi_xuat'),
                    value: getDetailExportWH && getDetailExportWH.EmployeeName? getDetailExportWH.EmployeeName : '',
                },
                {
                    title: Config.lang('PM_Ngay_xuat'),
                    value: getDetailExportWH && getDetailExportWH.VoucherDate ? moment(getDetailExportWH.VoucherDate).format('DD/MM/YYYY') : null,
                },
                {
                    title: Config.lang('PM_Kho_xuat'),
                    value: getDetailExportWH && getDetailExportWH.WHName ? getDetailExportWH.WHName : '',
                },
                {
                    title: Config.lang('PM_Ghi_chu'),
                    value: getDetailExportWH && getDetailExportWH.Description ? getDetailExportWH.Description : '',
                },
            ],
        };
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{borderBottomWidth:1, borderBottomColor:Config.gStyle.color_border, height: Scale(43)}}
                        headerName={Config.lang('PM_Chi_tiet_xuat_kho')}/>

                <TouchableOpacity onPress={this.togglePopup}
                                  hitSlop={{top: Scale(10),bottom:Scale(10),left:Scale(10),right:Scale(10)}}
                                  style={{
                                        position: 'absolute',
                                        top:Scale(10),
                                        right:Scale(18)
                                  }}
                >
                    <IconAwe name={'ellipsis-v'} size={Scale(22)}/>
                </TouchableOpacity>

                <Modal isVisible={togglePopup} backdropOpacity={0.4}>
                    <View style={{
                        marginTop: 22, width: Scale(328),
                        height: Scale(147),
                        backgroundColor: 'white',
                        borderRadius: Scale(10),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={styles.btnPopup}
                            onPress={this.onRemove}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Xoa')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnPopup}
                            onPress={this.goLink}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Chinh_sua')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnPopup, {borderBottomWidth: 0}]}
                            onPress={this.togglePopup}>
                            <Text style={styles.txtPopup}>{Config.lang('PM_Huy')}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <ScrollView style={{flex: 1, width: '100%'}} maxHeight={Config.h - Scale(43)}>
                    <View style={{paddingHorizontal: Scale(16), paddingVertical: Scale(14)}}>
                        <View style={styles.viewContent}>
                            {dataTemp && dataTemp.master && dataTemp.master.length>0 && dataTemp.master.map((val, idx)=>{
                                return(
                                    <View key={idx} style={styles.viewContentDetail}>
                                        <Text style={styles.textContent}>
                                            {val.title}
                                        </Text>
                                        <View style={styles.viewTextDetailVl}>
                                            {!getDetailExportWH && <ActivityIndicator size="small" color="#707070"/>}
                                            <Text numberOfLines={1} style={styles.textContent}>
                                                {val.value}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                        <View style={{flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'flex-start'}}>
                        {getDetailExportWH && getDetailExportWH.Inventory && getDetailExportWH.Inventory.length>0 && getDetailExportWH.Inventory.map((item, idx)=>{
                            return(
                                <SelectInfoItems value={item}
                                                 key={idx}
                                                 title2={Config.lang('PM_So_luong_xuat')}
                                                 isDetail={true}
                                                 disable={true}
                                                 disableRemove={true}
                                />
                            )
                        })}
                        </View>
                    </View>
                </ScrollView>
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
    viewContent: {
        height: Scale(140),
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: Scale(10),
    },
    viewContentDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    textContent: {
        color: '#323232',
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(30)),
    },
    txtPopup:{
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
    },
    btnPopup:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        fontSize:Scale(16),
        fontFamily:Config.getFont('Muli'),
        color: Config.gStyle.color_666,
        height: Scale(48),
        borderBottomWidth:1,
        borderBottomColor: Config.gStyle.color_border
    }
};

export default connect(state => ({
        getDetailExportWH: state.xkvt.getDetailExportWH,
    }),
    (dispatch) => ({
        xkvtAction: bindActionCreators(xkvtAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(ChiTietXuatKhoScreen);
