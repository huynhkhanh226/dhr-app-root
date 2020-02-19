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
import * as xkvtAction from '../../redux/xuat_kho_vat_tu/xkvt_actions';
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import CListView from "../../libs/CListView/CListView";


class DuAnComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangeDuAn = (value) => {
        if(this.props.navigation.state.params.onChange){
            this.props.navigation.state.params.onChange(value);
            this.props.navigation.goBack(null);
        }
    };

    render() {
        const {value, isChecked} = this.props;
        return (
            <TouchableOpacity style={styles.component} onPress={()=>this.onChangeDuAn(value)}>
                <View style={styles.viewComponent}>
                    <View style={styles.viewTextComponent}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ten_du_an')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.ProjectName}

                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textTitleComponent}>
                            {Config.lang('PM_Ma_du_an')}
                        </Text>
                        <Text style={styles.textValueComponent}>
                            {value.ProjectID}
                        </Text>
                    </View>
                </View>
                {isChecked && <View style={styles.viewCheck}>
                    <Image style={styles.imageCheck}
                           source={require('../../assets/images/icon_check_box.png')}/>
                </View>}
            </TouchableOpacity>
        )
    }
}

class DuAnDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sSubmit: false,
            dataDuAnDeXuat: []
        });

        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            StrSearch: ''
        };
    }

    changeSearch = (text) => {
        // console.log("change text", text);
        this.dataFilter.StrSearch = text;
        this.dataFilter.skip = 0;
        this.setState({
            dataDuAn:[]
        },()=>{
            // if(this.refs['CListView']) this.refs['CListView'].loadData();
        });

    };


    // componentDidMount() {
    //     if (this.refs['CListView']) this.refs['CListView'].loadData();
    // }
    //
    // _onRefresh = (cb) => {
    //     // console.log("_onRefresh _onRefresh");
    //     this.dataFilter.skip = 0;
    //     this.setState({
    //         dataDuAn: [],
    //     },()=>{
    //         if (this.refs['CListView']) this.refs['CListView'].loadData();
    //     });
    // };
    //
    // _onLoadMore = (cb) => {
    //     // console.log("_onLoadMore _onLoadMore");
    //     this._makeRemoteRequest(cb);
    // };
    //
    // _makeRemoteRequest = (cb) => {
    //     this.props.xkvtAction.getListProject(this.dataFilter, (error, data) => {
    //         let dataDuAnTemp = [...this.state.dataDuAn];
    //         if (error) {
    //             Config.alertMess({code: '', message: error.message});
    //             this.setState({
    //                 dataDuAn: [],
    //                 isSubmit: true
    //             }, () => {
    //                 cb && cb(0);
    //             });
    //         } else if (data) {
    //             dataDuAnTemp = dataDuAnTemp && data.rows ? dataDuAnTemp.concat(data.rows) : data.rows;
    //             this.setState({
    //                 dataDuAn: dataDuAnTemp,
    //                 isSubmit: true
    //             }, () => {
    //                 cb && cb(data.total - dataDuAnTemp.length);
    //                 this.dataFilter.skip += this.dataFilter.limit;
    //             });
    //         }
    //     });
    // };

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
        const {dataDuAnDeXuat} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{
                            height: Scale(43)
                        }}
                        headerName={Config.lang('PM_Du_an')}/>
                <Search onChangePress={(text) => {
                    this.changeSearch(text)
                }}
                        height={43}
                        style={{marginTop: Scale(5), paddingHorizontal: Scale(15), height: Scale(43)}}
                        placeholderTitle={Config.lang('PM_Noi_dung_can_tim')}/>
                <CListView
                    style={{paddingHorizontal: Scale(15)}}
                    ref="CListView"
                    data={dataDuAnDeXuat || []}
                    extraData={dataDuAnDeXuat}
                    keyExtractor={(item) => item.ProjectID}
                    // onRefresh={this._onRefresh}
                    // onLoadMore={this._onLoadMore}
                    renderItem={(item, index) => {
                        // const isChecked = this.props.navigation.state.params.ProjectID === item.ProjectID;
                        return(
                            <DuAnComponent value={item} key={index} isChecked={true} navigation={this.props.navigation}/>
                        )
                    }}
                    renderPlaceholder={(item, idx)=>this._renderPlaceHolder(item, idx)}
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
        minHeight: Scale(80),
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
        width: Scale(102),
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
        position:'absolute',
    },
    imageCheck: {
        width: Scale(18),
        height: Scale(14)
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
    }
};

export default connect(state => ({
        // getListProject: state.xkvt.getListProject,
    }),
    (dispatch) => ({
        // xkvtAction: bindActionCreators(xkvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(DuAnDeXuatScreen);
