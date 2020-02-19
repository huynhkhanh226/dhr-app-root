import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity, Alert,
} from 'react-native';

import Config, {Scale} from '../../config';
import SelectItem from "../../libs/CSelectedItem/Select-Item"
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';
import * as mainActions from '../../redux/main/main_actions';
import * as navigationActions from "../../navigation/redux/navigation_actions";
import CDate from "../../libs/CDate/CDate";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CButton from "../../libs/CButton/CButton";
import moment from 'moment';
import Header from "../../components/Header";
import CLoading from "../../libs/CLoading/CLoading";
import CLine from "../../libs/CLine/CLine";
import Modal from "react-native-modal";

class DeXuatVatTuScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.state = ({
            isLoading: false,
            idParam: true,
            isStatus: false,
            requestDate: this.getDate,
            supplyDate: this.getDate,
            StatusName: '',
            getDetailPropose: null,
            attachArr:[],
            isSubmit: false,
            togglePopup: false,
        });
    }

    componentDidMount() {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        this.getDetail();
        if (!idParam) {
            this.getStatus();
            this.getCbDefault();

        }
    }

    getCbDefault = () => {
        this.setState({isLoading: true});
        this.props.dxvtAction.getCbDefaultPropose({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
                getDetailProposeTemp.ProjectID = data.ProjectID ? data.ProjectID : '';
                getDetailProposeTemp.ProjectName = data.ProjectName ? data.ProjectName : '';
                getDetailProposeTemp.EmployeeID = data.EmployeeID ? data.EmployeeID : '';
                getDetailProposeTemp.EmployeeName = data.EmployeeName ? data.EmployeeName : '';
                this.setState({
                    getDetailPropose: getDetailProposeTemp,
                })
            }
        });
    };

    getStatus = () => {
        this.setState({isLoading: true});
        this.props.dxvtAction.getStatusName({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataStatus: {},
                    StatusName: '',
                    isLoading: false,
                });
            } else if (data) {
                this.setState({
                    dataStatus: data,
                    StatusName: data && data.StatusName ? data.StatusName : '',
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
            VoucherID: idParam,
        };
        this.setState({isLoading: true});
        this.props.dxvtAction.getDetailPropose(params, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({isLoading: false});
                return false;
            } else if (data) {
                this.setState({
                    getDetailPropose: data,
                    requestDate: data && data.RequestDate ? moment(data.RequestDate).format('DD/MM/YYYY') : null,
                    supplyDate: data && data.SupplyDate ?data.SupplyDate : null,
                    StatusName: data && data.StatusName ? data.StatusName : '',
                    isLoading: false,
                    attachArr:data.attachment
                })
            }
        });
    };


    onLink = (name, func) => {
        const {getDetailPropose, attachArr} = this.state;
        const proposeTypeID = getDetailPropose && getDetailPropose.ProposeTypeID ? getDetailPropose.ProposeTypeID : '';
        const projectID = getDetailPropose && getDetailPropose.ProjectID ? getDetailPropose.ProjectID : '';
        const deliveryVoucherID = getDetailPropose && getDetailPropose.DeliveryVoucherID ? getDetailPropose.DeliveryVoucherID : '';
        const employeeID = getDetailPropose && getDetailPropose.EmployeeID ? getDetailPropose.EmployeeID : '';
        const inventory = getDetailPropose && getDetailPropose.inventory ? getDetailPropose.inventory : [];
        const attachment = attachArr ? attachArr : [];
        const {supplyDate} = this.state;

        if (name === 'DuAnScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, ProjectID: projectID});
        } else if (name === 'LoaiDeXuatScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, ProposeTypeID: proposeTypeID});
        } else if (name === 'BanGiaoDeXuatScreen') {
            if (!projectID) Config.alertMess({code: '', message: Config.lang('PM_Chua_chon_du_an')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, id: projectID, DeliveryVoucherID: deliveryVoucherID});
        } else if (name === 'NhanVienDeXuatScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, EmployeeID: employeeID});
        } else if (name === 'DanhSachDeXuatVatTuScreen') {
            if (!supplyDate) Config.alertMess({code: '', message: Config.lang('PM_Chua_chon_ngay_can_hang')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, SupplyDate: supplyDate, Inventory: inventory});
        } else if (name === 'ChonVatTuDeXuatScreen') {
            if (!supplyDate) Config.alertMess({code: '', message:  Config.lang('PM_Chua_chon_ngay_can_hang')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, SupplyDate: supplyDate, Inventory: inventory});
        } else if (name === 'DinhKemScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, Attachment: attachment});
        }
    };

    onChangeLoaiDeXuat = (info) => {
        let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
        getDetailProposeTemp.ProposeTypeID = info.ProposeTypeID;
        getDetailProposeTemp.ProposeTypeName = info.ProposeTypeName;
        this.setState({
            getDetailPropose: getDetailProposeTemp,
        })
    };

    onChangeDuAn = (info) => {
        let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
        getDetailProposeTemp.ProjectID = info.ProjectID;
        getDetailProposeTemp.ProjectName = info.ProjectName;
        getDetailProposeTemp.DeliveryVoucherID = '';
        getDetailProposeTemp.DeliveryVoucherNo = '';
        this.setState({
            getDetailPropose: getDetailProposeTemp,
            voucherDate: null
        })
    };

    onChangeBanGiao = (info) => {
        let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
        getDetailProposeTemp.DeliveryVoucherID = info.DeliveryVoucherID;
        getDetailProposeTemp.DeliveryVoucherNo = info.DeliveryVoucherNo;
        this.setState({
            getDetailPropose: getDetailProposeTemp,
        })
    };

    onChangeNhanVien = (info) => {
        let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
        getDetailProposeTemp.EmployeeID = info.EmployeeID;
        getDetailProposeTemp.EmployeeName = info.EmployeeName;
        this.setState({
            getDetailPropose: getDetailProposeTemp,
        })
    };

    onChangeVatTu = (info) => {
        let getDetailProposeTemp = this.state.getDetailPropose ? {...this.state.getDetailPropose} : {};
        getDetailProposeTemp.inventory = info.Inventory;
        this.setState({
            getDetailPropose: getDetailProposeTemp,
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
        this.setState({
            requestDate: date,
        })
    };

    onChangeSupplyDate = (date) => {
        const {getDetailPropose} = this.state;
        const inventory = getDetailPropose && getDetailPropose.inventory ? getDetailPropose.inventory : [];
            if(getDetailPropose && getDetailPropose.inventory && getDetailPropose.inventory.length>0){
                Config.alertMess({err: '', message:Config.lang('PM_Ban_co_muon_thay_doi_ngay_can_hang_chi_tiet_khong')},'YES_NO',()=>{
                    this.setState({
                        supplyDate: date,
                    },()=>{
                        inventory.map((val, idx)=>{
                            return val.SupplyDate = moment(this.state.supplyDate,'DD/MM/YYYY').format(this.formatDate);
                        });
                        // console.log("inventory inventory",inventory);
                        let getDetailProposeTemp = getDetailPropose ? {...getDetailPropose} : {};
                        getDetailProposeTemp.inventory = inventory;
                        this.setState({
                            getDetailPropose: getDetailProposeTemp,
                        })
                    });
                });
            }else {
                this.setState({
                    supplyDate: date,
                })
            }
    };

    togglePopup = () => {
        this.setState({
            togglePopup: !this.state.togglePopup
        })
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
                // console.log('uploadFile');
                // console.log(data);
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

    clearState = () => {
        const {onLoading} = this.props;
        this.setState({
            idParam: true,
            isStatus: false,
            requestDate: this.getDate,
            supplyDate: this.getDate,
            getDetailPropose: null,
            attachArr:[]
        });
        if(this.refs['Description']) this.refs['Description'].setNativeProps({text: ''});
        if(onLoading) onLoading();
    };

    onSave = (flag) => {
        const { getDetailPropose, requestDate } = this.state;
        const {getStatusName, onLoading} = this.props;

        if(!getDetailPropose || !getDetailPropose.ProposeTypeID) {
            Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_loai_de_xuat')});
            return;
        }

        if(!getDetailPropose || !getDetailPropose.ProjectID) {
            Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_du_an')});
            return;
        }

        // if(!getDetailPropose || !getDetailPropose.DeliveryVoucherID){
        //     Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_so_ban_giao')});
        //     return;
        // }

        if(!getDetailPropose || !getDetailPropose.EmployeeID){
            Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_nhan_vien')});
            return;
        }

        if(!requestDate){
            Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_ngay_yeu_cau')});
            return;
        }

        if(!getDetailPropose || !getDetailPropose.inventory || !getDetailPropose.inventory.length){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_vat_tu')});
            return;
        }

        if(onLoading) onLoading();
        else{
            this.setState({
                isSubmit: true
            });
        }

        if(getDetailPropose.inventory){
            getDetailPropose.inventory.map((val, idx)=>{
                return val.SupplyDate = moment(val.SupplyDate,'DD/MM/YYYY').format('YYYY-MM-DD');
            });
        }
        let dataTemp = {...getDetailPropose};
        if(this.vlDescription){
            dataTemp.Description= this.vlDescription;
        }
        if(getStatusName){
            dataTemp.StatusName = getStatusName.StatusName;
            dataTemp.StatusID = getStatusName.StatusID;
        }
        dataTemp.RequestDate=moment(requestDate,'DD/MM/YYYY').format('YYYY-MM-DD');
        const params = {
            objVoucher: JSON.stringify(dataTemp),
        };
        const {attachArr} = this.state;

        if(flag === 'add'){
            this.props.dxvtAction.addVoucherPropose(params, (error, data) => { //add Propose
                if (error) {
                    Config.alertMess({code: '', message: error.message});
                    if(onLoading) onLoading();
                    this.setState({isLoading: false,isSubmit: false,getDetailPropose:null});
                    return false;
                } else if (data && attachArr.length>0) { //có attachment
                    this.uploadImageAsync((dataAttach)=>{//upload attachment to cdn
                        if(dataAttach) {
                            const params = {
                                KeyID: data.VoucherID,
                                TableName: data.TableName,
                                arrAttachment: dataAttach
                            };
                            this.props.mainActions.attachPropose({params:JSON.stringify(params)}, (err, data) => { //save attachment to Propose
                                this.clearState();
                                if (data) {
                                    this.props.dxvtAction.getListPropose();
                                    this.props.changeTab(1);
                                } else {
                                    Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                }
                            });
                        }
                        else {
                            this.getStatus();
                            this.getCbDefault();
                            this.clearState();
                        }
                    })
                }
                else{
                    this.getStatus();
                    this.getCbDefault();
                    this.clearState();
                    this.props.dxvtAction.getListPropose();
                    this.props.changeTab(1);
                }
            });
        }
        else if(flag === 'edit'){
            if(dataTemp.VoucherID){
                params.VoucherID = dataTemp.VoucherID
            }
            this.props.dxvtAction.editVoucherPropose(params, (error, data) => {
                if (error) {
                    Config.alertMess({code: '', message: error.message});
                    this.setState({isSubmit: false});
                    return false;
                }
                else if (data){
                    if(attachArr.length > 0 || (dataTemp.attachment && dataTemp.attachment.length >0 && attachArr.length === 0)) {
                        this.uploadImageAsync((dataAttach, flag) => {//upload attachment to cdn
                            if (dataAttach) {
                                if(flag || dataAttach.length !== dataTemp.attachment.length){ // có thay đổi attachment
                                    const paramAttach = {
                                        KeyID: dataTemp.VoucherID,
                                        TableName: dataTemp.TableName,
                                    };
                                    if(dataAttach.length > 0){
                                        paramAttach.arrAttachment =  dataAttach;
                                    }
                                    this.props.mainActions.editAttachPropose({params: JSON.stringify(paramAttach)}, (err1, data1) => { //save attachment to Propose
                                        this.clearState();
                                        if (data1) {
                                            this.props.navigation.state.params.reload();
                                            this.props.navigationActions.changeScreen('ChiTietDeXuatVatTuTabScreen', {VoucherID: dataTemp.VoucherID});
                                        } else {
                                            Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                        }
                                    });
                                }
                                else{
                                    this.props.navigation.state.params.reload();
                                    this.props.navigationActions.changeScreen('ChiTietDeXuatVatTuTabScreen', {VoucherID: dataTemp.VoucherID});
                                }
                            } else this.clearState();
                        });
                    }
                    else{
                        this.props.navigation.state.params.reload();
                        this.props.navigationActions.changeScreen('ChiTietDeXuatVatTuTabScreen', {VoucherID: dataTemp.VoucherID});
                    }
                }
            });

        }
    };

    render() {
        const {isLoading, StatusName, getDetailPropose, requestDate, isSubmit, togglePopup} = this.state;
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        const ListInventory = idParam ? "DanhSachDeXuatVatTuScreen" : "ChonVatTuDeXuatScreen";

        // console.log("render getDetailPropose", getDetailPropose);

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
                        <SelectItem onChangePress={() => this.onLink('LoaiDeXuatScreen', this.onChangeLoaiDeXuat)}
                                    // icon={require('../../libs/CSelectedItem/icon_loai_de_xuat.png')}
                                    textTitle={Config.lang("PM_Loai_de_xuat")}
                                    isLoading={isLoading}
                                    disable={idParam}
                                    value={getDetailPropose && getDetailPropose.ProposeTypeName ? getDetailPropose.ProposeTypeName : ''}
                        />

                        <SelectItem onChangePress={() => this.onLink('DuAnScreen', this.onChangeDuAn)}
                                    // icon={require('../../libs/CSelectedItem/icon_du_an.png')}
                                    textTitle={Config.lang("PM_Du_an")}
                                    isLoading={isLoading}
                                    disable={idParam}
                                    value={getDetailPropose && getDetailPropose.ProjectName ? getDetailPropose.ProjectName : ''}
                        />

                        <SelectItem
                            onChangePress={() => this.onLink('BanGiaoDeXuatScreen', this.onChangeBanGiao)}
                            // icon={require('../../libs/CSelectedItem/icon_so_ban_giao.png')}
                            textTitle={Config.lang("PM_So_ban_giao")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getDetailPropose && getDetailPropose.DeliveryVoucherNo ? getDetailPropose.DeliveryVoucherNo : ''}
                        />

                        <SelectItem
                            onChangePress={() => this.onLink('NhanVienDeXuatScreen', this.onChangeNhanVien)}
                            // icon={require('../../libs/CSelectedItem/icon_nguoi_yeu_cau.png')}
                            textTitle={Config.lang("PM_Nguoi_yeu_cau")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getDetailPropose && getDetailPropose.EmployeeName ? getDetailPropose.EmployeeName : ''}
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
                                        {!isLoading && <CDate date={!isLoading ? this.state.requestDate : null}
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
                                        />}

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
                                        {isLoading && <ActivityIndicator size="small" color="#707070"/>}
                                        <Icon style={{marginLeft:Scale(8),opacity: !idParam?1:0}} name={'chevron-right'} size={Scale(16)} color={"#707070"}/>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.viewDateContainer}>
                            {/*<View style={{width: '10%'}}>*/}
                            {/*    <Image source={require('../../libs/CSelectedItem/icon_ngay_can_hang.png')}*/}
                            {/*           style={{width: Scale(33), height: Scale(33)}}/>*/}
                            {/*</View>*/}

                            <View style={{width: '100%', paddingLeft: Scale(8)}}>
                                <View style={styles.viewDate}>
                                    <Text style={styles.textDate}>{Config.lang("PM_Ngay_can_hang")}</Text>
                                    <View style={styles.viewCDate}>
                                        {!isLoading && <CDate date={!isLoading ? this.state.supplyDate : null}
                                               // minimumDate={requestDate && requestDate > this.getDate ? new Date(moment(requestDate, this.formatDate).toDate()) : this.getDate}
                                               minimumDate={moment().add(1, 'day').format(this.formatDate)}
                                               onDateChange={(date) => {
                                                   this.onChangeSupplyDate(date)
                                               }}
                                               customStyles={{
                                                   dateInput: {
                                                       alignItems: 'flex-end',
                                                       borderWidth: 0,
                                                       height: Scale(25)
                                                   },
                                                   dateText: {
                                                       color: '#707070',
                                                       fontSize: Scale(16, true)
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
                                        {isLoading && <ActivityIndicator style={{marginRight:Scale(10)}} size="small" color="#707070"/>}
                                        <Icon name={'chevron-right'} size={Scale(16)} color={"#707070"}/>
                                        {/*{isLoading && <ActivityIndicator size="small" color="#707070"/>}*/}
                                        {/*<Icon name={'chevron-right'} size={16} color={"#707070"}/>*/}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Modal isVisible={togglePopup} backdropOpacity={0.4}>
                            <View style={{
                                marginTop: 22, width: Scale(328),
                                height: Scale(147),
                                backgroundColor: 'white',
                                borderRadius: Scale(10),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text numberOfLines={2} style={{
                                    paddingHorizontal: Scale(16),
                                    fontSize: Scale(16),
                                    fontFamily: Config.getFont('Muli-Bold'),
                                    color: Config.gStyle.color_666,
                                    textAlign:'center'
                                }}>{Config.lang('PM_Ban_co_muon_thay_doi_ngay_can_hang_chi_tiet_khong')}</Text>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center',
                                    width:'100%',
                                    paddingVertical:Scale(12),
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: Scale(100),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: Scale(16),
                                            fontFamily: Config.getFont('Muli'),
                                            color: Config.gStyle.color_666,
                                            height: Scale(48),
                                            borderWidth:1,
                                        }}
                                        onPress={this.togglePopup}>
                                        {/*onPress={!isDisableEdit ? this.goLink : this.togglePopup}>*/}
                                        <Text>{Config.lang('PM_Dong_y')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            width: Scale(100),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: Scale(16),
                                            fontFamily: Config.getFont('Muli'),
                                            color: Config.gStyle.color_666,
                                            height: Scale(48),
                                            borderWidth:1,
                                        }}
                                        onPress={this.togglePopup}>
                                        <Text>{Config.lang('PM_Huy')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

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
                                       defaultValue={getDetailPropose && getDetailPropose.Description ? getDetailPropose.Description : ''}
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
        getStatusName: state.dxkvt.getStatusName,
        getDetailPropose: state.dxkvt.getDetailPropose,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(DeXuatVatTuScreen);
