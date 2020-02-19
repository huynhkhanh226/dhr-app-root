import React, {Component} from 'react';
import {
    ActivityIndicator, Alert,
    Text,
    TextInput,
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import SelectItem from "../../libs/CSelectedItem/Select-Item"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as thvktAction from '../../redux/tra_hang_ve_kho_tong/thvkt_actions';
import * as mainActions from '../../redux/main/main_actions';
import * as navigationActions from "../../navigation/redux/navigation_actions";
import CDate from "../../libs/CDate/CDate";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CButton from "../../libs/CButton/CButton";
import moment from 'moment';
import Header from "../../components/Header";
import CLoading from "../../libs/CLoading/CLoading";

class TraHangVeKhoScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.state = ({
            isLoading: false,
            idParam: true,
            isStatus: false,
            requestDate: this.getDate,
            supplyDate: moment().add(1, 'day').format(this.formatDate),
            StatusName: '',
            getDetailMDIVoucher: null,
            attachArr:[],
            isSubmit: false
        });
        this.WareHouseID = '';
    }

    componentDidMount() {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        this.getDetail();
        if (!idParam){
        this.getStatus();
        this.getCbDefault();
        }
    }

    getCbDefault = () => {
        this.setState({isLoading: true});
        this.props.thvktAction.getCbDefaultMDIVoucher({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
                getDetailMDIVoucherTemp.ProjectID = data.ProjectID ? data.ProjectID : '';
                getDetailMDIVoucherTemp.ProjectName = data.ProjectName ? data.ProjectName : '';
                getDetailMDIVoucherTemp.EmployeeID = data.EmployeeID ? data.EmployeeID : '';
                getDetailMDIVoucherTemp.EmployeeName = data.EmployeeName ? data.EmployeeName : '';
                getDetailMDIVoucherTemp.MDIReasonID = data.MDIReasonID ? data.MDIReasonID : '';
                getDetailMDIVoucherTemp.MDIReasonName = data.MDIReasonName ? data.MDIReasonName : '';
                getDetailMDIVoucherTemp.WareHouseID = data.WareHouseID ? data.WareHouseID : '';
                getDetailMDIVoucherTemp.WareHouseName = data.WareHouseName ? data.WareHouseName : '';
                getDetailMDIVoucherTemp.inventoryDetail = [];
                this.WareHouseID = data.WareHouseID ? data.WareHouseID : '';
                this.setState({
                    getDetailMDIVoucher: getDetailMDIVoucherTemp,
                    isLoading: false,
                })
            }
        });
    };


    getStatus = () => {
        this.setState({isLoading: true});
        this.props.thvktAction.getListStatus({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    StatusName: '',
                    isLoading: false,
                });
            } else if (data) {
                this.setState({
                    StatusName: data && data.MDIStatusName ? data.MDIStatusName : '',
                    isLoading: false,
                });
            }
        });
    };

    getDetail = () => {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        if (!idParam) {
            return;
        }
        const params = {
            MDIVoucherID: idParam,
        };
        this.setState({isLoading: true});
        this.props.thvktAction.getDetailMDIVoucher(params, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    getDetailMDIVoucher: null,
                    isLoading: false});
                return false;
            } else if (data) {
                this.setState({
                    getDetailMDIVoucher: data,
                    requestDate: data && data.MDIVoucherDate ? moment(data.MDIVoucherDate).format('DD/MM/YYYY') : null,
                    supplyDate: data && data.SupplyDate ? data.SupplyDate : null,
                    StatusName: data && data.MDIStatusName ? data.MDIStatusName : '',
                    attachArr: data && data.attachment ? data.attachment : [],
                    isLoading: false,
                })
            }
        });
    };

    onLink = (name, func) => {
        const {getDetailMDIVoucher, attachArr} = this.state;
        const mDIReasonID = getDetailMDIVoucher && getDetailMDIVoucher.MDIReasonID ? getDetailMDIVoucher.MDIReasonID : '';
        const projectID = getDetailMDIVoucher && getDetailMDIVoucher.ProjectID ? getDetailMDIVoucher.ProjectID : '';
        const wareHouseID = getDetailMDIVoucher && getDetailMDIVoucher.WareHouseID ? getDetailMDIVoucher.WareHouseID : '';
        const employeeID = getDetailMDIVoucher && getDetailMDIVoucher.EmployeeID ? getDetailMDIVoucher.EmployeeID : '';
        const inventory = getDetailMDIVoucher && getDetailMDIVoucher.inventoryDetail ? getDetailMDIVoucher.inventoryDetail : [];
        const attachment = attachArr ? attachArr : [];

        if (name === 'ChonNguyenNhanScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, MDIReasonID: mDIReasonID});
        } else if (name === 'DuAnScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, ProjectID: projectID});
        } else if(name === 'KhoScreen'){
            if(!projectID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_du_an')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, id: projectID, WareHouseID: wareHouseID});
        } else if (name === 'NhanVienDeXuatScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, EmployeeID: employeeID});
        } else if (name === 'DanhSachVatTuTHVKTScreen') {
            if(!wareHouseID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            else this.props.navigationActions.changeScreen(name, {onChange: func,id: wareHouseID, Inventory: inventory});
        } else if (name === 'ChonVatTuTHVKTScreen') {
            if(!this.WareHouseID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            else this.props.navigationActions.changeScreen(name, {onChange: func,id: this.WareHouseID, Inventory: inventory});
        }else if (name === 'DinhKemScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, Attachment: attachment});
        }
    };

    onChangeNguyenNhan = (info) => {
        let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
        getDetailMDIVoucherTemp.MDIReasonID = info.MDIReasonID;
        getDetailMDIVoucherTemp.MDIReasonName = info.MDIReasonName;
        this.setState({
            getDetailMDIVoucher: getDetailMDIVoucherTemp,
        })
    };

    onChangeDuAn = (info) => {
        let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
        getDetailMDIVoucherTemp.ProjectID = info.ProjectID;
        getDetailMDIVoucherTemp.ProjectName = info.ProjectName;
        getDetailMDIVoucherTemp.WareHouseID = '';
        getDetailMDIVoucherTemp.WareHouseName = '';
        this.WareHouseID = info.WareHouseID ? info.WareHouseID : '';
        this.setState({
            getDetailMDIVoucher: getDetailMDIVoucherTemp,
        })
    };

    onChangeKho = (info) => {
        let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
        getDetailMDIVoucherTemp.WareHouseID = info.WareHouseID;
        getDetailMDIVoucherTemp.WareHouseName = info.WHName;
        getDetailMDIVoucherTemp.inventoryDetail = [];
        this.setState({
            getDetailMDIVoucher: getDetailMDIVoucherTemp,
        })
    };

    onChangeNhanVien = (info) => {
        let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
        getDetailMDIVoucherTemp.EmployeeID = info.EmployeeID;
        getDetailMDIVoucherTemp.EmployeeName = info.EmployeeName;
        this.setState({
            getDetailMDIVoucher: getDetailMDIVoucherTemp,
        })
    };

    onChangeVatTu = (info) => {
        let getDetailMDIVoucherTemp = this.state.getDetailMDIVoucher ? {...this.state.getDetailMDIVoucher} : {};
        getDetailMDIVoucherTemp.inventoryDetail = info.Inventory;
        this.setState({
            getDetailMDIVoucher: getDetailMDIVoucherTemp,
        })
    };

    onChangeDinhKem = (data) => {
        let attachArrTemp =[];
        data.forEach((item, idx)=>{
            attachArrTemp.push({
                FileName: item.FileName,
                FileSize: item.FileSize,
                URL: item.URL,
                isLocal: item.isLocal,
                FileType: item.FileExt
            });
        });
        this.setState({
            attachArr: attachArrTemp
        })
    };

    onChangeRequestDate = (date) => {
        const {requestDate, supplyDate} = this.state;
        this.setState({
            requestDate: date,
            supplyDate: date < requestDate ? supplyDate : null
        })
    };

    clearState = () => {
        const {onLoading} = this.props;
        this.setState({
            idParam: true,
            isStatus: false,
            requestDate: this.getDate,
            supplyDate: moment().add(1, 'day').format(this.formatDate),
            attachArr:[]
        });
        this.getCbDefault();
        if(this.refs['Description']) this.refs['Description'].setNativeProps({text: ''});
        if(onLoading) onLoading();
    };

    onSave = (flag) => {
        const { getDetailMDIVoucher, requestDate, attachArr} = this.state;
        const {getListStatus, onLoading} = this.props;

        if(!getDetailMDIVoucher || !getDetailMDIVoucher.MDIReasonID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_nguyen_nhan')});
            return;
        }
        if(!getDetailMDIVoucher || !getDetailMDIVoucher.ProjectID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_du_an')});
            return;
        }
        if(!getDetailMDIVoucher || !getDetailMDIVoucher.WareHouseID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            return;
        }
        if(!getDetailMDIVoucher || !getDetailMDIVoucher.EmployeeID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_nguoi_yeu_cau')});
            return;
        }
        if(!requestDate){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_ngay_yeu_cau')});
            return;
        }
        if(!getDetailMDIVoucher || !getDetailMDIVoucher.inventoryDetail || !getDetailMDIVoucher.inventoryDetail.length){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_vat_tu')});
            return;
        }
        if(onLoading) onLoading();
        else{
            this.setState({
                isSubmit: true
            });
        }
        let dataTemp = {...getDetailMDIVoucher};
        if(this.vlDescription){
            dataTemp.Description= this.vlDescription;
        }
        if(getListStatus){
            dataTemp.MDIStatusName = getListStatus.MDIStatusName;
            dataTemp.MDIStatusID = getListStatus.MDIStatusID;
        }
        dataTemp.MDIVoucherDate=moment(requestDate,'DD/MM/YYYY').format('YYYY-MM-DD');
        dataTemp.DivisionID= Config.profile.localHost;
        if(this.WareHouseID){
            dataTemp.WareHouseID2 = this.WareHouseID;
        }
        const params = {
            data: JSON.stringify(dataTemp),
        };
        if(flag === 'add'){
            this.props.thvktAction.addMDIVoucher(params, (error, data) => {
                if (error) {
                    Config.alertMess({code: '', message: error.message});
                    this.setState({isLoading: false,isSubmit: false});
                    if(onLoading) onLoading();
                    return false;
                }
                else if (data && attachArr.length>0) { //có attachment
                    this.uploadImageAsync((dataAttach) => {//upload attachment to cdn
                        if (dataAttach) {
                            const params = {
                                KeyID: data.VoucherID,
                                TableName: data.TableName,
                                arrAttachment: dataAttach
                            };
                            this.props.mainActions.attachPropose({params: JSON.stringify(params)}, (err, data) => { //save attachment to Propose
                                this.clearState();
                                if (data) {
                                    this.props.thvktAction.getListMDIVoucher();
                                    this.props.changeTab(1);
                                } else {
                                    Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                }
                            });
                        } else this.clearState();
                    })
                }
                else{
                    this.clearState();
                    this.props.thvktAction.getListMDIVoucher();
                    this.props.changeTab(1);
                }
            });
        }
        else if(flag === 'edit'){
            this.props.thvktAction.editMDIVoucher(params, (error, data) => {
                if (error) {
                    Config.alertMess({code: '', message: error.message});
                    this.setState({isSubmit: false});
                    if(onLoading) onLoading();
                    return false;
                }
                else if (data){
                    if(attachArr.length > 0 || (dataTemp.attachment && dataTemp.attachment.length >0 && attachArr.length === 0)) {
                        this.uploadImageAsync((dataAttach, flag) => {//upload attachment to cdn
                            if (dataAttach) {
                                if(flag || dataAttach.length !== dataTemp.attachment.length){ // có thay đổi attachment
                                    const paramAttach = {
                                        KeyID: dataTemp.MDIVoucherID,
                                        TableName: dataTemp.TableName,
                                    };
                                    if(dataAttach.length > 0){
                                        paramAttach.arrAttachment =  dataAttach;
                                    }
                                    this.props.mainActions.editAttachPropose({params: JSON.stringify(paramAttach)}, (err1, data1) => { //save attachment to Propose
                                        if (data1) {
                                            this.props.thvktAction.getListMDIVoucher();
                                            this.props.navigation.state.params.reload();
                                            this.props.navigationActions.changeScreen('ChiTietTraHangVeKhoTabScreen',{MDIVoucherID:dataTemp.MDIVoucherID});
                                        } else {
                                            Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                        }
                                        this.clearState();
                                    });
                                }
                                else{
                                    this.props.thvktAction.getListMDIVoucher();
                                    this.props.navigation.state.params.reload();
                                    this.props.navigationActions.changeScreen('ChiTietTraHangVeKhoTabScreen',{MDIVoucherID:dataTemp.MDIVoucherID});
                                }
                            } else this.clearState();
                        });
                    }
                    else{
                        this.props.navigation.state.params.reload();
                        this.props.thvktAction.getListMDIVoucher();
                        this.props.navigationActions.changeScreen('ChiTietDeXuatVatTuTabScreen', {MDIVoucherID: dataTemp.MDIVoucherID});
                    }
                }
            });
        }
    };

    uploadImageAsync = ( cb) => {
        const {attachArr} = this.state;
        const formData = new FormData();
        let dataOld = [];
        attachArr.forEach((file)=>{
            if(!file.isLocal) {
                dataOld.push({
                    FileName: file.FileName,
                    FileSize: file.FileSize,
                    FileType: file.FileType || "image/jpeg",
                    URL: file.URL

                });
            }
            else{
                formData.append('files', {
                    uri:file.URL,
                    name: file.FileName,
                    type: file.FileType,
                });
            }
        });
        if(dataOld.length < attachArr.length){
            this.props.mainActions.uploadFile(formData,'multiple',(err, data)=> {
                if(data && data.paths && data.paths) {
                    let dataArr = [];
                    data.paths.forEach((itemAtt)=>{
                        dataArr.push({
                            URL : data.domain+'/v1/'+itemAtt.url,
                            FileName : itemAtt.fileName,
                            FileSize : itemAtt.fileSize,
                            FileExt : itemAtt.fileType
                        })
                    });
                    cb && cb(dataOld.concat(dataArr), true);
                }
                else if(err){
                    Alert.alert('',err.message);
                    cb && cb(false);
                }
            });
        }
        else{
            cb && cb(dataOld);
        }

    };

    render() {
        const {getDetailMDIVoucher, StatusName, isSubmit, isLoading} = this.state;
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        const ListInventory = idParam ? "DanhSachVatTuTHVKTScreen" : "ChonVatTuTHVKTScreen";
        return (
            <View style={styles.container}>
                {idParam && <Header navigation={this.props.navigation}
                                    showBack={true}
                                    customClass={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: Config.gStyle.color_border,
                                        height: Scale(43)
                                    }}
                                    onRight={() => this.onSave('edit')}
                                    colorBtnRight={Config.gStyle.color_def}
                                    btnRight={Config.lang('PM_Luu')}
                                    headerName={Config.lang('PM_Cap_nhat_de_xuat')}/>
                }
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View style={{paddingHorizontal: Scale(16)}}>
                        <SelectItem
                            onChangePress={() => this.onLink('ChonNguyenNhanScreen', this.onChangeNguyenNhan)}
                            // icon={require('../../libs/CSelectedItem/icon_loai_de_xuat.png')}
                            textTitle={Config.lang("PM_Nguyen_nhan")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getDetailMDIVoucher && getDetailMDIVoucher.MDIReasonName ? getDetailMDIVoucher.MDIReasonName : ''}
                        />

                        <SelectItem
                            onChangePress={() => this.onLink('DuAnScreen', this.onChangeDuAn)}
                            // icon={require('../../libs/CSelectedItem/icon_du_an.png')}
                            textTitle={Config.lang("PM_Du_an")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getDetailMDIVoucher && getDetailMDIVoucher.ProjectName ? getDetailMDIVoucher.ProjectName : ''}
                        />

                        <SelectItem
                            onChangePress={() => {this.onLink('KhoScreen', this.onChangeKho)}}
                            // icon={require('../../libs/CSelectedItem/icon_kho.png')}
                            textTitle={Config.lang("PM_Kho_nhap")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getDetailMDIVoucher && getDetailMDIVoucher.WareHouseName ? getDetailMDIVoucher.WareHouseName : ''}
                        />

                        <SelectItem
                            onChangePress={() => this.onLink('NhanVienDeXuatScreen', this.onChangeNhanVien)}
                            // icon={require('../../libs/CSelectedItem/icon_nguoi_yeu_cau.png')}
                            textTitle={Config.lang("PM_Nguoi_yeu_cau")}
                            isLoading={isLoading}
                            disable={false}
                            value={getDetailMDIVoucher && getDetailMDIVoucher.EmployeeName ? getDetailMDIVoucher.EmployeeName : ''}
                        />

                        <View style={styles.viewDateContainer}>
                            {/*<View style={{width: '10%'}}>*/}
                            {/*    <Image source={require('../../libs/CSelectedItem/icon_ngay_yeu_cau.png')}*/}
                            {/*           style={{width: Scale(33), height: Scale(33)}}/>*/}
                            {/*</View>*/}

                            <View style={{width: '100%', paddingLeft: Scale(8)}}>
                                <View style={styles.viewDate}>
                                    <Text style={[styles.textDate,{opacity: idParam ? 0.5 : 1}]}>{Config.lang("PM_Ngay_yeu_cau")}</Text>
                                    <View style={styles.viewCDate}>
                                        <CDate date={!isLoading ? this.state.requestDate : null}
                                               maximumDate={this.getDate}
                                               onDateChange={(date) => {
                                                   this.onChangeRequestDate(date)
                                               }}
                                               customStyles={{
                                                   dateInput: {
                                                       alignItems: 'flex-end',
                                                       borderWidth: 0,
                                                       height: Scale(25)
                                                   },
                                                   dateText: {
                                                       color: '#707070',
                                                       fontSize: Scale(16)
                                                   },
                                               }}
                                               iconSource={false}
                                               placeholder={' '}
                                               format={'DD/MM/YYYY'}
                                               style={{
                                                   zIndex: 1, flex: 3, paddingHorizontal: Scale(8),
                                                   position: 'absolute', right: Scale(8), width: Scale(280),
                                               }}
                                        />

                                        {idParam &&
                                            <View style={{
                                                position:'absolute',
                                                flex:3,
                                                right: Scale(8),
                                                width: Scale(280),
                                                height:'100%',
                                                zIndex:2,
                                            }}/>
                                        }
                                        {isLoading && <ActivityIndicator style={{marginRight:Scale(10)}} size="small" color="#707070"/>}
                                        {!idParam && <Icon name={'chevron-right'} size={Scale(16)} color={"#707070"}/>}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <SelectItem
                            // icon={require('../../libs/CSelectedItem/icon_trang_thai.png')}
                            textTitle={Config.lang("PM_Trang_thai")}
                            isLoading={isLoading}
                            disable={true}
                            styleVl={{
                                color: '#2680EB',
                                fontFamily: Config.getFont('Muli-Bold')
                            }}
                            value={StatusName}
                        />

                        <SelectItem
                            onChangePress={() => this.onLink(ListInventory, this.onChangeVatTu)}
                            // icon={require('../../libs/CSelectedItem/icon_chi_tiet_vat_tu.png')}
                            textTitle={Config.lang("PM_Chi_tiet_vat_tu")}
                            isLoading={isLoading}
                            disable={false}
                            value={!isLoading ? Config.lang("PM_Danh_sach") : ''}
                        />

                        <View style={{marginTop: Scale(11),}}>
                            <View style={[styles.viewTextNote, {width: '100%', justifyContent: 'space-between'}]}>
                                <Text style={styles.textNote}>{Config.lang("PM_Ghi_chu")}</Text>
                                <CButton
                                    width={100}
                                    height={36}
                                    style={[styles.button, {
                                        position: 'absolute', right: 0,
                                        backgroundColor: '#2680EB',
                                        borderColor: '#2680EB',
                                        borderRadius: Scale(18),
                                    }]}
                                    styleCustomText={[styles.textButton, {color: 'white'}]}
                                    // loading={this.state.isSubmit}
                                    onPress={() => this.onLink('DinhKemScreen', this.onChangeDinhKem)}
                                    text={Config.lang("PM_Dinh_kem")}
                                />
                            </View>
                            <TextInput style={styles.contentNote}
                                       multiline={true}
                                       numberOfLines={6}
                                       ref={'Description'}
                                       onChangeText={vl => this.vlDescription = vl}
                                       defaultValue={getDetailMDIVoucher && getDetailMDIVoucher.Description ? getDetailMDIVoucher.Description : ''}
                                       placeholder={Config.lang("PM_Ghi_chu")}/>
                        </View>

                        <View style={styles.viewHidButton}>
                            {!idParam &&
                            <CButton
                                width={100}
                                height={36}
                                style={[styles.button, {
                                    position: 'absolute', right: 0,
                                    backgroundColor: Config.gStyle.color_def,
                                }]}
                                styleCustomText={[styles.textButton, {color: 'white'}]}
                                loading={this.state.isSubmit}
                                onPress={() => this.onSave('add')}
                                text={Config.lang("PM_Luu")}
                            />
                            }
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                {isSubmit && <CLoading/>}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
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
        borderBottomColor: '#CECECE',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        height: '100%',
    },
    textDate: {
        width: '40%',
        fontSize: Scale(16),
        fontFamily: Config.getFont('Roboto'),
        color: 'rgba(0,0,0,0.87)',
        lineHeight: Math.floor(Scale(24)),
        flex: 1,
        zIndex: 0,
    },
    viewCDate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '60%',
    },
    viewTextNote: {
        paddingTop: Scale(10),
        paddingBottom: Scale(5),
    },
    textNote: {
        fontSize: Scale(20),
        color: '#212121',
        fontFamily: Config.getFont('Roboto'),
        fontWeight: 'bold',
        lineHeight: Math.floor(Scale(26)),
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
    viewHidButton: {
        justifyContent: 'flex-start',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: Scale(28),
        height: Scale(36),
        // borderStyle:'dashed',
        // borderWidth:Scale(2),
        // display:'inline-block',
        // color:'blue'
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
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(20)),
        fontFamily: Config.getFont('Roboto'),
    },
    iconButton: {
        lineHeight: Math.floor(Scale(20)),
    },
    viewTouchReject: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomRightRadius: Scale(16),
        paddingHorizontal: Scale(33),

    },
    touchReject: {},
    textTouchReject: {},
};

export default connect(state => ({
        getListStatus: state.thvkt.getListStatus,
    }),
    (dispatch) => ({
        thvktAction: bindActionCreators(thvktAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(TraHangVeKhoScreen);
