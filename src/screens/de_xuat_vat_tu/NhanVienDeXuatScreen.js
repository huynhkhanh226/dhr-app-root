import React, {Component} from 'react';
import {
    View, Text, Image,
    TouchableOpacity
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";
import Search from '../../libs/CSearch/Search_item';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import CListView from "../../libs/CListView/CListView";
import CImage from "../../libs/CImage/CImage";


class NhanVienComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangeNV = (value) => {
        if(this.isSubmit) return;
        this.isSubmit = true;
        if (this.props.navigation.state.params.onChange) {
            setTimeout(()=>{
                this.isSubmit=false;
            },1000);
            this.props.navigation.state.params.onChange(value);
            this.props.navigation.goBack(null);
        }
    };

    render() {
        const {value, isChecked} = this.props;
        return (
                <TouchableOpacity style={{
                    width:Scale(330),
                    marginHorizontal: Scale(15),
                    height:Scale(92),
                    backgroundColor:'#FAFAFC',
                    borderColor:'#F6F6F6',
                    borderRadius:Scale(10),
                    flexDirection:'row',
                    marginBottom:Scale(8)
                }}
                 onPress={() => this.onChangeNV(value)}
                >
                    <View style={{width: '30%', padding: Scale(3), height:'100%'}}>
                        <CImage source={value.EmployeePicture}
                                style={{
                                    borderRadius: Scale(10),
                                    alignItems: 'center',
                                    paddingBottom: Scale(3),
                                    backgroundColor: '#FAFAFC',

                                }}
                                width={86} height={86}
                                resizeMode="cover"
                        />
                    </View>
                    <View style={{
                        width: '60%',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        paddingVertical:Scale(12),
                        fontFamily: Config.getFont('Muli-Regular'),
                    }}>
                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <Text style={{
                                flex:3,
                                fontSize:Scale(14),
                                fontFamily:Config.getFont('Muli-Regular'),
                                lineHeight:Math.floor(Scale(18)),
                                color:'#212121'
                            }} numberOfLines={2}>
                                {Config.lang('PM_Ten_NV')}
                            </Text>
                            <Text style={{
                                fontSize:Scale(14),
                                // width:'100%',
                                flex:7,
                                fontFamily:Config.getFont('Muli-Bold'),
                                lineHeight:Math.floor(Scale(18)),
                                color:'#212121'
                            }} numberOfLines={2}>
                                {value.EmployeeName ? value.EmployeeName : ''}
                            </Text>
                        </View>
                        <View style={{
                            width:'100%',
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                            <Text style={{
                                flex:3,
                                fontSize:Scale(14),
                                fontFamily:Config.getFont('Muli-Regular'),
                                lineHeight:Math.floor(Scale(18)),
                                color:'#212121'
                            }} numberOfLines={2}>
                                {Config.lang('PM_Ma_NV')}
                            </Text>
                            <Text style={{
                                fontSize:Scale(14),
                                // width:'100%',
                                flex:7,
                                fontFamily:Config.getFont('Muli-Bold'),
                                lineHeight:Math.floor(Scale(18)),
                                color:'#212121'
                            }} numberOfLines={2}>
                                {value.EmployeeID ? value.EmployeeID : ''}
                            </Text>
                        </View>
                    </View>
                    {isChecked && <View style={{
                        width: '10%',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: Scale(2),
                    }}>
                        <Image style={styles.imageCheck}
                               source={require('../../assets/images/icon_check_box.png')}/>
                    </View>}
                </TouchableOpacity>
        )
    }
}

class NhanVienDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sSubmit: false,
            dataNhanVien: []
        });

        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: ''
        };
    }

    changeSearch = (text) => {
        this.dataFilter.search = text;
        this.dataFilter.skip = 0;
        this.setState({
            dataNhanVien: []
        }, () => {
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });

    };


    componentDidMount() {
        if (this.refs['CListView']) this.refs['CListView'].loadData();
    }

    _onRefresh = (cb) => {
        this.dataFilter.skip = 0;
        this.setState({
            dataNhanVien: [],
        },()=>{
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    _onLoadMore = (cb) => {
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest = (cb) => {
        this.props.dxvtAction.getListEmployee(this.dataFilter, (error, data) => {
            let dataNhanVienTemp = [...this.state.dataNhanVien];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataNhanVien: [],
                    isSubmit: true
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataNhanVienTemp = dataNhanVienTemp && data.rows ? dataNhanVienTemp.concat(data.rows) : data.rows;
                this.setState({
                    dataNhanVien: dataNhanVienTemp,
                    isSubmit: true
                }, () => {
                    cb && cb(data.total - dataNhanVienTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item, idx) => {
        return (
            <ContentLoader key={idx}
                           height={Scale(60)}
                           width={Scale(330)}
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
        const {dataNhanVien} = this.state;

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{
                            height: Scale(43)
                        }}
                        headerName={Config.lang('PM_Chon_nhan_vien')}/>
                <Search onChangePress={(text) => {
                    this.changeSearch(text)
                }}
                        height={43}
                        style={{marginTop: Scale(5), paddingHorizontal: Scale(15), height: Scale(43)}}
                        placeholderTitle={Config.lang('PM_Noi_dung_can_tim')}
                />

                <CListView
                    style={{
                        // paddingHorizontal: Scale(15),
                        paddingTop: Scale(15)
                    }}
                    ref="CListView"
                    data={dataNhanVien || []}
                    extraData={dataNhanVien}
                    keyExtractor={(item) => item.EmployeeID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item, index) => {
                        const isChecked = this.props.navigation.state.params.EmployeeID === item.EmployeeID;
                        return (
                            <NhanVienComponent value={item} key={index}
                                               isChecked={isChecked}
                                              navigation={this.props.navigation}/>
                        )
                    }}
                    renderPlaceholder={(item, idx) => this._renderPlaceHolder(item, idx)}
                />
            </View>
        );
    }
}

const styles = {
    component: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C5C7',
    },
    viewComponent: {
        minHeight: Scale(110),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: Scale(15),
    },
    viewTextComponent: {
        flexDirection: 'row',
        paddingBottom: Scale(10),
    },
    textTitleComponent: {
        width: Scale(120),
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Regular'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
    },
    textValueComponent: {
        width: Scale(200),
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
    },
    viewCheck: {
        width: '10%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        right: Scale(2),
    },
    imageCheck: {
        width: Scale(18),
        height: Scale(14)
    },
    container: {
        // flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white',
        minHeight: '100%',
        // justifyContent: 'center',
    },
    viewLoading: {
        flex: 1,
        width: Scale(330) ,
        marginHorizontal: Scale(15)
    },
};

export default connect(state => ({
        getListEmployee: state.xkvt.getListEmployee,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(NhanVienDeXuatScreen);
