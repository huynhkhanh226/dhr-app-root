import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as navigationActions from '../../navigation/redux/navigation_actions.js';

import Config, {Scale} from '../../config';
import CDate from "../../libs/CDate/CDate";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as xnycthAction from "../../redux/xac_nhan_yeu_cau_tra_hang/xnycth_actions";
import DanhSachComponent from "./DanhSachComponent";
import CListView from "../../libs/CListView/CListView";
import ContentLoader, {Rect} from "react-content-loader/native";
moment.locale('vi', {
    week: {
        dow: 1
    }
});

class DaXacNhanTraHangScreen extends Component {

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
            dataConfirmWH: [],
        });
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            DivisionID: Config.profile.localHost,
        };
    }

    onSearch = () => {
        this.dataFilter.skip = 0;
        this.setState({
            dataConfirmWH: []
        }, () => {
            if(this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    goDetail = (data) => {
        this.props.navigationActions.changeScreen('ChiTietXacNhanTraHangTabScreen', {VoucherID: data.VoucherID, IsConfirm: data.IsConfirm});
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
            dataConfirmWH:[]
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

        this.props.xnycthAction.getListConfirmRT(this.dataFilter, (error, data) => {
            let dataConfirmWHTemp = [...this.state.dataConfirmWH];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataConfirmWH: [],
                    isSubmit: true
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataConfirmWHTemp = dataConfirmWHTemp && data.rows ? dataConfirmWHTemp.concat(data.rows) : data.rows;
                this.setState({
                    dataConfirmWH: dataConfirmWHTemp,
                    isSubmit: true
                }, () => {
                    cb && cb(data.total - dataConfirmWHTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
        });
    };

    _renderPlaceHolder = (item, idx) => {
        return (
            <ContentLoader key={idx}
                           height={Scale(136)}
                           width={Config.w-32}
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
            </ContentLoader>
        )
    };


    render() {
        let {valueDateFrom, valueDateTo, dataConfirmWH} = this.state;
        const {getListConfirmRT} = this.props;
        const getList = getListConfirmRT && getListConfirmRT.rows ? getListConfirmRT.rows : [];
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
                                       lineHeight: Math.floor(Scale(24, true)),
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
                               maximumDate={valueDateTo ? new Date(moment(valueDateTo, this.formatDate).toDate()) : null}
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
                               minimumDate={valueDateFrom ? new Date(moment(valueDateFrom, this.formatDate).toDate()) : null}
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
                                       lineHeight: Math.floor(Scale(24, true)),
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
                    data={getList ? getList : dataConfirmWH}
                    extraData={getList ? getList : dataConfirmWH}
                    keyExtractor={(item) => item.VoucherID}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item, index) => (
                        <DanhSachComponent
                            value={item}
                            key={index}
                            goDetail={() => this.goDetail(item)}
                        />
                    )}
                    renderPlaceholder={(item, idx) => this._renderPlaceHolder(item, idx)}
                />
            </View>
        );
    }
}

export default connect(state => ({
        getListConfirmRT: state.xnycth.getListConfirmRT
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xnycthAction: bindActionCreators(xnycthAction, dispatch),
    })
)(DaXacNhanTraHangScreen);

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

    viewHeader: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C8C8C8',
        height: Scale(60),
        alignItems: 'center',
        paddingHorizontal: Scale(15)
    },

    styleLine: {
        justifyContent: 'center',
        height: Scale(60),
        borderBottomWidth: Scale(3),
        paddingHorizontal: Scale(4),
        marginBottom: Scale(-3)
    },

    txtTitle: {
        flex: 1,
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(20),
        lineHeight: Math.floor(Scale(25))
    },

    viewTab: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Scale(150),
        height: Scale(60)
    },

    txtAll: {
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(60)),
        fontFamily: Config.getFont('Muli-Bold')
    },

    txtTime: {
        fontSize: Scale(14),
        width: '100%',
        textAlign: 'left',
        lineHeight: Math.floor(Scale(20)),
        color: 'black',
        marginTop: Scale(5),
        fontFamily: Config.getFont('Muli-Light'),
    },

    itemView: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        padding: Scale(15),
        borderBottomWidth: 1,
        borderBottomColor: Config.gStyle.color_ECECEC,
        flexDirection: 'row',
        position: 'relative',
    },

    viewTextItem: {
        marginLeft: Scale(17),
        // height:'100%',
        width: Config.w - Scale(100),
        justifyContent: 'center',
        position: 'relative'
    },
    textName: {
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(20)),
        fontFamily: Config.getFont('Muli-Bold'),
    },
    textTitle: {
        color: Config.gStyle.color_black,
        fontSize: Scale(14),
        lineHeight: Math.floor(Scale(18)),
        fontFamily: Config.getFont('Muli'),
    },
    imgAva: {
        width: Scale(40),
        height: Scale(40),
        borderRadius: Scale(20),
        overflow: "hidden",
    },

    title: {
        color: Config.gStyle.color_black,
        fontSize: Scale(13),
        lineHeight: Math.floor(Scale(18)),
        marginTop: Scale(20)
    },
    indicator: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    titleNew: {
        paddingHorizontal: Scale(16),
        lineHeight: Math.floor(Scale(36)),
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(14),
    },

    btnTextView: {
        fontSize: Scale(16),
        fontFamily: 'Muli',
        paddingLeft: Scale(25)
    },

    bgPopup: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagePopup: {
        backgroundColor: 'white',
        width: Scale(145),
        // height:Scale(132),
        flex: 1,
        zIndex: 2,
        // overflow:'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Scale(44),
        right: 0,

        //ios
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 10,
    },

    btnPopup: {
        height: Scale(40),
        borderBottomWidth: 1,
        borderBottomColor: Config.gStyle.color_ECECEC
    },

    togglePopup: {
        position: 'absolute',
        right: Scale(15),
        top: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Scale(44),
    },
    txtPopup: {
        color: Config.gStyle.color_def,
        fontSize: Scale(16),
        marginRight: Scale(8)
    },
    viewLoading: {
        flex: 1,
        marginHorizontal: Scale(15)
    }
};

