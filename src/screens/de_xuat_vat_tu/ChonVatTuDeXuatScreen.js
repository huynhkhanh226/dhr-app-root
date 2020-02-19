import React, {Component} from 'react';
import {
    View, Alert,
    Text, FlatList
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";

import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';

import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import Search from '../../libs/CSearch/Search_item';
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";
import CListView from "../../libs/CListView/CListView";

class ChonVatTuDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataVatTuDX: [],
        });

        this.arrID = [];
        this.perPage = 10;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: '',
            // WareHouseID: "MINTESTAPP",
            // WareHouseID: props.navigation.state.params.SupplyDate,
        };
        this.dataVatTuDXTemp=[];
    }

    componentDidMount() {
        if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
            this.dataVatTuDXTemp = this.props.navigation.state.params.Inventory;
            this.setState({
                dataVatTu: this.props.navigation.state.params.Inventory
            });
        }
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
        this.props.dxvtAction.getListInventoryPropose(this.dataFilter, (error, data) => {
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
                           width={Config.w - Scale(30)}
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
        // console.log('this.dataVatTuDXTemp22222',this.dataVatTuDXTemp);
        let dataChoose = [];
        if(!this.dataVatTuDXTemp.length || this.dataVatTuDXTemp.length <= 0){
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
        // console.log('this.dataVatTuDXTemp',this.dataVatTuDXTemp);
        this.dataVatTuDXTemp = dataVatTuDX ? this.dataVatTuDXTemp.concat([...dataVatTuDX]) : this.dataVatTuDXTemp;
        // console.log('this.dataVatTuDXTemp',this.dataVatTuDXTemp);
        this.dataVatTuDXTemp = this.dataVatTuDXTemp.filter(function(item, pos, array){
            return array.map(function(mapItem){ return mapItem['InventoryID']; }).indexOf(item['InventoryID']) === pos;
        });
        // console.log('this.dataVatTuDXTemp1111',this.dataVatTuDXTemp);
        this.dataVatTuDXTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
            find=true;
            this.dataVatTuDXTemp[idx].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
        }});
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

    render() {
        const {dataVatTuDX} = this.state;
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
                <Search onChangePress={(text) => {
                    this.changeSearch(text)
                }}
                        style={{
                            marginTop: Scale(5),
                            paddingHorizontal: Scale(15),
                            height: Scale(43)
                        }}
                        height={43}
                        placeholderTitle={Config.lang('PM_Tim_kiem_vat_tu')}
                />

                    <CListView
                        ref="CListView"
                        extraScrollHeight={Scale(100)}
                        data={dataVatTuDX || []}
                        extraData={dataVatTuDX}
                        keyExtractor={(item) => item.InventoryID}
                        onRefresh={this._onRefresh}
                        onLoadMore={this._onLoadMore}
                        renderHeader={()=>dataVatTuDX.map((item, idx)=>{
                            if(!item.OQuantity) return null;
                            return(
                                <SelectProposeItems
                                    onChangeValue={(number)=>this.changeValue(number, idx, item)}
                                    onChangeDate={(date)=>{this.onChangeDate(date, idx, item)}}
                                    disable={false}
                                    disableRemove={true}
                                    value={item}
                                    key={idx}
                                />
                            )
                        })}
                        renderItem={(item, idx) => {
                            if(item.OQuantity) return null;
                            return <SelectProposeItems
                                onChangeValue={(number)=>this.changeValue(number, idx, item)}
                                onChangeDate={(date)=>{this.onChangeDate(date, idx, item)}}
                                                    disable={false}
                                                    disableRemove={true}
                                                    value={item}
                                                    key={idx}
                            />
                        }}
                        renderPlaceholder={(item, idx)=>this._renderPlaceHolder(item, idx)}
                />
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
        getListInventoryPropose: state.dxkvt.getListInventoryPropose,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(ChonVatTuDeXuatScreen);
