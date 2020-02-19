import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
    TextInput, Alert,
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as navigationActions from '../../navigation/redux/navigation_actions.js';
import * as xnnktAction from "../../redux/xac_nhan_nhap_kho/xnnk_actions";
import * as mainActions from "../../redux/main/main_actions";

import Config, {Scale} from '../../config';
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from "../../components/Header";
import CShapeHeader from "../../libs/CShapeHeader/Shape_header";
import CButton from "../../libs/CButton/CButton";
import Dash from "react-native-dash";
import CAttach from "../../libs/CAttach/CAttach";
import CScrollView from "../../libs/CScrollView/CScrollView";
import CImagePicker from "../../libs/CImagePicker/picker_image";
import CAction from "../../libs/CAction/CAction";

class DuyetXacNhanNhapKhoScreen extends Component {

    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.state = ({
            isSubmit: false,
            valueDateFrom: moment().format(this.formatDate),
            valueDateTo: moment().format(this.formatDate),
            dataWHAll: [],
            isTakePic: false,
            loading: false,
            isLoading: false,
            isReject:1,
            imgAva: [],
            dataConfirm: [],
            flag: 1
        });
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            DivisionID: Config.profile.localHost,
        };
    }

    takePic = () => {
        this.setState({
            isTakePic: true
        })
    };

    removeAttach = (idx) => {
        const {imgAva, flag} = this.state;
        let dataTemp = [...imgAva];
        dataTemp.splice(idx, 1);
        this.setState({
            imgAva: dataTemp
        })
    };

    goBack = () => {
        const {imgAva} = this.state;
        if (this.props.navigation.state.params && this.props.navigation.state.params.onChange) this.props.navigation.state.params.onChange(imgAva);
        this.props.navigation.goBack(null);
    };

    componentDidMount() {
        this.getDetail();
    }

    getDetail = () => {
        if (!this.props.navigation.state.params.voucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_du_lieu'));
            return;
        }
        this.setState({loading: true});
        this.props.xnnktAction.getVoucherConfirm({VoucherID: this.props.navigation.state.params.voucherID}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataConfirm: [],
                    loading: false
                });
            } else if(data){
                this.setState({
                    dataConfirm: data,
                    titleVoucher: data && data.Caption ? data.Caption : '',
                    valueVoucher: data && data.OVoucherNo ? data.OVoucherNo : '',
                    loading: false
                });
            }
        })
    };

    uploadImageAsync = ( cb) => {
        const {imgAva} = this.state;
        let attachArrTemp =[];
        if(!imgAva || !imgAva.length) {
            cb && cb([], true);
            return false;
        }
        imgAva.forEach((item, idx)=>{
            attachArrTemp.push({
                FileName: item.FileName,
                FileSize: item.FileSize,
                URL: item.URL,
                isLocal: item.isLocal,
                FileType: item.FileExt
            });
        });
        const formData = new FormData();
        attachArrTemp.forEach((file)=>{
            formData.append('files', {
                uri:file.URL,
                name: file.FileName,
                type: file.FileType,
            });
        });
        this.props.mainActions.uploadFile(formData,'multiple',(err, data)=> {
            if(data && data.paths && data.paths) {
                let dataArr = [];
                data.paths.forEach((itemAtt)=>{
                    dataArr.push({
                        URL : data.domain+'/'+itemAtt.url,
                        FileName : itemAtt.fileName,
                        FileSize : itemAtt.fileSize,
                        FileExt : itemAtt.fileType
                    })
                });
                cb && cb(dataArr, true);
            }
            else if(err){
                Alert.alert('',err.message);
                cb && cb(false);
            }
        });
    };

    onApproval = () => {
        if(this.isSubmit) return;
        this.isSubmit=true;
        const {getDetailConfirmWH} = this.props;
        const inventory = getDetailConfirmWH && getDetailConfirmWH.Inventory && getDetailConfirmWH.Inventory.length>0 ? getDetailConfirmWH.Inventory : [];
        const param = {
            VoucherID: getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.VoucherID ? getDetailConfirmWH.infoGeneral.VoucherID : '',
        };
        if(inventory && inventory.length>0){
            param.inventory = JSON.stringify(inventory);
        }
        if (this.vlDescription) {
            param.AppNote = this.vlDescription;
        }
        this.setState({
            isSubmit: true,
            isLoading: true,
            isReject:0,
        });
        this.props.xnnktAction.appVoucherConfirm(param, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({isLoading: false, isSubmit: false,});
                return false;
            } else if (data) {
                this.uploadImageAsync((dataAttach) => {//upload attachment to cdn
                    if (dataAttach) {
                        const params = {
                            KeyID: data.VoucherID,
                            TableName: data.TableName,
                        };
                        if(dataAttach.length>0){
                            params.arrAttachment = dataAttach;
                            // this.setState({isSubmit: true, isLoading: true});
                            this.props.mainActions.attachPropose({params: JSON.stringify(params)}, (err1, data1) => { //save attachment to Propose
                                if (data1) {
                                    this.props.xnnktAction.getDetailConfirmWH({VoucherID: data.VoucherID});
                                    this.props.xnnktAction.getListConfirmWH();
                                    this.props.xnnktAction.getListWaitingWH();
                                    this.props.xnnktAction.getListAllWH();
                                    this.props.navigationActions.changeScreen('ChiTietNhapKhoTabScreen', {VoucherID: data.VoucherID, StatusID: data.StatusID});
                                    this.props.navigation.state.params.onBackParent(data.StatusID);
                                    this.setState({isSubmit: false, isLoading: false, isReject:1});
                                } else {
                                    // console.log("att k thành công");
                                    Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                    this.setState({isSubmit: false, isLoading: false, isReject:1});
                                }
                            });
                        }
                        else{
                            this.props.xnnktAction.getDetailConfirmWH({VoucherID: data.VoucherID});
                            this.props.xnnktAction.getListConfirmWH();
                            this.props.xnnktAction.getListWaitingWH();
                            this.props.xnnktAction.getListAllWH();
                            this.props.navigationActions.changeScreen('ChiTietNhapKhoTabScreen', {VoucherID: data.VoucherID, StatusID: data.StatusID});
                            this.props.navigation.state.params.onBackParent(data.StatusID);
                            this.setState({isSubmit: false, isLoading: false, isReject:1});
                        }

                    }
                    // else this.clearState();
                });
                this.setState({isSubmit: false, isLoading: false, isReject:1});
            }
        });

    };

    onSaveReject = () => {
        const {getDetailConfirmWH} = this.props;
        const statusID = getDetailConfirmWH && getDetailConfirmWH.infoGeneral && getDetailConfirmWH.infoGeneral.StatusID ? getDetailConfirmWH.infoGeneral.StatusID : '';
        this.props.xnnktAction.getDetailConfirmWH({VoucherID: this.props.navigation.state.params.voucherID, StatusID: statusID});
        this.props.navigation.goBack();
    };


    render() {
        const {imgAva, flag, titleVoucher, valueVoucher, loading, isLoading, isReject} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        customClass={{
                            backgroundColor: '#FFFFFF',
                        }}
                        showBack={true}
                        headerName={Config.lang('PM_Xac_nhan_nhap_kho')}
                        colorBtnRight={Config.gStyle.color_def1}
                />
                <CShapeHeader title={Config.lang(titleVoucher)}
                              value={valueVoucher}
                              isLoading={loading}
                />
                <CScrollView style={{width: '100%', height: '100%',}}
                             maxHeight={Config.h - Scale(182)}
                >
                    <View style={styles.viewApproval}>
                        <Text style={styles.textNote}>
                            {Config.lang("PM_Ghi_chu")}
                        </Text>
                        <TextInput style={styles.textApproval}
                                   multiline={true}
                                   numberOfLines={6}
                                   onChangeText={vl => this.vlDescription = vl}
                                   placeholder={Config.lang("PM_Dong_y_duyet")}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        paddingTop: Scale(16),
                        paddingHorizontal: Scale(16)
                    }}>
                        <TouchableOpacity style={{
                            height: Scale(36),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                            // onPress={() => this.onSave('reject')}
                        >
                            <Icon name={'paperclip'} size={Scale(15)} color={"black"}/>

                            <CButton width={120}
                                     height={25}
                                     style={{
                                         flexDirection: 'column',
                                     }}
                                     styleCustomText={{
                                         fontSize: Scale(16),
                                         fontFamily: Config.getFont('Muli'),
                                         fontWeight: '100',
                                         lineHeight: Math.floor(Scale(20)),
                                         color: '#212121',
                                     }}
                                     text={Config.lang('PM_Dinh_kem_file')}
                                     onPress={this.takePic}
                            >
                                <Dash dashColor={'#707070'}
                                      dashGap={4}
                                      dashThickness={1}
                                      dashLength={4}
                                      style={{
                                          width: Scale(120),
                                          height: 1,
                                          position: 'absolute',
                                          left: Scale(-10),
                                          bottom: 0,
                                          flexDirection: 'row',
                                      }}/>
                            </CButton>
                        </TouchableOpacity>
                    </View>
                    {imgAva && imgAva && imgAva.length > 0 && <View style={{}}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1, flexWrap: 'wrap',
                        }}>
                            {flag && <CAttach onLink={false} removeAttach={this.removeAttach} data={imgAva}/>}
                        </View>
                    </View>}
                </CScrollView>

                <CAction isApproval={0}
                         isReject={isReject}
                         titleReject={Config.lang('PM_Huy')}
                         isHistory={false}
                         isLoading={isLoading}
                         isSubmit={false}
                         onApproval={()=>this.onApproval('approval')}
                         onSaveReject={this.onSaveReject}
                    // onLink={()=>this.onLink('LichSuDuyetDonHangMuaScreen')}
                />

                {this.state.isTakePic &&
                <CImagePicker
                    onHide={() => {
                        this.setState({isTakePic: !this.state.isTakePic})
                    }}
                    // onLoading={()=>{this.setState({loading: true})}}
                    onImageUri={(data) => {
                        let dataTemp = [...imgAva];
                        dataTemp = dataTemp.concat(data);
                        this.setState({
                            isTakePic: false, imgAva: dataTemp, flag: flag + 1
                        })
                    }}
                />
                }
            </View>
        );
    }
}

