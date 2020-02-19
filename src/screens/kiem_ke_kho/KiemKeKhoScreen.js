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
import * as kiemkekhoAction from '../../redux/kiem_ke_kho/kiemkekho_actions';
import * as thvktAction from '../../redux/tra_hang_ve_kho_tong/thvkt_actions';
import * as mainActions from '../../redux/main/main_actions';
import * as navigationActions from "../../navigation/redux/navigation_actions";
import CDate from "../../libs/CDate/CDate";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CButton from "../../libs/CButton/CButton";
import moment from 'moment';
import Header from "../../components/Header";
import CLoading from "../../libs/CLoading/CLoading";

class KiemKeKhoScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.state = ({
            isLoading: false,
            idParam: true,
            isStatus: false,
            voucherDate: this.getDate,
            supplyDate: moment().add(1, 'day').format(this.formatDate),
            StatusName: '',
            getDetailInventoryKKK: null,
            attachArr:[],
            isSubmit: false
        });
    }

    componentDidMount() {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        this.getDetail();
        if (!idParam) {
            this.getCbDefault();
        }
    }

    getCbDefault = () => {
        this.setState({isLoading: true});
        this.props.thvktAction.getCbDefaultMDIVoucher({}, (error, data) => {
            // console.log("getCbDefaultMDIVoucher getCbDefaultMDIVoucher", error, data);
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                let getDetailInventoryKKKTemp = this.state.getDetailInventoryKKK ? {...this.state.getDetailInventoryKKK} : {};
                getDetailInventoryKKKTemp.master= data;
                getDetailInventoryKKKTemp.inventory= [];
                this.setState({
                    getDetailInventoryKKK: getDetailInventoryKKKTemp,
                    isLoading: false,
                })
            }
        });
    };

    getDetail = () => {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        // console.log("idParam idParam", idParam);
        if (!idParam) {
            return;
        }
        const params = {
            VoucherID: idParam,
        };
        this.setState({isLoading: true});
        this.props.kiemkekhoAction.getDetailInventoryKKK(params, (error, data) => {
            // console.log("getDetailInventoryKKK getDetailInventoryKKK", error, data);

            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    getDetailInventoryKKK: [],
                    isLoading: false});
                return false;
            } else if (data) {
                this.setState({
                    getDetailInventoryKKK: data,
                    voucherDate: data && data.master && data.master.VoucherDate ? moment(data.master.VoucherDate).format('DD/MM/YYYY') : null,
                    attachArr: data && data.attachment ? data.attachment : [],
                    isLoading: false,
                })
            }
        });
    };

    onLink = (name, func) => {
        const {getDetailInventoryKKK, attachArr} = this.state;
        const projectID = getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.ProjectID ? getDetailInventoryKKK.master.ProjectID : '';
        const wareHouseID = getDetailInventoryKKK &&  getDetailInventoryKKK.master &&  getDetailInventoryKKK.master.WareHouseID ?  getDetailInventoryKKK.master.WareHouseID : '';
        const employeeID = getDetailInventoryKKK &&  getDetailInventoryKKK.master &&  getDetailInventoryKKK.master.EmployeeID ?  getDetailInventoryKKK.master.EmployeeID : '';
        const inventory = getDetailInventoryKKK && getDetailInventoryKKK.inventory ? getDetailInventoryKKK.inventory : [];
        const attachment = attachArr ? attachArr : [];

        if (name === 'ChonDuAnKiemKeScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, ProjectID: projectID});
        } else if(name === 'KhoScreen'){
            if(!projectID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_du_an')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, id: projectID, WareHouseID: wareHouseID});
        } else if (name === 'NhanVienDeXuatScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, EmployeeID: employeeID});
        } else if (name === 'DanhSachVatTuKKKScreen') {
            if(!wareHouseID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            else this.props.navigationActions.changeScreen(name, {onChange: func,id: wareHouseID, Inventory: inventory});
        } else if (name === 'ChonVatTuKKKScreen') {
            if(!wareHouseID) Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            else this.props.navigationActions.changeScreen(name, {onChange: func,id: wareHouseID, Inventory: inventory});
        }else if (name === 'DinhKemScreen') {
            this.props.navigationActions.changeScreen(name, {onChange: func, Attachment: attachment});
        }
    };

    onChangeDuAn = (info) => {
        let getDetailInventoryKKKTemp = this.state.getDetailInventoryKKK ? {...this.state.getDetailInventoryKKK} : {};
        getDetailInventoryKKKTemp.master= info;
        getDetailInventoryKKKTemp.inventory = [];
        this.setState({
            getDetailInventoryKKK: getDetailInventoryKKKTemp,
        })
    };

    onChangeNhanVien = (info) => {
        let getDetailInventoryKKKTemp = this.state.getDetailInventoryKKK ? {...this.state.getDetailInventoryKKK} : {};
        getDetailInventoryKKKTemp.master.EmployeeID = info.EmployeeID;
        getDetailInventoryKKKTemp.master.EmployeeName = info.EmployeeName;
        this.setState({
            getDetailInventoryKKK: getDetailInventoryKKKTemp,
        })
    };

    onChangeVatTu = (info) => {
        let getDetailInventoryKKKTemp = this.state.getDetailInventoryKKK ? {...this.state.getDetailInventoryKKK} : {};
        getDetailInventoryKKKTemp.inventory = info.Inventory;
        this.setState({
            getDetailInventoryKKK: getDetailInventoryKKKTemp,
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
            voucherDate: date,
        })
    };

    clearState = (cb) => {
        const {onLoading} = this.props;
        this.setState({
            idParam: true,
            isStatus: false,
            voucherDate: this.getDate,
            attachArr:[],
            isLoading: false,
            isSubmit: false
        },()=>{
            cb && cb()
        });
        this.getCbDefault();
        if(this.refs['Description']) this.refs['Description'].setNativeProps({text: ''});
        if(onLoading) onLoading();
    };

    onSave = (flag) => {
        const { getDetailInventoryKKK, voucherDate, attachArr} = this.state;
        // console.log("attachArr attachArr", attachArr);
        // console.log("getDetailInventoryKKK getDetailInventoryKKK", getDetailInventoryKKK);
        const {onLoading} = this.props;

        if(!getDetailInventoryKKK || !getDetailInventoryKKK.master || !getDetailInventoryKKK.master.ProjectID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_du_an')});
            return;
        }
        if(!getDetailInventoryKKK || !getDetailInventoryKKK.master || !getDetailInventoryKKK.master.WareHouseID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho_nhap')});
            return;
        }
        if(!getDetailInventoryKKK || !getDetailInventoryKKK.master || !getDetailInventoryKKK.master.EmployeeID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_nguoi_yeu_cau')});
            return;
        }
        if(!voucherDate){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_ngay_kiem_ke')});
            return;
        }
        if(!getDetailInventoryKKK || !getDetailInventoryKKK.inventory || !getDetailInventoryKKK.inventory.length){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_vat_tu')});
            return;
        }
        if(onLoading) onLoading();
        else{
            this.setState({
                isSubmit: true
            });
        }
        const valueParams = getDetailInventoryKKK && getDetailInventoryKKK.master ? getDetailInventoryKKK.master : {};
        const inventoryParam = getDetailInventoryKKK && getDetailInventoryKKK.inventory;

        // console.log("valueParams valueParams", valueParams);
        // console.log("inventoryParam inventoryParam", inventoryParam);
        const params = {
            WareHouseID: valueParams && valueParams.WareHouseID ? valueParams.WareHouseID : '',
            WareHouseName: valueParams && valueParams.WareHouseName ? valueParams.WareHouseName : '',
            ProjectID: valueParams && valueParams.ProjectID ? valueParams.ProjectID : '',
            ProjectName: valueParams && valueParams.ProjectName ? valueParams.ProjectID : '',
            EmployeeID: valueParams && valueParams.EmployeeID ? valueParams.EmployeeID : '',
            EmployeeName: valueParams && valueParams.EmployeeName ? valueParams.EmployeeName : '',
            Description: this.vlDescription ? this.vlDescription : '',
            StatusID: valueParams && valueParams.StatusID ? valueParams.StatusID : '',
            VoucherDate: moment(voucherDate,'DD/MM/YYYY').format('YYYY-MM-DD'),
            inventory: JSON.stringify(inventoryParam),
        };
        if(flag === 'add'){
            this.props.kiemkekhoAction.addInventoryKKK(params, (error, data) => {
                // console.log("addInventoryKKK addInventoryKKK", error, data);
                if (error) {
                    this.clearState(()=>{
                    });
                    Config.alertMess({code: '', message: error.message});
                    if(onLoading) onLoading();
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
                            this.props.mainActions.attachPropose({params: JSON.stringify(params)}, (errAttach, dataAttach) => { //save attachment to Propose
                                if (dataAttach) {
                                    this.createRequestInventory(data, ()=>{
                                        this.clearState(()=>{
                                            this.props.kiemkekhoAction.getListInventoryKKK();
                                            this.props.changeTab(1);
                                        });
                                    });
                                } else {
                                    this.clearState(()=>{
                                        Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                    });
                                }
                            });
                        } else {
                            this.clearState();
                        }
                    })
                }
                else{
                    this.createRequestInventory(data, ()=>{
                        this.clearState();
                        this.props.kiemkekhoAction.getListInventoryKKK();
                        this.props.changeTab(1);
                    });
                }
            });
        }
        else if(flag === 'edit'){
            const voucherID = valueParams && valueParams.VoucherID ? valueParams.VoucherID : '';
            if (!voucherID) {
                Config.alertMess({code: '', message: Config.lang('PM_Khong_co_id')});
                this.setState({isSubmit: false});
                if (onLoading) onLoading();
                return false;
            }
            params.VoucherID = voucherID;
            this.props.kiemkekhoAction.editRequestInventory(params, (error, data) => {
                if (error) {
                    Config.alertMess({code: '', message: error.message});
                    this.clearState();
                    if(onLoading) onLoading();
                    return false;
                }
                else if (data){
                    if(attachArr.length > 0 || (getDetailInventoryKKK.attachment && getDetailInventoryKKK.attachment.length >0 && getDetailInventoryKKK.length === 0)) {
                        this.uploadImageAsync((dataAttach, flag) => {//upload attachment to cdn
                            if (dataAttach) {
                                if(flag || dataAttach.length !== getDetailInventoryKKK.attachment.length){ // có thay đổi attachment
                                    const paramAttach = {
                                        KeyID: voucherID,
                                        TableName: getDetailInventoryKKK.TableName,
                                    };
                                    if(dataAttach.length > 0){
                                        paramAttach.arrAttachment =  dataAttach;
                                    }
                                    this.props.mainActions.editAttachPropose({params: JSON.stringify(paramAttach)}, (err1, data1) => { //save attachment to Propose
                                        if (data1) {
                                            this.props.kiemkekhoAction.getListInventoryKKK();
                                            this.props.navigation.state.params.reload();
                                            this.props.navigationActions.changeScreen('ChiTietPhieuKiemKeTabScreen',{VoucherID:voucherID});
                                        } else {
                                            Config.alertMess({code: '', message: Config.lang('PM_Dinh_kem_that_bai')});
                                        }
                                        this.clearState();
                                    });
                                }
                                else{
                                    this.props.kiemkekhoAction.getListInventoryKKK();
                                    this.props.navigation.state.params.reload();
                                    this.props.navigationActions.changeScreen('ChiTietPhieuKiemKeTabScreen',{VoucherID:voucherID});
                                }
                            } else this.clearState();
                        });
                    }
                    else{
                        this.props.navigation.state.params.reload();
                        this.props.kiemkekhoAction.getListInventoryKKK();
                        this.props.navigationActions.changeScreen('ChiTietPhieuKiemKeTabScreen', {VoucherID: voucherID});
                    }
                }
            });
        }
    };

    createRequestInventory = (data, cb) => {
        Config.alertMess({code:'', message:'Bạn có muốn lập yêu cầu trả hàng không?'},'YES_NO',()=>{
            const params = {
                VoucherID: data.VoucherID
            };
            this.props.kiemkekhoAction.createRequestInventory(params, (error, data) => {
                if(error){
                    Config.alertMess({code:'', message: error.message});
                    cb();
                }
                else if(data){
                    cb();
                }
            })
        },()=>cb());
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
        const {getDetailInventoryKKK, StatusName, isSubmit, isLoading} = this.state;
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        const ListInventory = idParam ? "DanhSachVatTuKKKScreen" : "ChonVatTuKKKScreen";

        // console.log("getDetailInventoryKKK getDetailInventoryKKK", getDetailInventoryKKK);


        // ProjectID: "MINTESTAPP"
        // ProjectName: "Minh test app"
        // WareHouseID: "MINTESTAPP"
        // WareHouseName: "KHOTESTAPP"
        //

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
                                    headerName={Config.lang('PM_Cap_nhat_phieu_kiem_ke')}/>
                }
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View style={{paddingHorizontal: Scale(16)}}>
                        <SelectItem
                            onChangePress={() => this.onLink('ChonDuAnKiemKeScreen', this.onChangeDuAn)}
                            // icon={require('../../libs/CSelectedItem/icon_loai_de_xuat.png')}
                            textTitle={Config.lang("PM_Du_an")}
                            isLoading={isLoading}
                            // disable={idParam}
                            value={getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.ProjectName ? getDetailInventoryKKK.master.ProjectName : ''}
                        />

                        <SelectItem
                            textTitle={Config.lang("PM_Kho_kiem_ke")}
                            isLoading={isLoading}
                            disable={true}
                            value={getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.WareHouseName ? getDetailInventoryKKK.master.WareHouseName : ''}
                        />

                        <SelectItem
                            onChangePress={() => {this.onLink('NhanVienDeXuatScreen', this.onChangeNhanVien)}}
                            // icon={require('../../libs/CSelectedItem/icon_kho.png')}
                            textTitle={Config.lang("PM_Nguoi_kiem_ke")}
                            isLoading={isLoading}
                            // disable={idParam}
                            value={getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.EmployeeName ? getDetailInventoryKKK.master.EmployeeName : ''}
                        />

                        <View style={styles.viewDateContainer}>
                            {/*<View style={{width: '10%'}}>*/}
                            {/*    <Image source={require('../../libs/CSelectedItem/icon_ngay_yeu_cau.png')}*/}
                            {/*           style={{width: Scale(33), height: Scale(33)}}/>*/}
                            {/*</View>*/}

                            <View style={{width: '100%', paddingLeft: Scale(8)}}>
                                <View style={styles.viewDate}>
                                    <Text style={[styles.textDate,{opacity: idParam ? 0.5 : 1}]}>{Config.lang("PM_Ngay_kiem_ke")}</Text>
                                    <View style={styles.viewCDate}>
                                        <CDate date={!isLoading ? this.state.voucherDate : null}
                                               maximumDate={this.getDate}
                                               onDateChange={(date) => {this.onChangeRequestDate(date)}}
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
                                       defaultValue={getDetailInventoryKKK && getDetailInventoryKKK.master && getDetailInventoryKKK.master.Description ? getDetailInventoryKKK.master.Description : ''}
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
        getListStatus: state.kiemkekho.getListStatus,
        getCbDefaultMDIVoucher: state.thvkt.getCbDefaultMDIVoucher,
    }),
    (dispatch) => ({
        kiemkekhoAction: bindActionCreators(kiemkekhoAction, dispatch),
        thvktAction: bindActionCreators(thvktAction, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(KiemKeKhoScreen);
