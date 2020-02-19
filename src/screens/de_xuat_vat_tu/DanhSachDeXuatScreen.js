import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import {connect} from "react-redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import {bindActionCreators} from "redux";
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CDate from "../../libs/CDate/CDate";
import Config, {Scale} from '../../config';
import CListView from "../../libs/CListView/CListView";
import CButton from "../../libs/CButton/CButton";
import ContentLoader, {Rect} from "react-content-loader/native";
moment.locale('vi', {
    week: {
        dow: 1
    }
});

class DanhSachDeXuat extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangePress = () => {
        if (this.props.onChangePress) this.props.onChangePress();
    };

    render() {
        const {value} = this.props;
        return (
            <View style={styles.componentContainer}>
                <TouchableOpacity
                    style={styles.componentViewContainer}
                    onPress={this.onChangePress}
                >
                    <View style={{height: '100%', width: '100%'}}>
                        <View style={styles.componentViewContent}>
                            <Text style={styles.componentTextContent}>
                                {Config.lang("PM_Du_an")}
                            </Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.ProjectName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Loai_de_xuat")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.ProposeTypeName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_So_ban_giao")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value.DeliveryVoucherNo}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Nguoi_yeu_cau")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight}
                                  numberOfLines={1}>
                                {value.EmployeeName}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Ngay_yeu_cau")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight} numberOfLines={1}>
                                {value && value.RequestDate ? moment(value.RequestDate).format('DD/MM/YYYY') : null}
                            </Text>
                        </View>
                        <View style={styles.componentViewContent}>
                            <Text
                                style={styles.componentTextContent}>{Config.lang("PM_Trang_thai")}</Text>
                            <View style={styles.viewDashContent}>
                            </View>
                            <Text style={styles.componentTextContentRight}
                                  numberOfLines={1}>
                                {value.StatusName}
                            </Text>
                        </View>
                    </View>
                    {/*<CButton onPress={this.onChangePress}*/}
                    {/*         width={60}*/}
                    {/*         height={40}*/}
                    {/*         style={{*/}
                    {/*             position: 'absolute',*/}
                    {/*             right: 0,*/}
                    {/*             alignItems:'center',*/}
                    {/*             height:'100%',*/}

                    {/*         }}*/}
                    {/*         styleCustomText={styles.componentTextFooter}*/}
                    {/*         text={Config.lang("PM_Chi_tiet")}*/}
                    {/*/>*/}
                    {/*</View>*/}
                </TouchableOpacity>
            </View>
        );
    }
}

class DanhSachDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.formatDate = 'DD/MM/YYYY';
        const today = moment();
        const from_date = today.startOf('week').toString();
        const to_date = today.endOf('week').toString();
        this.state = ({
            isSubmit: false,
            valueDateFrom: moment(from_date).format(this.formatDate),
            valueDateTo: moment(to_date).format(this.formatDate),
            dataDSXVT: [],
        });
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
        };
    }

    onSearch = () => {
        this.dataFilter.skip = 0;
        this.setState({
            dataDSXVT: []
        }, () => {
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    onLink = (data) => {
        this.props.navigationActions.changeScreen('ChiTietDeXuatVatTuTabScreen',{VoucherID:data.VoucherID, reload: this.onReLoad});
    };

    onReLoad = () => {
        const params = {
            limit:this.dataFilter.limit - this.perPage,
            skip:0,
        };
        if(this.dataFilter.DateFrom){
            params.DateFrom = this.dataFilter.DateFrom
        }
        if(this.dataFilter.DateTo){
            params.DateTo = this.dataFilter.DateTo
        }
        this.props.dxvtAction.getListPropose(params, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSXVT: [],
                    isSubmit: true
                });
            } else if (data) {
                this.setState({
                    dataDSXVT: data.rows ? data.rows : [],
                    isSubmit: true
                });
            }
        });
    };

    getList = () => {
        this.setState({
            isLoading: true
        },()=>{
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    componentDidMount() {
        this.getList();
    }

    _onRefresh = (cb) => {
        this.dataFilter.skip = 0;
        if(this.isSubmit) return;
        this.isSubmit = true;
        this.setState({
            dataDSXVT:[]
        },()=>{
            this.getList();
        })
    };

    _onLoadMore = (cb) => {
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest = (cb) => {
        const {valueDateFrom, valueDateTo} = this.state;

        this.dataFilter.DateFrom = moment(valueDateFrom, this.formatDate).format('YYYY-MM-DD');
        this.dataFilter.DateTo = moment(valueDateTo, this.formatDate).format('YYYY-MM-DD');


        this.props.dxvtAction.getListPropose(this.dataFilter, (error, data) => {
            let dataDSXVTTemp = [...this.state.dataDSXVT];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataDSXVT: [],
                    isSubmit: true
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataDSXVTTemp = dataDSXVTTemp && data.rows ? dataDSXVTTemp.concat(data.rows) : data.rows;
                this.setState({
                    dataDSXVT: dataDSXVTTemp,
                    isSubmit: true
                }, () => {
                    cb && cb(data.total - dataDSXVTTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item, idx) => {
        return (
            <ContentLoader key={idx}
                           height={Scale(136)}
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
                      width={Scale(230)}
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
                      width={Scale(230)}
                      height={Scale(10)}
                />
                <Rect x={0}
                      y={Scale(53)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(53)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(230)}
                      height={Scale(10)}
                />
                <Rect x={0}
                      y={Scale(73)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(73)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(230)}
                      height={Scale(10)}
                />
                <Rect x={0}
                      y={Scale(93)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(93)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(230)}
                      height={Scale(10)}
                />
                <Rect x={0}
                      y={Scale(113)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(60)}
                      height={Scale(10)}
                />
                <Rect x={Scale(100)}
                      y={Scale(113)}
                      rx={Scale(4)}
                      ry={Scale(4)}
                      width={Scale(230)}
                      height={Scale(10)}
                />
            </ContentLoader>
        )
    };

    render() {
        let {dataDSXVT, valueDateFrom, valueDateTo} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.viewSearchContent}>
                    <View style={styles.viewDateFrom}>
                        <CDate date={this.state.valueDateFrom}
                               onDateChange={(date) => {
                                   this.setState({valueDateFrom: date})
                               }}
                               customStyles={{
                                   dateInput: {
                                       alignItems: 'flex-end',
                                       position: 'absolute',
                                       borderWidth: 0,
                                       left: 0,
                                       color: 'rgba(0,0,0,0.87)',
                                       borderBottomWidth: 1,
                                       borderBottomColor: '#95989A',
                                       height: Scale(25)
                                   },
                                   dateText: {
                                       fontSize: Scale(16, true),
                                       fontFamily: Config.getFont('Muli-Regular'),
                                       lineHeight: Scale(24, true),
                                       color: 'rgba(0,0,0,0.87)',
                                   },
                                   placeholderText: {
                                       fontSize: Scale(14, true),
                                       fontFamily: Config.getFont('Roboto'),
                                       color: 'rgba(0,0,0,0.37)',
                                       lineHeight: Math.floor(Scale(19, true))
                                   }
                               }}
                               iconSource={null}
                               format={this.formatDate}
                               placeholder={Config.lang("PM_Tu_ngay")}
                               style={{zIndex: 1, flex: 3}}
                               maximumDate={valueDateTo ? new Date(moment(valueDateTo,this.formatDate).toDate()) : null}
                        />
                        <View style={styles.viewIconDateFrom}>
                            <Icon name={'sort-down'}
                                  size={Scale(22)}
                                  color={"#707070"}
                                  style={{marginTop: Scale(-9)}}
                            />
                        </View>
                    </View>
                    <Text style={styles.viewTextDate}>{Config.lang("PM_Den")}</Text>
                    <View style={styles.viewDateTo}>
                        <CDate date={this.state.valueDateTo}
                               minimumDate={valueDateFrom ? new Date(moment(valueDateFrom,this.formatDate).toDate()) : null}
                               onDateChange={(date) => this.setState({valueDateTo: date})}
                               customStyles={{
                                   dateInput: {
                                       alignItems: 'flex-end',
                                       position: 'absolute',
                                       borderWidth: 0,
                                       left: 0,
                                       borderBottomWidth: 1,
                                       borderBottomColor: '#95989A',
                                       color: 'rgba(0,0,0,0.87)',
                                       height: Scale(25)
                                   },
                                   dateText: {
                                       fontSize: Scale(16, true),
                                       fontFamily: Config.getFont('Muli-Regular'),
                                       lineHeight: Scale(24, true),
                                       color: 'rgba(0,0,0,0.87)',
                                   }, placeholderText: {
                                       fontSize: Scale(14, true),
                                       width: '100%',
                                       fontFamily: Config.getFont('Roboto'),
                                       color: 'rgba(0,0,0,0.37)',
                                       lineHeight: Math.floor(Scale(19, true))
                                   }
                               }}
                               iconSource={null}
                               format={this.formatDate}
                               placeholder={Config.lang("PM_Den_ngay")}
                               style={{
                                   zIndex: 1,
                                   flex: 3,
                                   paddingRight: Scale(8),
                               }}/>
                        <View style={styles.viewIconDateTo}>
                            <Icon name={'sort-down'}
                                  size={Scale(22)}
                                  color={"#707070"}
                                  style={{marginTop: Scale(-9)}}
                            />
                        </View>
                    </View>
                    <View style={styles.viewIconSearch}>
                        <TouchableOpacity style={styles.viewTouchSearch} onPress={this.onSearch}>
                            <Icon name={'search'}
                                  size={Scale(20)}
                                  color={"#FFFFFF"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <CListView
                    ref="CListView"
                    data={dataDSXVT}
                    extraData={dataDSXVT}
                    keyExtractor={(item) => item.VoucherID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item, index) => (
                        <DanhSachDeXuat
                            value={item}
                            key={index}
                            onChangePress={() => this.onLink(item)}
                        />
                    )}
                    renderPlaceholder={(item, idx) => this._renderPlaceHolder(item, idx)}
                />
            </View>
        );
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
    viewSearchContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: Scale(50),
        paddingHorizontal: Scale(16),
        alignItems: 'center',
        width: '100%',
    },
    viewDateFrom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Scale(110),
        height: '100%',
        left: 0,
    },
    viewIconDateFrom: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%'
    },
    viewTextDate: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Roboto'),
        color: 'rgba(0,0,0,0.37)',
        lineHeight: Math.floor(Scale(19)),
        paddingHorizontal: Scale(9),
    },
    viewDateTo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Scale(110),
    },
    viewIconDateTo: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
    },
    viewIconSearch: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flexDirection: 'row',
        paddingLeft: Scale(22),
    },
    viewTouchSearch: {
        width: Scale(36),
        height: Scale(36),
        borderRadius: Scale(36),
        backgroundColor: Config.gStyle.color_def,
        justifyContent: 'center',
        alignItems: 'center'
    },
    componentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#95989A',
        paddingHorizontal:Scale(15)
    },
    componentViewContainer: {
        // height: Scale(136),
        flexDirection: 'row',
        paddingVertical: Scale(9),
    },
    componentTextContainer: {
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(24)),
        color: '#141414',
        paddingTop: Scale(12),
        paddingBottom: Scale(5)
    },
    componentViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    componentTextContent: {
        width: Scale(124),
        color: '#323232',
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(20)),
    },
    componentTextContentRight: {
        width: Scale(194),
        color: '#323232',
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(20)),
    },
    viewDashContent: {
        width: 1,
        height: Scale(8),
        backgroundColor: '#C1C1C1',
        marginRight: Scale(10),
    },
    componentFooter: {
        height: Scale(100),
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: Scale(10),
        justifyContent: 'flex-end',
    },
    componentTextFooter: {
        fontFamily: Config.getFont('Muli'),
        fontSize: Scale(12),
        color: '#F94F37',
        lineHeight: Math.floor(Scale(15)),
    },
    viewLoading: {
        flex: 1,
        width: Scale(Config.w - 30),
        marginHorizontal: Scale(15)
    }
};

export default connect(state => ({
        getListPropose: state.dxkvt.getListPropose,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(DanhSachDeXuatScreen);
