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
import * as xkvtAction from '../../redux/xuat_kho_vat_tu/xkvt_actions';
import CListView from "../../libs/CListView/CListView";

class KhoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
            dataKho:[]
        });
    }

    onChangeKho = (value) => {
        if(this.props.navigation.state.params.onChange){
            this.props.navigation.state.params.onChange(value);
            this.props.navigation.goBack(null);
        }
    };

    render() {
        const {value, isChecked} = this.props;
        return(
             <TouchableOpacity style={styles.component} onPress={()=>this.onChangeKho(value)}>
                <View style={styles.viewComponent}>
                    <View style={styles.viewTextComponent}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ten_kho')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.WHName}

                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ma_kho')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.WareHouseID}
                        </Text>
                    </View>
                </View>
                {isChecked &&
                    <View style={styles.viewCheck}>
                        <Image style={styles.imageCheck}
                            source={require('../../assets/images/icon_check_box.png')}/>
                    </View>
                }
            </TouchableOpacity>
        )
    }
}

class KhoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sSubmit: false,
            dataKho: []
        });

        this.perPage = 1000;
        this.dataFilter = {
            limit: this.perPage,
            skip:0,
            StrSearch:'',
            ProjectID: props.navigation.state.params.id,
        };
    }

    changeSearch = (text) => {
        // console.log("change text", text);
        this.dataFilter.StrSearch = text;
        this.dataFilter.skip = 0;
        this.setState({
            dataKho:[]
        },()=>{
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });

    };

    componentDidMount() {
        if(this.refs['CListView']) this.refs['CListView'].loadData();
    }

    _onRefresh=(cb)=>{
        this.dataFilter.skip = 0;
        this.setState({
            dataKho: [],
        },()=>{
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    _onLoadMore=(cb)=>{
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest=(cb)=>{
        this.props.xkvtAction.getListWareHouse(this.dataFilter, (error, data) => {
            let dataKhoTemp = [...this.state.dataKho];
            if(error){
                Config.alertMess({code:'', message: error.message});
                this.setState({
                    dataKho:[],
                    isSubmit: true
                },()=>{
                    cb && cb(0);
                });
            }
            else if(data){
                dataKhoTemp = dataKhoTemp && data.rows ? dataKhoTemp.concat(data.rows) : data.rows;
                this.setState({
                    dataKho: dataKhoTemp,
                    isSubmit: true
                },()=>{
                    cb && cb(data.total - dataKhoTemp.length);
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
        const {dataKho} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{height: Scale(43)}}
                        headerName={Config.lang('PM_Kho')}/>
                <Search onChangePress={(text)=>{this.changeSearch(text)}}
                        height={43}
                        style={{
                            height: Scale(43),
                            paddingHorizontal:Scale(15),
                            marginTop: Scale(5),
                        }}
                        placeholderTitle={Config.lang('PM_Tim_kiem_kho')}
                />
                <CListView
                    style={{paddingHorizontal: Scale(15)}}
                    ref="CListView"
                    data={dataKho || []}
                    extraData={dataKho}
                    keyExtractor={(item)=>item.WareHouseID+item.DivisionID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item,index)=> {
                        const isChecked = this.props.navigation.state.params.WareHouseID === item.WareHouseID;
                        return (
                            <KhoComponent value={item}
                                          isChecked={isChecked}
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
        getListWareHouse: state.xkvt.getListWareHouse,
    }),
    (dispatch) => ({
        xkvtAction: bindActionCreators(xkvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(KhoScreen);
