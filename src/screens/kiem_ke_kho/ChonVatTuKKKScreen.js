import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";
import Search from '../../libs/CSearch/Search_item';
import SelectInfoItems from "../../libs/CSelectInfoItems/select_info_items";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as kiemkekhoAction from '../../redux/kiem_ke_kho/kiemkekho_actions';
import ContentLoader, {Rect} from "react-content-loader/native";
import CListView from "../../libs/CListView/CListView";
import SelectProposeItems from "../../libs/CSelectInfoItems/select_propose_items";

class ChonVatTuKKKScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataVatTu: []
        });

        this.perPage = 10;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: '',
            WareHouseID: props.navigation.state.params.id,
            DivisionID: Config.profile.localHost,
        };
        this.dataVatTuTemp=[];
    }

    componentDidMount() {
        if (this.refs['CListView']) this.refs['CListView'].loadData();
    }

    _onRefresh = (cb) => {
        this.dataFilter.skip = 0;
        let dataTemp = [...this.state.dataVatTu];
        dataTemp = dataTemp.filter(i=>i.OQuantity);
        this.setState({
            dataVatTu:dataTemp
        },()=>{
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    _onLoadMore = (cb) => {
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest = (cb) => {
        this.props.kiemkekhoAction.getInventory(this.dataFilter, (error, data) => {
            // console.log('getInventory getInventory',error, data);
            let dataVatTuTemp = [...this.state.dataVatTu];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataVatTu: [],
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataVatTuTemp = dataVatTuTemp && data.rows ? dataVatTuTemp.concat(data.rows) : data.rows;
                const dataParams = this.dataVatTuTemp;
                if(dataParams && dataParams.length > 0){
                    dataVatTuTemp.forEach((item, idx)=>{
                        const temp = dataParams.find(i=>i.InventoryID === item.InventoryID);
                        if(temp){
                            dataVatTuTemp[idx].OQuantity = temp.OQuantity;
                        }
                    });
                }
                dataVatTuTemp = dataVatTuTemp.filter(function(item, pos, array){
                    return array.map(function(mapItem){ return mapItem['InventoryID']; }).indexOf(item['InventoryID']) === pos;
                });
                this.setState({
                    dataVatTu: dataVatTuTemp,
                }, () => {
                    cb && cb(data.rows.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item,idx) => {
        return(
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
        this.dataFilter.StrSearch = text;
        this.dataFilter.skip = 0;
        let dataTemp = [...this.state.dataVatTu];
        dataTemp = dataTemp.filter(i=>i.OQuantity);
        this.setState({
            dataVatTu:dataTemp
        },()=>{
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    onSubmit = () => {
        let dataChoose = [];
        if(this.dataVatTuTemp.length <= 0){
            this.dataVatTuDXTemp = [...this.state.dataVatTu];
        }
        if(this.dataVatTuTemp && this.dataVatTuTemp.length>0){
            this.dataVatTuTemp.forEach((item)=>{
                if(item.OQuantity){
                    dataChoose.push(item);
                }
            });
        }
        const dataParams = this.props.navigation.state.params.Inventory ? this.props.navigation.state.params.Inventory : [];
        dataParams.forEach((item)=>{
            const invenOld = this.dataVatTuTemp.find(i=>i.InventoryID === item.InventoryID);
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
        const {dataVatTu}= this.state;
        this.dataVatTuTemp = dataVatTu ? [...dataVatTu] : [];
        if(item){
            this.dataVatTuTemp.forEach((key, idx)=>{ if(key.InventoryID === item.InventoryID){
                this.dataVatTuTemp[idx].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
            }});
        }
        else if(!!this.dataVatTuTemp && !!this.dataVatTuTemp[index]){
            this.dataVatTuTemp[index].OQuantity = count && parseInt(count) > 0 ? parseInt(count) : 0;
        }
    };

    render() {
        const {dataVatTu}= this.state;
        if(this.props.navigation.state.params  && this.props.navigation.state.params.Inventory){
            this.dataVatTuTemp = this.props.navigation.state.params.Inventory
        }
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        headerName={Config.lang('PM_Vat_tu')}
                        btnRight={Config.lang('PM_Luu')}
                        colorBtnRight={Config.gStyle.color_def}
                        onRight={this.onSubmit}
                        customClass={{
                            height: Scale(43)
                        }}
                />
                <Search onChangePress={(text)=>{this.changeSearch(text)}}
                        style={{
                            marginTop: Scale(5),
                            paddingHorizontal: Scale(15),
                            height:Scale(43)
                        }}
                        height={43}
                        placeholderTitle={Config.lang('PM_Tim_kiem_vat_tu')}
                />
                <CListView
                    ref="CListView"
                    extraScrollHeight={Scale(100)}
                    data={dataVatTu || []}
                    extraData={dataVatTu}
                    keyExtractor={(item) => item.InventoryID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderHeader={()=>this.dataVatTuTemp.map((item, idx)=>{
                        if(!item.OQuantity) return null;
                        return(
                            <SelectInfoItems onChangeValue={(number)=>this.changeValue(number, idx, item)}
                                             disable={false}
                                             disableRemove={true}
                                             isFree={true}
                                             value={item}
                                             key={idx}
                            />
                        )
                    })}
                    renderItem={(item, index) => {
                        if(this.dataVatTuTemp.find(i=>i.InventoryID===item.InventoryID)) return null;
                        return <SelectInfoItems onChangeValue={(number)=>this.changeValue(number, index)}
                                                disable={false}
                                                disableRemove={true}
                                                isFree={true}
                                                value={item}
                                                key={index}
                                                idx={index}
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
    viewLoading:{
        width: Scale(Config.w - 30),
        backgroundColor: '#FAFAFC',
        marginTop: Scale(15),
        borderRadius: Scale(10),
        marginHorizontal: Scale(15)
    }
};

export default connect(state => ({
        getInventory: state.kiemkekho.getInventory,
    }),
    (dispatch) => ({
        kiemkekhoAction: bindActionCreators(kiemkekhoAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(ChonVatTuKKKScreen);
