import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import Config, {Scale} from '../../config';
import SelectItem from "../../libs/CSelectedItem/Select-Item"
import CDate from "../../libs/CDate/CDate";
import CButton from "../../libs/CButton/CButton";
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectInfoItems from '../../libs/CSelectInfoItems/select_info_items';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as xkvtAction from "../../redux/xuat_kho_vat_tu/xkvt_actions";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import Header from "../../components/Header";

class XuatKhoVatTuScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        this.getDate = moment().format(this.formatDate);
        this.state = ({
            isSubmit: false,
            isLoading: false,
            voucherDate: this.getDate,
            getEditDetailExportWH:null
        });
    }

    onLink = (name, func) => {
        const {getEditDetailExportWH} = this.state;
        const wareHouse = getEditDetailExportWH && getEditDetailExportWH.WareHouseID ? getEditDetailExportWH.WareHouseID : ''
        const projectID = getEditDetailExportWH && getEditDetailExportWH.ProjectID ? getEditDetailExportWH.ProjectID : '';
        const Inventory = getEditDetailExportWH && getEditDetailExportWH.Inventory ? getEditDetailExportWH.Inventory : [];
        if(name === 'VatTuScreen'){
            if(!wareHouse)Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_vat_tu')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, id: wareHouse, Inventory: Inventory});
        }
        else if(name === 'KhoScreen'){
            if(!projectID) Config.alertMess({code:'', message: Config.lang('PM_Chua_chon_du_an')});
            else this.props.navigationActions.changeScreen(name, {onChange: func, id: projectID, WareHouseID: wareHouse});
        }
        else if(name === 'DuAnScreen'){
            this.props.navigationActions.changeScreen(name, {onChange: func, ProjectID: projectID});
        }
    };

    onChangeDuAn = (info) => {
        let getEditDetailExportWHTemp = this.state.getEditDetailExportWH ? {...this.state.getEditDetailExportWH} : {};
        getEditDetailExportWHTemp.ProjectID = info.ProjectID;
        getEditDetailExportWHTemp.ProjectName = info.ProjectName;
        getEditDetailExportWHTemp.WareHouseID = '';
        getEditDetailExportWHTemp.WHName = '';
        getEditDetailExportWHTemp.Inventory = [];
        this.setState({
            getEditDetailExportWH: getEditDetailExportWHTemp,
            voucherDate: null
        })
    };

    onChangeKho = (infoKho) => {
        let getEditDetailExportWHKho = this.state.getEditDetailExportWH ? {...this.state.getEditDetailExportWH} : {};
        getEditDetailExportWHKho.WareHouseID = infoKho.WareHouseID;
        getEditDetailExportWHKho.WHName = infoKho.WHName;
        getEditDetailExportWHKho.Inventory = null;
        this.setState({
            getEditDetailExportWH: getEditDetailExportWHKho,
        })
    };

    onChangeVatTu = (infoVatTu) => {
        let getEditDetailExportWHVT = this.state.getEditDetailExportWH ? {...this.state.getEditDetailExportWH} : {};
        getEditDetailExportWHVT.Inventory = infoVatTu.Inventory;
        this.setState({
            getEditDetailExportWH: getEditDetailExportWHVT,
        })
    };

    onChangeValue=(number, idx)=>{
        this.getEditDetailExportWHVT = this.state.getEditDetailExportWH ? {...this.state.getEditDetailExportWH} : {};
        if(!this.getEditDetailExportWHVT.Inventory[idx]) return;
        if(!number && number !== ''){
            this.getEditDetailExportWHVT.Inventory.splice(idx,1);
            this.setState({
                getEditDetailExportWH: this.getEditDetailExportWHVT,
            });
        }
        else if(this.getEditDetailExportWHVT.Inventory[idx]){
            this.getEditDetailExportWHVT.Inventory[idx].OQuantity = number ? parseInt(number) : 0;
        }
    };


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
        this.props.xkvtAction.getDefaultExportWH({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
            } else if (data) {
                let getEditDetailExportWHTemp = this.state.getEditDetailExportWH ? {...this.state.getEditDetailExportWH} : {};
                getEditDetailExportWHTemp.ProjectID = data.ProjectID;
                getEditDetailExportWHTemp.ProjectName = data.ProjectName;
                getEditDetailExportWHTemp.WareHouseID = data.WareHouseID;
                getEditDetailExportWHTemp.WHName = data.WHName;
                this.setState({
                    getEditDetailExportWH: getEditDetailExportWHTemp,
                    isLoading: false,
                })
            }
        });
    };

    getDetail = () =>{
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        if(!idParam){
            return;
        }
        const params = {
            VoucherID: idParam,
        };
        this.setState({isLoading: true});
        this.props.xkvtAction.getEditDetailExportWH(params, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({isLoading: false});
                return false;
            } else if (data) {
                this.setState({
                    getEditDetailExportWH: data,
                    voucherDate: data && data.VoucherDate ? moment(data.VoucherDate).format('DD/MM/YYYY') : null,
                    isLoading: false
                })
            }
        });
    };

    onSave = (flag) => {

        const { getEditDetailExportWH,voucherDate } = this.state;

        if(!getEditDetailExportWH || !getEditDetailExportWH.ProjectID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_du_an')});
            return;
        }
        if(!getEditDetailExportWH.WareHouseID){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_kho')});
            return;
        }
        if(!getEditDetailExportWH.Inventory || getEditDetailExportWH.Inventory.length === 0){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_vat_tu')});
            return;
        }
        if(!voucherDate){
            Config.alertMess({code:'', message:Config.lang('PM_Chua_chon_ngay_xuat')});
            return;
        }

        this.setState({
            isSubmit: true
        });


      let dataTemp = {...getEditDetailExportWH};
      if(this.vlDescription){
          dataTemp.Description= this.vlDescription;
      }

      dataTemp.VoucherDate=moment(voucherDate,'DD/MM/YYYY').format('YYYY-MM-DD');
      const params = {
          objVoucher: JSON.stringify(dataTemp),
      };
      if(flag === 'add'){
          this.props.xkvtAction.addExportWH(params, (error, data) => {
              if (error) {
                  Config.alertMess({code: '', message: error.message});
                  this.setState({isLoading: false,isSubmit: false});
                  return false;
              } else if (data) {
                  this.setState({
                      getEditDetailExportWH: null,
                      voucherDate: this.getDate,
                      isSubmit: false
                  });
                  this.getCbDefault();
                  if(this.refs['Description']) this.refs['Description'].setNativeProps({text: ''});
                  this.props.xkvtAction.getListExportWH();
                  this.props.changeTab(1);
              }
          });
      }
      else if(flag === 'edit'){
          if(dataTemp.VoucherID){
              params.VoucherID = dataTemp.VoucherID
          }
          this.props.xkvtAction.editExportWH(params, (error, data) => {
              if (error) {
                  Config.alertMess({code: '', message: error.message});
                  this.setState({isLoading: false,isSubmit: false});
                  return false;
              } else if (data) {
                  this.setState({
                      isSubmit: false
                  });
                  this.props.navigation.state.params.reload();
                  this.props.navigationActions.changeScreen('ChiTietXuatKhoScreen',{id:params.VoucherID});
              }
          });
      }
    };

    render() {
        const {getEditDetailExportWH, isLoading} = this.state;
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const idParam = navigation.state && navigation.state.params ? navigation.state.params.id : null;
        return (
            <View style={styles.container}>
                {idParam && <Header navigation={this.props.navigation}
                                    showBack={true}
                                    customClass={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: Config.gStyle.color_border,
                                        height: Scale(43)
                                    }}
                                    onRight={()=>this.onSave('edit')}
                                    colorBtnRight={Config.gStyle.color_def}
                                    btnRight={Config.lang('PM_Luu')}
                                    headerName={Config.lang('PM_Cap_nhat_xuat_kho')}/>
                }
                <KeyboardAwareScrollView
                    extraScrollHeight={Scale(90)}
                >
                    <View>

                        <View style={{paddingHorizontal: Scale(16),}}>
                        <SelectItem onChangePress={() => this.onLink('DuAnScreen', this.onChangeDuAn)}
                                    // icon={require('../../libs/CSelectedItem/icon_du_an.png')}
                                    textTitle={Config.lang("PM_Du_an")}
                                    isLoading={isLoading}
                                    disable={idParam}
                                    value={getEditDetailExportWH && getEditDetailExportWH.ProjectName ? getEditDetailExportWH.ProjectName : ''}
                        />

                        <SelectItem
                            onChangePress={() => {
                                this.onLink('KhoScreen', this.onChangeKho)
                            }}
                            // icon={require('../../libs/CSelectedItem/icon_kho.png')}
                            textTitle={Config.lang("PM_Kho")}
                            isLoading={isLoading}
                            disable={idParam}
                            value={getEditDetailExportWH && getEditDetailExportWH.WHName ? getEditDetailExportWH.WHName : ''}
                        />

                        <View style={styles.viewDateContainer}>
                            <View style={{width: '100%', paddingLeft: Scale(8)}}>
                                <View style={styles.viewDate}>
                                    <Text style={styles.textDate}>{Config.lang("PM_Ngay_xuat")}</Text>
                                    <View style={styles.viewCDate}>
                                        {!isLoading && <CDate date={!isLoading ? this.state.voucherDate : null}
                                               onDateChange={(date) => this.setState({voucherDate: date})}
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
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{marginTop: Scale(11), height: Scale(173)}}>
                            <Text style={styles.textNote}>{Config.lang("PM_Ghi_chu")}</Text>
                            <TextInput style={styles.contentNote}
                                       multiline={true}
                                       numberOfLines={6}
                                       ref={'Description'}
                                       onChangeText={vl => this.vlDescription = vl}
                                       defaultValue={getEditDetailExportWH && getEditDetailExportWH.Description ? getEditDetailExportWH.Description : ''}
                                       placeholder={Config.lang("PM_Ghi_chu")}/>
                        </View>

                        <View style={styles.viewHidButton}>
                            <CButton
                                width={140}
                                height={36}
                                style={styles.button}
                                styleCustomText={styles.textButton}
                                onPress={() => {
                                    this.onLink('VatTuScreen', this.onChangeVatTu)
                                }}
                                text={getEditDetailExportWH && getEditDetailExportWH.Inventory && getEditDetailExportWH.Inventory.length >= 0 ? Config.lang("PM_Them_vat_tu") : Config.lang("PM_Chon_vat_tu")}
                                iconAweSome={"plus"}
                                iconAweSomeSize={Scale(16)}
                                iconAweSomeColor={'#F94F37'}
                                iconAweSomeStyle={styles.iconButton}
                            />
                            {!idParam &&
                                <CButton
                                    width={100}
                                    height={36}
                                    style={[styles.button, {position: 'absolute', right: 0,
                                        backgroundColor: Config.gStyle.color_def,
                                    }]}
                                    styleCustomText={[styles.textButton,{color:'white'}]}
                                    loading={this.state.isSubmit}
                                    onPress={() =>
                                        this.onSave('add')
                                    }
                                    text={'Lưu'}
                                />
                            }
                        </View>
                        </View>
                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'flex-start'}}>
                        {getEditDetailExportWH && getEditDetailExportWH.Inventory && getEditDetailExportWH.Inventory.length > 0 && getEditDetailExportWH.Inventory.map((item, idx) => {
                            return <SelectInfoItems key={item.InventoryID+item.OQuantity}
                                                    value={item}
                                                    disable={false}
                                                    onChangeValue={(num)=>this.onChangeValue(num, idx)}
                            />;
                        })}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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
    viewButton: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: Scale(100)
    },
    viewHidButton: {
        justifyContent: 'flex-start',
        flex:1,
        width: '100%',
        flexDirection: 'row',
        marginTop: Scale(27),

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
    textNote: {
        fontSize: Scale(20),
        color: '#212121',
        fontFamily: Config.getFont('Roboto'),
        fontWeight: 'bold',
        lineHeight: Math.floor(Scale(26)),
        paddingTop: Scale(10),
        paddingBottom: Scale(5),
    },
    contentNote: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Roboto'),
        lineHeight: Math.floor(Scale(24)),
        color: 'rgba(0,0,0,0.87)',
        height: Scale(135),
        borderRadius: Scale(16),
        borderColor: '#CECECE',
        borderWidth: 1,
        textAlignVertical: 'top',
        padding: Scale(15),
    },
};

export default connect(state => ({
        getDefaultExportWH: state.xkvt.getDefaultExportWH,
    }),
    (dispatch) => ({
        xkvtAction: bindActionCreators(xkvtAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(XuatKhoVatTuScreen);
