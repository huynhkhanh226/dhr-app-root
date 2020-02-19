import React, {Component} from 'react';
import {
    Alert,
    Text, TouchableOpacity,
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";

import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as baohongAction from '../../redux/phieu_bao_hong/baohong_actions';

import ContentLoader, {Rect} from "react-content-loader/native";
import Search from '../../libs/CSearch/Search_item';
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";
import SelectInfoItem from "../../libs/CSelectInfoItems/select_info_items";
import CListView from "../../libs/CListView/CListView";
import CScrollViewModal from "../../libs/CScrollView/CScrollView";
import Modal from "react-native-modal";

class ChonVatTuPhieuBaoHongScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataVatTuDX: [],
            togglePopup: false,
        });

        this.arrID = [];
        this.perPage = 10;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: '',
        };
        this.dataVatTuDXTemp=[];
    }

    componentDidMount() {
        if (this.refs['CListView']) this.refs['CListView'].loadData();
    }

    _onRefresh = (cb) => {
        this.dataFilter.skip = 0;
        let dataTemp = [...this.state.dataVatTuDX];
        dataTemp = dataTemp.filter(i=>i.OQuantity);
        this.setState({
            dataVatTuDX:dataTemp
        },()=>{
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    _onLoadMore = (cb) => {
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest = (cb) => {
        this.props.baohongAction.getListInventoryBroken(this.dataFilter, (error, data) => {
            let dataVatTuDXTemp = [...this.state.dataVatTuDX];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataVatTuDX: [],
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataVatTuDXTemp = dataVatTuDXTemp && data.rows ? dataVatTuDXTemp.concat(data.rows) : data.rows;
                const dataParams = this.dataVatTuDXTemp;
                const supplyDate =  this.props.navigation.state.params.SupplyDate;
                dataVatTuDXTemp.map((val, idx)=>{
                   return val.SupplyDate = supplyDate;
                });
                if(dataParams && dataParams.length > 0){
                    dataVatTuDXTemp.forEach((item, idx)=>{
                        const temp = dataParams.find(i=>i.InventoryID === item.InventoryID);
                        if(temp){
                            dataVatTuDXTemp[idx].OQuantity = temp.OQuantity;
                            dataVatTuDXTemp[idx].SupplyDate = temp.SupplyDate;
                            dataVatTuDXTemp[idx].TransID = temp.TransID || 0;
                            dataVatTuDXTemp[idx].phenomena = temp.phenomena || [];
                        }
                    });
                }
                dataVatTuDXTemp = dataVatTuDXTemp.filter(function(item, pos, array){
                    return array.map(function(mapItem){ return mapItem['InventoryID']; }).indexOf(item['InventoryID']) === pos;
                });
                this.setState({
                    dataVatTuDX: dataVatTuDXTemp,
                }, () => {
                    cb && cb(data.total - dataVatTuDXTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item, idx) => {
        return (
            <ContentLoader key={idx}
                           height={Scale(100)}
                           width={Config.w}
                           style={styles.viewLoading}
            >
                <Rect x={Scale(8)}
                      y={Scale(6)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(86)}
                      height={Scale(86)}
                />
                <Rect x={Scale(110)}
                      y={Scale(20)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(200)}
                      height={Scale(10)}
                />
                <Rect x={Scale(110)}
                      y={Scale(40)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(200)}
                      height={Scale(10)}
                />
                <Rect x={Scale(110)}
                      y={Scale(60)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(200)}
                      height={Scale(10)}
                />
            </ContentLoader>
        )
    };

    changeSearch = (text) => {
        this.dataFilter.search = text;
        this.dataFilter.skip = 0;
        let dataTemp = [...this.state.dataVatTuDX];
        dataTemp = dataTemp.filter(i=>i.OQuantity);
        this.setState({
            dataVatTuDX:dataTemp
        },()=>{
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    onSubmit = () => {
        let dataChoose = [];
        if(!this.dataVatTuDXTemp || this.dataVatTuDXTemp.length <= 0){
            this.dataVatTuDXTemp = [...this.state.dataVatTuDX];
        }
        if(this.dataVatTuDXTemp && this.dataVatTuDXTemp.length>0){
            this.dataVatTuDXTemp.forEach((item)=>{
                if(item.OQuantity){
                    dataChoose.push(item);
                }
            });
        }
        const dataParams = this.props.navigation.state.params.Inventory ? this.props.navigation.state.params.Inventory : [];
        dataParams.forEach((item)=>{
            const invenOld = this.dataVatTuDXTemp.find(i=>i.InventoryID === item.InventoryID);
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
        const {dataVatTuDX}= this.state;
        this.dataVatTuDXTemp = dataVatTuDX ? [...dataVatTuDX] : [];
        if(item){
            if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
                this.dataVatTuDXTemp = this.props.navigation.state.params.Inventory
            }
            this.dataVatTuDXTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
                this.dataVatTuDXTemp[idx].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
            }});
        }
        else if(!!this.dataVatTuDXTemp && !!this.dataVatTuDXTemp[index]){
            this.dataVatTuDXTemp[index].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
        }
    };

    onChangeDate = (date, index, item) => {
        const supply = this.props.navigation.state.params.SupplyDate;
        const {dataVatTuDX}= this.state;
        this.dataVatTuDXTemp = dataVatTuDX ? [...dataVatTuDX] : [];
        if(item){
            if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
                this.dataVatTuDXTemp = this.props.navigation.state.params.Inventory
            }
            this.dataVatTuDXTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
                this.dataVatTuDXTemp[idx].SupplyDate = date ? date : supply;
            }});
        }
        else if(!!this.dataVatTuDXTemp && !!this.dataVatTuDXTemp[index]){
            this.dataVatTuDXTemp[index].SupplyDate = date ? date : supply;
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
            this.props.navigationAction.changeScreen(name, {onChange: func, inventoryID: inventoryID, phenomena: phenomena});
        } else {
            this.setState({
                dataDetailVT: dataVT ? dataVT : {},
            });
            this.togglePopup();
        }
    };

    onChangeHT = (info) => {
        const {dataVatTuDX}= this.state;
        this.dataVatTuDXTemp = dataVatTuDX ? [...dataVatTuDX] : [];
        if(info){
            // if(this.props.navigation.state.params  && this.props.navigation.state.params.Phenomena){
            //     this.dataVatTuDXTemp = this.props.navigation.state.params.Phenomena
            // }
            this.dataVatTuDXTemp.forEach((key, idx)=>{ if(key.InventoryID === info.inventoryID){
                this.dataVatTuDXTemp[idx].phenomena = info.Phenomena;
            }});
            this.setState({
                dataVatTuDX: this.dataVatTuDXTemp
            });
        }
    };

    changPhenomena = (dataVT, name, func) => {
        const inventoryID = dataVT && dataVT.InventoryID ? dataVT.InventoryID : '';
        const phenomena = dataVT && dataVT.phenomena ? dataVT.phenomena : [];
        this.props.navigationAction.changeScreen(name, {onChange: func, inventoryID: inventoryID, phenomena: phenomena});
        this.togglePopup();
    };

    render() {
        const {dataVatTuDX, togglePopup, dataDetailVT} = this.state;
        if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
            this.dataVatTuDXTemp = this.props.navigation.state.params.Inventory
        }
        const phenomena = dataDetailVT && dataDetailVT.phenomena && dataDetailVT.phenomena.length>0 ? dataDetailVT.phenomena : [];
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        headerName={Config.lang('PM_Chon_vat_tu')}
                        btnRight={Config.lang('PM_Luu')}
                        colorBtnRight={Config.gStyle.color_def}
                        onRight={this.onSubmit}
                        customClass={{
                            height: Scale(43)
                        }}
                />
                <Search onChangePress={(text) => {this.changeSearch(text)}}
                        style={{
                            marginTop: Scale(5),
                            paddingHorizontal: Scale(15),
                            height: Scale(43)
                        }}
                        height={43}
                        placeholderTitle={Config.lang('PM_Tim_kiem_vat_tu')}
                />

                    <CListView
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'flex-start'}}
                        ref="CListView"
                        extraScrollHeight={Scale(100)}
                        data={dataVatTuDX || []}
                        extraData={dataVatTuDX}
                        keyExtractor={(item) => item.InventoryID}
                        onRefresh={this._onRefresh}
                        onLoadMore={this._onLoadMore}
                        renderItem={(item, index) => {
                            const isView = item && item.phenomena && item.phenomena.length>0 ? 0 : 1;
                            return <SelectProposeItems
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
                        }}
                        renderPlaceholder={(item, idx)=>this._renderPlaceHolder(item, idx)}
                />

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
                                    {phenomena && phenomena.length>0 && phenomena.map((value, index)=>{
                                        return(
                                            <View key={index} style={{
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
            </View>
        )
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

    viewLoading: {
        backgroundColor: '#FAFAFC',
        marginTop: Scale(15),
        borderRadius: Scale(10),
        marginHorizontal: Scale(15)
    }
};

export default connect(state => ({
        getListInventoryBroken: state.baohong.getListInventoryBroken,
    }),
    (dispatch) => ({
        baohongAction: bindActionCreators(baohongAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(ChonVatTuPhieuBaoHongScreen);