export default connect(state => ({
        getDetailConfirmWH: state.xnnk.getDetailConfirmWH,
        getVoucherConfirm: state.xnnk.getVoucherConfirm
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnnktAction: bindActionCreators(xnnktAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
    })
)(DuyetXacNhanNhapKhoScreen);

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F5F5',
    },
    viewApproval: {
        width: '100%',
        paddingHorizontal: Scale(15),
        paddingTop: Scale(26),
    },
    textNote: {
        fontSize: Scale(20),
        color: '#212121',
        fontFamily: Config.getFont('Roboto-Bold'),
        lineHeight: Math.floor(Scale(26)),
        paddingBottom: Scale(12),
    },
    textApproval: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Roboto'),
        lineHeight: Math.floor(Scale(24)),
        color: 'rgba(0,0,0,0.87)',
        width: '100%',
        height: Scale(135),
        borderTopLeftRadius: Scale(16),
        borderBottomRightRadius: Scale(16),
        textAlignVertical: 'top',
        padding: Scale(15),
        backgroundColor: '#FFFFFF',
    },
    viewTouchApproval: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: Scale(54),
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: Scale(16),
    },
    touchApproval: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#179EFF',
        width: Scale(164),
    },
    textTouchApproval: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(18),
        color: '#FFFFFF',
    },
    viewTouchReject: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: Scale(16),
    },
    touchReject: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTouchReject: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(18),
        color: '#212121',
    },
};

