import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
    TextInput, Alert, ActivityIndicator,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as xntsdnAction from "../../redux/xac_nhan_tai_san_da_nhan/xntsdn_actions";
import * as xncmtsAction from "../../redux/xac_nhan_cho_muon_tai_san/xncmts_actions";
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
import CDate from "../../libs/CDate/CDate";

class DuyetXacNhanTaiSanDaNhanScreen extends Component {

    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.state = ({
            isSubmit: false,
            recordDate: moment().format(this.formatDate),
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
        const {imgAva} = this.state;
        const {recordDate} = this.state;
        const dataInventory = this.props.navigation.state.params.inventory ? this.props.navigation.state.params.inventory : {};
        const valueParam = dataInventory && dataInventory.infoGeneral ? dataInventory.infoGeneral : {};
        const inventory = dataInventory && dataInventory.Inventory ? dataInventory.Inventory : [];
        const oBatchID = valueParam && valueParam.OBatchID ? valueParam.OBatchID : '';
        if(inventory && inventory.length>0){
            inventory.map((vl, index)=>{
                return vl.ReturnDate = vl && vl.ReturnDate ? moment(vl.ReturnDate, this.formatDate).format('YYYY-MM-DD') : null
            })
        }
        const param = {
            OBatchID: oBatchID,
            VoucherNo: valueParam && valueParam.VoucherNo ? valueParam.VoucherNo : '',
            RequestDate: valueParam && valueParam.RequestDate ? moment(valueParam.RequestDate).format('YYYY-MM-DD') : null,
            BorrowDate: valueParam && valueParam.BorrowDate ? moment(valueParam.BorrowDate).format('YYYY-MM-DD') : null,
            BorrowProjectID: valueParam && valueParam.BorrowProjectID ? valueParam.BorrowProjectID : '',
            BorrowProjectName: valueParam && valueParam.BorrowProjectName ? valueParam.BorrowProjectName : '',
            LendProjectID: valueParam && valueParam.LendProjectID ? valueParam.LendProjectID : '',
            LendProjectName: valueParam && valueParam.LendProjectName ? valueParam.LendProjectName : '',
            EmployeeID: valueParam && valueParam.EmployeeID ? valueParam.EmployeeID : '',
            EmployeeName: valueParam && valueParam.EmployeeName ? valueParam.EmployeeName : '',
            Notes: valueParam && valueParam.Notes ? valueParam.Notes : '',
            ReasonID: valueParam && valueParam.ReasonID ? valueParam.ReasonID : '',
            RecordDate: moment(recordDate, this.formatDate).format('YYYY-MM-DD'),
            ApprovalNote: this.vlDescription,
            inventory: JSON.stringify(inventory),
        };
        this.setState({
            isSubmit: true,
            isLoading: true,
            isReject:0,
        });
        this.props.xncmtsAction.getNewIDConfirmBorrow({FormID: 'A54F2582'}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({isLoading: false, isSubmit: false, isReject: 1});
                return false;
            } else if (data) {
                if (imgAva && imgAva.length) {
                    this.uploadImageAsync((dataAttach) => {//upload attachment to cdn
                        if (dataAttach) {
                            const params = {
                                KeyID: data.VoucherID,
                                TableName: data.TableName,
                                Key2ID: oBatchID,
                            };
                            if(dataAttach.length>0){
                                params.arrAttachment = dataAttach;
                                this.props.mainActions.attachPropose({params: JSON.stringify(params)}, (err1, data1) => { //save attachment to Propose
                                    if (data1) {
                                        param.VoucherID = data.VoucherID;
                                        this.props.xntsdnAction.AppRVoucherReceived(param, (errApp, dataApp) => {
                                            if (errApp) {
                                                let errorCode = errApp.code || null;
                                                let message = "";
                                                switch (errorCode) {
                                                    case "F2562E009":
                                                        message =  Config.lang("PM_Duyet_khong_thanh_cong");
                                                        break;
                                                    case "F2562E001":
                                                        message = Config.lang("PM_Khong_tim_thay_VoucherID");
                                                        break;
                                                    case "F2562E004":
                                                        message = Config.lang("PM_Khong_tim_thay_OBatchID");
                                                        break;
                                                    case "F2562E005":
                                                        message = Config.lang("PM_Khong_tim_thay_VoucherNO");
                                                        break;
                                                    default:
                                                        message = errApp.message ||Config.lang("PM_Loi_chua_xac_dinh");
                                                        break;
                                                }
                                                Config.alertMess({code: '', message: errApp.message});
                                                this.setState({isLoading: false, isSubmit: false, isReject: 1});
                                                return false;
                                            } else if (dataApp) {
                                                this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: data.VoucherID});
                                                this.props.xntsdnAction.getListConfirmReceived();
                                                this.props.xntsdnAction.getListWaitingReceived();
                                                this.props.xntsdnAction.getListAllReceived();
                                                this.props.navigationActions.changeScreen('ChiTietXNTaiSanDaNhanTabScreen', {VoucherID: data.VoucherID});
                                                this.setState({isSubmit: false, isLoading: false, isReject:1});
                                            }
                                        });
                                    } else {
                                        Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                        this.setState({isSubmit: false, isLoading: false, isReject:1});
                                    }
                                });
                            }
                            else{
                                this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: data.VoucherID});
                                this.props.xntsdnAction.getListConfirmReceived();
                                this.props.xntsdnAction.getListWaitingReceived();
                                this.props.xntsdnAction.getListAllReceived();
                                this.props.navigationActions.changeScreen('ChiTietXNTaiSanDaNhanTabScreen', {VoucherID: data.VoucherID});
                                this.setState({isSubmit: false, isLoading: false, isReject:1});
                            }

                        }else {
                            this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: data.VoucherID});
                            this.props.xntsdnAction.getListConfirmReceived();
                            this.props.xntsdnAction.getListWaitingReceived();
                            this.props.xntsdnAction.getListAllReceived();
                            this.props.navigationActions.changeScreen('ChiTietXNTaiSanDaNhanTabScreen', {VoucherID: data.VoucherID});
                            this.setState({isSubmit: false, isLoading: false, isReject:1});
                        }
                    });
                } else {
                    param.VoucherID = data.VoucherID;
                    this.props.xntsdnAction.AppRVoucherReceived(param, (errApp1, dataApp1) => {
                        if (errApp1) {
                            let errorCode = errApp1.code || null;
                            let message = "";
                            switch (errorCode) {
                                case "F2562E009":
                                    message =  Config.lang("PM_Duyet_khong_thanh_cong");
                                    break;
                                case "F2562E001":
                                    message = Config.lang("PM_Khong_tim_thay_VoucherID");
                                    break;
                                case "F2562E004":
                                    message = Config.lang("PM_Khong_tim_thay_OBatchID");
                                    break;
                                case "F2562E005":
                                    message = Config.lang("PM_Khong_tim_thay_VoucherNO");
                                    break;
                                default:
                                    message = errApp1.message ||Config.lang("PM_Loi_chua_xac_dinh");
                                    break;
                            }
                            Config.alertMess({code: '', message: errApp1.message});
                            this.setState({isLoading: false, isSubmit: false, isReject: 1});
                            return false;
                        } else if (dataApp1) {
                            this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: data.VoucherID});
                            this.props.xntsdnAction.getListConfirmReceived();
                            this.props.xntsdnAction.getListWaitingReceived();
                            this.props.xntsdnAction.getListAllReceived();
                            this.props.navigationActions.changeScreen('ChiTietXNTaiSanDaNhanTabScreen', {VoucherID: data.VoucherID});
                            this.setState({isSubmit: false, isLoading: false, isReject:1});
                        }
                    });
                }
            }
        });
    };

    onSaveReject = () => {
        if (!this.props.navigation.state.params.voucherID) {
            Alert.alert('', Config.lang('PM_Khong_tim_thay_id'));
            return;
        }
        this.props.xntsdnAction.getDetailConfirmReceived({VoucherID: this.props.navigation.state.params.voucherID});
        this.props.navigation.goBack();
    };

    onChangeRecordDate = (date) => {
        this.setState({
            recordDate: date
        })
    };


    render() {
        const {imgAva, flag, isLoading, isReject, Caption, loading} = this.state;
        const {getDetailConfirmReceived} = this.props;
        const VoucherNo = getDetailConfirmReceived && getDetailConfirmReceived.infoGeneral && getDetailConfirmReceived.infoGeneral.VoucherNo ? getDetailConfirmReceived.infoGeneral.VoucherNo : '';
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        customClass={{
                            backgroundColor: '#FFFFFF',
                        }}
                        showBack={true}
                        headerName={Config.lang('PM_Xac_nhan_tai_san_da_nhan')}
                        colorBtnRight={Config.gStyle.color_def1}
                />
                <CShapeHeader title={'Phiếu yc mượn mmtb'}
                              value={VoucherNo}
                              isLoading={loading}
                />
                <CScrollView style={{width: '100%', height: '100%',}}
                             maxHeight={Config.h - Scale(182)}
                >

                    <View style={styles.viewDateContainer}>
                        <View style={{width: '100%', paddingHorizontal: Scale(15)}}>
                            <View style={styles.viewDate}>
                                <Text style={styles.textDate}>{Config.lang("PM_Ngay_cho_muon")}</Text>
                                <View style={styles.viewCDate}>
                                    {!loading && <CDate date={!loading ? this.state.recordDate : null}
                                        // minimumDate={requestDate && requestDate > this.getDate ? new Date(moment(requestDate, this.formatDate).toDate()) : this.getDate}
                                                          minimumDate={moment().add(1, 'day').format(this.formatDate)}
                                                          onDateChange={(date) => {
                                                              this.onChangeRecordDate(date)
                                                          }}
                                                          customStyles={{
                                                              dateInput: {
                                                                  alignItems: 'flex-end',
                                                                  borderWidth: 0,
                                                                  height: Scale(25)
                                                              },
                                                              dateText: {
                                                                  color: '#707070',
                                                                  fontSize: Scale(16, true),
                                                                  fontFamily: Config.getFont('Roboto-Bold')
                                                              },
                                                          }}
                                                          iconSource={false}
                                                          placeholder={' '}
                                                          format={'DD/MM/YYYY'}
                                                          style={{
                                                              zIndex: 1, flex: 3, paddingHorizontal: Scale(8),
                                                              position: 'absolute', right: Scale(8), width: Scale(280),
                                                          }}
                                    />}
                                    {loading &&
                                    <ActivityIndicator style={{marginRight: Scale(10)}} size="small" color="#707070"/>}
                                    <Icon name={'chevron-right'} size={Scale(16)} color={"#707070"}/>
                                </View>
                            </View>
                        </View>
                    </View>

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
                         onApproval={this.onApproval}
                         onSaveReject={this.onSaveReject}
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
        getDetailConfirmReceived: state.xntsdn.getDetailConfirmReceived,
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xntsdnAction: bindActionCreators(xntsdnAction, dispatch),
        xncmtsAction: bindActionCreators(xncmtsAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
    })
)(DuyetXacNhanTaiSanDaNhanScreen);

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
        paddingTop: Scale(10),
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
    viewDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Scale(50),
        width: '100%',
        alignItems: 'center',
    },
    viewDate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: '#CECECE',
        // borderBottomWidth: 1,
        justifyContent: 'space-between',
        height: '100%',
    },
    textDate: {
        width: '40%',
        fontSize: Scale(16, true),
        fontFamily: Config.getFont('Roboto'),
        color: 'rgba(0,0,0,0.87)',
        lineHeight: Math.floor(Scale(24, true)),
        flex: 1,
        zIndex: 0,
    },
    viewCDate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '60%',
    },
};

