import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import Search from '../../libs/CSearch/Search_item';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as baohongAction from '../../redux/phieu_bao_hong/baohong_actions';
import CListView from "../../libs/CListView/CListView";

class HienTuongComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            dataKho:[]
        });
    }

    onChangeHT = (value, ischeck) => {
        if (this.props.onChange) this.props.onChange(value, ischeck);
        // if(this.props.navigation.state.params.onChange){
        //     this.props.navigation.state.params.onChange(value);
            // this.props.navigation.goBack(null);
        // }
    };

    render() {
        const {value, isChecked} = this.props;
        const ischeck = value && value.isCheck ? value.isCheck : false;
        return(
             <TouchableOpacity style={styles.component} onPress={()=>this.onChangeHT(value, isChecked)}>
                <View style={styles.viewComponent}>
                    <View style={styles.viewTextComponent}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ten')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.PhenomenaName}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ma')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.PhenomenaID}
                        </Text>
                    </View>
                </View>
                {ischeck &&
                    <View style={styles.viewCheck}>
                        <Image style={styles.imageCheck}
                            source={require('../../assets/images/icon_check_box.png')}/>
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

class ChonHienTuongScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sSubmit: false,
            isCheck: false,
            dataHT: []
        });

        this.perPage = 1000;
        this.dataFilter = {
            limit: this.perPage,
            skip:0,
            StrSearch:'',
        };
    }

    changeSearch = (text) => {
        this.dataFilter.StrSearch = text;
        this.dataFilter.skip = 0;
        this.setState({
            dataHT:[]
        },()=>{
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });

    };

    componentDidMount() {
        if(this.refs['CListView']) this.refs['CListView'].loadData();
    }

    onSubmit = () => {
        let dataChoose = [];
        if(this.dataHTTemp.length <= 0){
            this.dataHTTemp = [...this.state.dataHT];
        }
        if(this.dataHTTemp && this.dataHTTemp.length>0){
            this.dataHTTemp.forEach((item)=>{
                if(item.isCheck){
                    dataChoose.push(item);
                }
            });
        }
        const dataParams = this.props.navigation.state.params.phenomena ? this.props.navigation.state.params.phenomena : [];
        dataParams.forEach((item)=>{
            const invenOld = this.dataHTTemp.find(i=>i.PhenomenaID === item.PhenomenaID);
            if(!invenOld){
                dataChoose.push(item);
            }
        });
        if(this.props.navigation.state.params.onChange){
            this.props.navigation.state.params.onChange({
                Phenomena:dataChoose,
                inventoryID: this.props.navigation.state.params.inventoryID
            });
            this.props.navigation.goBack();
        }
    };

    changeValue = (value,index) => {
        const {dataHT, isCheck}= this.state;
        const checked = value && value.isCheck ? value.isCheck : false;
        this.dataHTTemp = dataHT ? [...dataHT] : [];
        if(value){
            this.dataHTTemp.forEach((key, idx)=>{ if(key.PhenomenaID === value.PhenomenaID){
                this.dataHTTemp[idx].isCheck = isCheck ? !isCheck : !checked;
            }});
            this.setState({
                dataHT: this.dataHTTemp,
            });
        }
        else if(!!this.dataHTTemp && !!this.dataHTTemp[index]){
            this.dataHTTemp[index].isCheck = isCheck ? !isCheck : !checked;
        }
    };

    _onRefresh=(cb)=>{
        this.dataFilter.skip = 0;
        this.setState({
            dataHT: [],
        },()=>{
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    _onLoadMore=(cb)=>{
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest=(cb)=>{
        this.props.baohongAction.getListChoosePhenomenaBroken({}, (error, data) => {
            let dataHTTemp = [...this.state.dataHT];
            if(error){
                Config.alertMess({code:'', message: error.message});
                this.setState({
                    dataHT:[],
                    isSubmit: true
                },()=>{
                    cb && cb(0);
                });
            }
            else if(data){
                dataHTTemp = dataHTTemp && data.rows ? dataHTTemp.concat(data.rows) : data.rows;
                const phenomena =  this.props.navigation.state.params.phenomena;
                if(phenomena && phenomena.length > 0){
                    dataHTTemp.forEach((item, idx)=>{
                        const temp = phenomena.find(i=>i.PhenomenaID === item.PhenomenaID);
                        if(temp){
                            dataHTTemp[idx].isCheck = true;
                        }
                    });
                }
                this.setState({
                    dataHT: dataHTTemp,
                    isSubmit: true
                },()=>{
                    cb && cb(data.total - dataHTTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item,idx) => {
        return(
            <ContentLoader key={idx}
                           height={Scale(60)}
                           width={Config.w}
                           style={styles.viewLoading}
            >
                <Rect x={0}
                      y={Scale(13)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(13)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(220)}
                      height={Scale(10)}
                />
                <Rect x={0}
                      y={Scale(33)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(33)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(150)}
                      height={Scale(10)}
                />
            </ContentLoader>
        )
    };

    render() {
        const {dataHT} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        btnRight={Config.lang('PM_Luu')}
                        colorBtnRight={Config.gStyle.color_def}
                        onRight={this.onSubmit}
                        customClass={{height: Scale(43)}}
                        headerName={Config.lang('PM_Chon_hien_tuong')}/>
                <Search onChangePress={(text)=>{this.changeSearch(text)}}
                        height={43}
                        style={{
                            height: Scale(43),
                            paddingHorizontal:Scale(15),
                            marginTop: Scale(5),
                        }}
                        placeholderTitle={Config.lang('PM_Tim_kiem_hien_tuong')}
                />
                <CListView
                    style={{paddingHorizontal: Scale(15)}}
                    ref="CListView"
                    data={dataHT || []}
                    extraData={dataHT}
                    keyExtractor={(item)=>item.PhenomenaID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item,index)=> {
                        return (
                            <HienTuongComponent onChange={(item,index) => this.changeValue(item, index)}
                                                value={item}
                                                isChecked={dataHT.isCheck}
                                                key={index}
                                                navigation={this.props.navigation}
                            />
                        )
                    }}
                    renderPlaceholder={(item, idx)=>this._renderPlaceHolder(item, idx)}
                />
            </View>
        );
    }
}

const styles = {
    component:{
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C5C7',
    },
    viewComponent:{
        minHeight: Scale(80),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:Scale(15)
    },
    viewTextComponent: {
        flexDirection: 'row',
        paddingBottom:Scale(10)
    },
    textTitleComponent:{
        width: Scale(102),
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Regular'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
    },
    textValueComponent:{
        width: Scale(200),
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
    },
    viewCheck:{
        width:'10%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:Scale(2),
    },
    imageCheck:{
        width:Scale(18),
        height:Scale(14)
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: '100%',
        justifyContent: 'center',
    },
    viewLoading:{
        flex:1,
        width:'100%',
        marginVertical: Scale(5),
    }
};

export default connect(state => ({
        getListChoosePhenomenaBroken: state.baohong.getListChoosePhenomenaBroken,
    }),
    (dispatch) => ({
        baohongAction: bindActionCreators(baohongAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(ChonHienTuongScreen);
