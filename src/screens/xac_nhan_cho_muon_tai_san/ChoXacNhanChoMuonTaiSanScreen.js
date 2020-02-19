import React, {Component} from 'react';
import {
    View,
    Text, TouchableOpacity,
} from 'react-native';

import {connect} from "react-redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import {bindActionCreators} from "redux";
import * as xncmtsAction from "../../redux/xac_nhan_cho_muon_tai_san/xncmts_actions";

import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CDate from "../../libs/CDate/CDate";
import Config, {Scale} from '../../config';
import CListView from "../../libs/CListView/CListView";
import ContentLoader, {Rect} from "react-content-loader/native";
import DanhSachDeXuatComponent from "./DanhSachXNChoMuonTSComponent";

moment.locale('vi', {
    week: {
        dow: 1
    }
});

class ChoXacNhanChoMuonTaiSanScreen extends Component {
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
            dataWaitWH: [],
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
            dataWaitWH: []
        }, () => {
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    goDetail = (data) => {
        this.props.navigationActions.changeScreen('ChiTietXNChoMuonTSTabScreen', {VoucherID: data.VoucherID});
    };

    getList = () => {
        this.setState({
            isLoading: true
        }, () => {
            if (this.refs['CListView']) this.refs['CListView'].loadData();
        });
    };

    componentDidMount() {
        this.getList();
    }

    _onRefresh = (cb) => {
        this.dataFilter.skip = 0;
        if (this.isSubmit) return;
        this.isSubmit = true;
        this.setState({
            dataWaitWH: []
        }, () => {
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

        this.props.xncmtsAction.getListWaitingBorrow(this.dataFilter, (error, data) => {
            let dataWaitWHTemp = [...this.state.dataWaitWH];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataWaitWH: [],
                    isSubmit: true
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataWaitWHTemp = dataWaitWHTemp && data.rows ? dataWaitWHTemp.concat(data.rows) : data.rows;
                this.setState({
                    dataWaitWH: dataWaitWHTemp,
                    isSubmit: true
                }, () => {
                    cb && cb(data.total - dataWaitWHTemp.length);
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
            </ContentLoader>
        )
    };

    render() {
        let {dataWaitWH, valueDateFrom, valueDateTo} = this.state;
        const {getListWaitingBorrow} = this.props;
        const getList = getListWaitingBorrow && getListWaitingBorrow.rows ? getListWaitingBorrow.rows : [];

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
                                  size={Scale(22, true)}
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
                                   paddingRight: Scale(8, true),
                               }}/>
                        <View style={styles.viewIconDateTo}>
                            <Icon name={'sort-down'}
                                  size={Scale(22, true)}
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
                        data={getList ? getList : dataWaitWH}
                        extraData={getList ? getList : dataWaitWH}
                        keyExtractor={(item) => item.VoucherID}
                        onRefresh={this._onRefresh}
                        onLoadMore={this._onLoadMore}
                        renderItem={(item, index) => (
                            <DanhSachDeXuatComponent
                                value={item}
                                isStatus={false}
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
        fontSize: Scale(14, true),
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
        width: Scale(144),
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
        getListWaitingBorrow: state.xncmts.getListWaitingBorrow
    }), (dispatch) => ({
        navigationActions: bindActionCreators(navigationActions, dispatch),
        xncmtsAction: bindActionCreators(xncmtsAction, dispatch),
    })
)(ChoXacNhanChoMuonTaiSanScreen);
