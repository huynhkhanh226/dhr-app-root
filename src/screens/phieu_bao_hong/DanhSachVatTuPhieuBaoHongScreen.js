import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ActivityIndicator, Alert, TouchableOpacity,
} from 'react-native';

import Config, {Scale} from '../../config';
import CButton from "../../libs/CButton/CButton";
import SelectProposeItems from '../../libs/CSelectInfoItems/select_propose_items';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';
import * as navigationActions from "../../navigation/redux/navigation_actions";
import Header from "../../components/Header";
import ScrollView from '../../libs/CScrollView/CScrollView';
import SelectInfoItem from "../../libs/CSelectInfoItems/select_info_items";
import CScrollViewModal from "../../libs/CScrollView/CScrollView";
import Modal from "react-native-modal";

class DanhSachVatTuPhieuBaoHongScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            isLoading: false,
            togglePopup: false,
            voucherDate: null,
            strSearch: '',
            getEditDetailExportWH: null
        });
    }

    componentDidMount() {
        const navigation = this.props.navigation ? this.props.navigation : this.props.route.navigation;
        const dataParam = navigation.state && navigation.state.params ? navigation.state.params.Inventory : [];

        this.setState({
            inventory: dataParam
        },()=>{
            this.dataListVatTuTemp = this.state.inventory
        });
    }

    changeSearch = (text) => {
        let inventory = this.props.navigation.state.params.Inventory;
        if (text) {
            inventory = inventory.forEach((item) => {
                return item.name.include(this.state.strSearch) || item.id.include(this.state.strSearch)
            })
        }

    };

    onLink = (name, func) => {
        const {inventory} = this.state;
        const supplyDate = this.props.navigation.state.params.SupplyDate;
        this.props.navigationActions.changeScreen(name, {onChange: func, SupplyDate: supplyDate, Inventory: inventory});
    };

    onSubmit = () => {
        let dataChoose = [];
        if(!this.dataListVatTuTemp || this.dataListVatTuTemp.length <= 0){
            this.dataListVatTuTemp = [...this.state.inventory];
        }
        if(this.dataListVatTuTemp && this.dataListVatTuTemp.length>0){
            this.dataListVatTuTemp.forEach((item)=>{
                if(item.OQuantity){
                    dataChoose.push(item);
                }
            });
        }
        const dataParams = this.props.navigation.state.params.Inventory ? this.props.navigation.state.params.Inventory : [];
        dataParams.forEach((item)=>{
            const invenOld = this.dataListVatTuTemp.find(i=>i.InventoryID === item.InventoryID);
            if(!invenOld){
                dataChoose.push(item);
            }
        });
        if(this.props.navigation.state.params.onChange){
            this.props.navigation.state.params.onChange({
                Inventory:dataChoose
            });
            this.props.navigation.goBack();
        }
    };

    changeValue = (count, index, item) => {
        const {inventory}= this.state;
        this.dataListVatTuTemp = inventory ? [...inventory] : [];
        if(item){
            if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
                this.dataListVatTuTemp = this.props.navigation.state.params.Inventory
            }
            this.dataListVatTuTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
                this.dataListVatTuTemp[idx].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
            }});
        }
        else if(!!this.dataListVatTuTemp && !!this.dataListVatTuTemp[index]){
            this.dataListVatTuTemp[index].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
        }
    };

    onChangeDate = (date, index, item) => {
        const supply = this.props.navigation.state.params.SupplyDate;
        const {inventory}= this.state;
        this.dataListVatTuTemp = inventory ? [...inventory] : [];
        if(item){
            if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
                this.dataListVatTuTemp = this.props.navigation.state.params.Inventory
            }
            this.dataListVatTuTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
                this.dataListVatTuTemp[idx].SupplyDate = date ? date : supply;
            }});
        }
        else if(!!this.dataListVatTuTemp && !!this.dataListVatTuTemp[index]){
            this.dataListVatTuTemp[index].SupplyDate = date ? date : supply;
        }
    };

    togglePopup = () => {
        this.setState({
            togglePopup: !this.state.togglePopup
        })
    };

    onViewDetail = (dataVT, index, name, func) => {
        const inventoryID = dataVT && dataVT.InventoryID ? dataVT.InventoryID : '';
        const phenomena = dataVT && dataVT.phenomena ? dataVT.phenomena : [];
        if ((dataVT && !dataVT.phenomena) || !phenomena.length) {
            this.props.navigationActions.changeScreen(name, {onChange: func, inventoryID: inventoryID, phenomena: phenomena});
        } else {
            this.setState({
                dataDetailVT: dataVT ? dataVT : {},
            });
            this.togglePopup();
        }
    };

    onChangeHT = (info) => {
        const {inventory}= this.state;
        this.dataListVatTuTemp = inventory ? [...inventory] : [];
        if(info){
            if(this.props.navigation.state.params  && this.props.navigation.state.params.Phenomena){
                this.dataListVatTuTemp = this.props.navigation.state.params.Phenomena
            }
            this.dataListVatTuTemp.forEach((key, idx)=>{ if(key.InventoryID === info.inventoryID){
                this.dataListVatTuTemp[idx].phenomena = info.Phenomena;
            }});
            this.setState({
                inventory: this.dataListVatTuTemp
            });
        }
    };

    changPhenomena = (dataVT, name, func) => {
        const inventoryID = dataVT && dataVT.InventoryID ? dataVT.InventoryID : '';
        const phenomena = dataVT && dataVT.phenomena ? dataVT.phenomena : [];
        this.props.navigationActions.changeScreen(name, {onChange: func, inventoryID: inventoryID, phenomena: phenomena});
        this.togglePopup();
    };

    onChangeVatTu = (info) => {
        const {inventory} = this.state;
        let getInventoryTemp = inventory ? [...inventory] : [];
            getInventoryTemp = info.Inventory;
        this.setState({
            inventory: getInventoryTemp,
        })
    };

    render() {
        const {inventory, togglePopup, dataDetailVT} = this.state;
        const phenomena = dataDetailVT && dataDetailVT.phenomena && dataDetailVT.phenomena.length>0 ? dataDetailVT.phenomena : [];
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{
                            borderBottomWidth: 1,
                            borderBottomColor: Config.gStyle.color_border,
                            height: Scale(43)
                        }}
                        onRight={this.onSubmit}
                        colorBtnRight={Config.gStyle.color_def}
                        btnRight={Config.lang('PM_Luu')}
                        headerName={Config.lang('PM_Danh_sach_vat_tu')}/>
                <ScrollView style={{width: '100%', height:'100%', }} maxHeight={Config.h - Scale(115)}>
                    <View>
                        {inventory && inventory.length > 0 && inventory.map((item, index) => {
                            const isView = item && item.phenomena && item.phenomena.length>0 ? 0 : 1;
                            return (
                                <SelectProposeItems
                                    onChangeValue={(number) => this.changeValue(number, index)}
                                    onChangeDate={(date) => {this.onChangeDate(date, index)}}
                                    onChangeDetail={() => this.onViewDetail(item, index,'ChonHienTuongScreen', this.onChangeHT)}
                                    // onChangeDetail={()=>this.onViewDetail(item)}
                                    viewDetail={true}
                                    isViewDetail={true}
                                    isView={isView}
                                    disable={false}
                                    disableRemove={true}
                                    value={item}
                                    title3={Config.lang('PM_So_luong_ton')}
                                    key={index}
                                />
                            )
                        })
                        }
                    </View>
                </ScrollView>

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
                                // paddingHorizontal: Scale(16),
                                paddingBottom: Scale(15),
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-start'
                            }}>
                                {dataDetailVT && <SelectInfoItem
                                    disable={true}
                                    isDetail={true}
                                    disableRemove={true}
                                    viewDetail={true}
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
                                    {phenomena && phenomena.length>0 && phenomena.map((value, idx)=>{
                                        return(
                                            <View key={idx} style={{
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
                                onPress={() => this.changPhenomena(dataDetailVT, 'ChonHienTuongScreen', this.onChangeHT)}>
                                {/*onPress={()=>this.changPhenomena(dataDetailVT.phenomena)}>*/}
                                <Text style={{
                                    fontSize: Scale(14),
                                    fontFamily: Config.getFont('Roboto-Light'),
                                    color:'#179EFF',
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

                <View style={{
                    position:'relative',
                    justifyContent: 'center',
                    width: '100%',
                    height: Scale(36),
                    flexDirection: 'row',
                    bottom: Scale(1),
                    // backgroundColor:'yellow',
                    // marginTop: Scale(27),
                }}>
                    <CButton
                        width={140}
                        height={36}
                        style={styles.button}
                        styleCustomText={styles.textButton}
                        onPress={() => {
                            this.onLink('ChonVatTuPhieuBaoHongScreen', this.onChangeVatTu)
                        }}
                        text={Config.lang("PM_Them_vat_tu")}
                        iconAweSome={"plus"}
                        iconAweSomeSize={Scale(16)}
                        iconAweSomeColor={'#F94F37'}
                        iconAweSomeStyle={styles.iconButton}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
    },
    viewButton: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: Scale(100)
    },
    viewHidButton: {

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
        getDetailPropose: state.dxkvt.getDetailPropose,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(DanhSachVatTuPhieuBaoHongScreen);
