import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import CButton from "../../libs/CButton/CButton";
import SelectInfoItems from '../../libs/CSelectInfoItems/select_info_items';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';
import * as navigationActions from "../../navigation/redux/navigation_actions";
import Header from "../../components/Header";
import ScrollView from '../../libs/CScrollView/CScrollView';

class DanhSachVatTuTHVKTScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            isLoading: false,
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
        }, () => {
            this.dataListVatTuTemp = this.state.inventory;
        });
    }

    onLink = (name, func) => {
        const {inventory} = this.state;
        const wareHouseID = this.props.navigation.state.params.id;
        this.props.navigationActions.changeScreen(name, {onChange: func, id: wareHouseID, Inventory: inventory});
    };


    onChangeVatTu = (info) => {
        const {inventory} = this.state;
        let getInventoryTemp = inventory ? [...inventory] : [];
            getInventoryTemp = info.Inventory;
        this.setState({
            inventory: getInventoryTemp,
        }, () => {
            this.dataListVatTuTemp = this.state.inventory;
        })
    };

    onSubmit = () => {
        let dataChoose = [];
        if (this.dataListVatTuTemp && this.dataListVatTuTemp.length > 0) {
            this.dataListVatTuTemp.forEach((item) => {

                if (item.OQuantity) {
                    dataChoose.push(item);
                }
            });
        }
        const dataParams = this.props.navigation.state.params.Inventory ? this.props.navigation.state.params.Inventory : [];
        dataParams.forEach((item) => {
            const invenOld = this.dataListVatTuTemp.find(i => i.InventoryID === item.InventoryID);
            if (!invenOld) {
                dataChoose.push(item);
            }
        });
        if (this.props.navigation.state.params.onChange) {
            this.props.navigation.state.params.onChange({
                Inventory: dataChoose
            });
            this.props.navigation.goBack();
        }
    };

    onChangeDate = (date, index) => {
        const supply = this.props.navigation.state.params.SupplyDate;
        const {inventory} = this.state;
        this.dataListVatTuTemp = inventory ? [...inventory] : [];
        if (!!this.dataListVatTuTemp && !!this.dataListVatTuTemp[index]) {
            this.dataListVatTuTemp[index].SupplyDate = date ? date : supply;
        }
    };

    onChangeValue = (count, index) => {
        const {inventory}= this.state;
        this.dataListVatTuTemp = inventory ? [...inventory] : [];
        if(!!this.dataListVatTuTemp && !!this.dataListVatTuTemp[index]){
            this.dataListVatTuTemp[index].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
        }
    };

    render() {
        const {inventory} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{
                            height: Scale(43),
                            // borderBottomWidth: 1,
                            // borderBottomColor: Config.gStyle.color_border,
                        }}
                        onRight={this.onSubmit}
                        colorBtnRight={Config.gStyle.color_def}
                        btnRight={Config.lang('PM_Luu')}
                        headerName={Config.lang('PM_Danh_sach_vat_tu')}/>
                <ScrollView style={{width: '100%', height:'100%', }} maxHeight={Config.h - Scale(115)}>
                    <View style={{
                        flexDirection:'row',
                        flexWrap:'wrap',
                        justifyContent:'flex-start'}}>
                        {inventory && inventory.length > 0 && inventory.map((item, index) => {
                            return (
                                <SelectInfoItems
                                    onChangeValue={(number)=>this.onChangeValue(number, index)}
                                    onChangeDate={(date) => {this.onChangeDate(date, index)}}
                                    disable={false}
                                    isFree={true}
                                    disableRemove={true}
                                    value={item}
                                    key={index}
                                />
                            )
                        })
                        }
                    </View>
                </ScrollView>
                <View style={{
                    position:'relative',
                    justifyContent: 'center',
                    width: '100%',
                    height: Scale(36),
                    flexDirection: 'row',
                    bottom: Scale(1),
                }}>
                    <CButton
                        width={140}
                        height={36}
                        style={styles.button}
                        styleCustomText={styles.textButton}
                        onPress={() => {
                            this.onLink('ChonVatTuTHVKTScreen', this.onChangeVatTu)
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
)(DanhSachVatTuTHVKTScreen);
