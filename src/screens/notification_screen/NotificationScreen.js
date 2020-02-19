
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated, Platform, UIManager, Alert
} from 'react-native';

import CImage from '../../libs/CImage/CImage';
import Config, {Scale} from '../../config/index';
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import CListView from "../../libs/CListView/CListView";
import moment from "moment";
import firebase from "react-native-firebase";

class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            isTab: 0,
            isLoading: true,
            dataNoty:[]
        };
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            sort: JSON.stringify([{"createdAt": "DESC"}])
        };
    }

    _renderPlaceHolder = (item, idx) => {
        return (
            <ContentLoader key={'placeholder'+idx}
                           width={Scale(360)}
                           style={{height: Scale(80)}}
                           height={Scale(80)}
            >
                <Circle cx={Scale(24)}
                        cy={Scale(24)}
                        r={Scale(24)}
                        x={Scale(15)}
                        y={Scale(15)}
                />
                <Rect x={Scale(80)}
                      y={Scale(20)}
                      width={Scale(250)}
                      height={Scale(8)}
                />
                <Rect x={Scale(80)}
                      y={Scale(35)}
                      width={Scale(250)}
                      height={Scale(8)}
                />
                <Rect x={Scale(80)}
                      y={Scale(50)}
                      width={Scale(100)}
                      height={Scale(8)}
                />
            </ContentLoader>
        )
    };

    componentDidMount() {
        this.getList();
    }

    _onRefresh = (cb) => {
        if (this.isSubmit) return;
        this.isSubmit = true;
        this.dataFilter.skip = 0;
        this.setState({
            dataNoty: []
        }, () => {
            this.getList();
        });
    };

    _onLoadMore = (cb) => {
        this._makeRemoteRequest(cb);
    };

    _makeRemoteRequest = (cb) => {
        if(Config.profile && Config.profile.UserID ===  'GUEST'){
            cb && cb(0);
            this.isSubmit = false;
            return true;
        }
        const params = {
            limit: this.dataFilter.limit,
            skip: this.dataFilter.skip,
            sort: this.dataFilter.sort,
        };

        let type = '';
        if(this.state.isTab === 1){
            type = 'SPECIAL';
        }
        else if(this.state.isTab === 2){
            type = 'NORMAL';
        }

        if(type) params.type = type;

        this.props.homeActions.getListNoty(params, (error, data) => {
            let dataNotyTemp = [...this.state.dataNoty];
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataNoty: [],
                }, () => {
                    cb && cb(0);
                });
            } else if (data) {
                dataNotyTemp = dataNotyTemp && data.data ? dataNotyTemp.concat(data.data) : data.data;
                this.setState({
                    dataNoty: dataNotyTemp,
                }, () => {
                    cb && cb(data.total - dataNotyTemp.length);
                    this.dataFilter.skip += this.dataFilter.limit;
                });
            }
            this.isSubmit = false;
            this.props.mainActions.updateBadge(0);
            firebase.notifications().setBadge(0);
            firebase.notifications().cancelAllNotifications();
            firebase.notifications().removeAllDeliveredNotifications();
        });
    };

    getList = () => {
        if (this.refs['CListView']) this.refs['CListView'].loadData();
    };

    onLink = (data) => {
        if(data && data.payload && data.payload.form_id &&Config.getForm(data.payload.form_id)){
            this.props.navigation.changeScreen(Config.getForm(data.payload.form_id), {VoucherID: data.payload.voucher_id})
            this.props.homeActions.updateStatusNoty({id: data.id},(err, data)=>{
                if(data){
                    if (this.refs['CListView']) this.refs['CListView'].refresh();
                }
                else{
                    Config.alertMess(err);
                }
            });
        }
    };

    render() {
        const {dataNoty} = this.state;
        const {notificationRefresh} = this.props;
        const dataNotyTemp = dataNoty ? dataNoty : [];
        return (
            <View style={styles.container}>
                <View style={styles.viewHeader}>
                    <Text style={styles.txtTitle}>{Config.lang('PM_Thong_bao_header')}</Text>
                </View>
                <CListView
                    ref="CListView"
                    style={{flex:1}}
                    data={dataNotyTemp || []}
                    extraData={dataNotyTemp}
                    // data={[]}
                    // extraData={[]}
                    keyExtractor={(item) => item.id + item.createdAt}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    renderItem={(item, index) => {
                        return (
                            <Item data={item}
                                  onLink={this.onLink}
                                  isNew={item.read!=='Y'}
                                  key={'item-notification' + index}/>
                        )
                    }}
                    renderPlaceholder={(item, idx) => this._renderPlaceHolder(item, idx)}
                />
            </View>
        );
    }
}

class Item extends React.PureComponent{

    onLink = (data) =>{
        if(this.props.onLink) this.props.onLink(data)
    };

    render(){
        let {data, style, isNew} = this.props;
        if(!data || !data.payload) return null;
        return(
            <TouchableOpacity style={[styles.itemView,style,{backgroundColor: isNew ? '#C8DFF2' : 'white'}]}
                              onPress={()=>this.onLink(data)}>
                <View style={styles.imgAva}>
                    <CImage source={data.payload.URL ? Config.getSetting('CDN_API_URL')+'/'+ data.payload.URL : null}
                            resizeMode={'cover'}
                            width={48}
                            height={48}
                            disabled={true}
                    />
                </View>
                <View style={styles.viewTextItem}>
                    <Text style={styles.textTitle}>
                        <Text style={styles.textName}>
                            {data.payload.sender_name}{' '}
                        </Text>
                        {Config.language === '84' ? data.payload.voucher_des : data.payload.voucher_desE}
                        <Text style={styles.textName}>
                            {' '}{data.payload.voucher_no}
                        </Text>
                    </Text>
                    <Text style={styles.txtTime}>
                        {moment(data.createdAt).format('DD/MM/YYYY hh:mm')}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default NotificationScreen;

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },

    viewHeader:{
        // flex: 1,
        width:'100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C8C8C8',
        height: Scale(60),
        alignItems:'center',
        paddingHorizontal: Scale(15)
    },

    styleLine:{
        justifyContent:'center',
        height:Scale(60),
        borderBottomWidth: Scale(3),
        paddingHorizontal: Scale(4),
        marginBottom: Scale(-3)
    },

    txtTitle:{
        flex:1,
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(20),
        lineHeight: Math.floor(Scale(25))
    },

    viewTab:{
        // flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width: Scale(150),
        height: Scale(60)
    },

    txtAll:{
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(60)),
        fontFamily: Config.getFont('Muli-Bold')
    },

    txtTime:{
        fontSize: Scale(10),
        width:'100%',
        textAlign:'left',
        lineHeight: Math.floor(Scale(13)),
        color:'black',
        marginTop: Scale(3),
        fontFamily: Config.getFont('Muli-Light'),
    },

    itemView: {
        width: Config.w,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: Scale(15),
        paddingVertical: Scale(10),
        flexDirection:'row',
        position: 'relative',
    },

    viewTextItem:{
        marginLeft:Scale(10),
        // height:'100%',
        width: Config.w - Scale(100),
        justifyContent:'center',
        position:'relative'
    },
    textName:{
        fontFamily: Config.getFont('Muli-Bold'),
    },
    textTitle:{
        color:Config.gStyle.color_black,
        fontSize:Scale(14),
        lineHeight:Math.floor(Scale(18)),
        fontFamily: Config.getFont('Muli'),
    },
    imgAva: {
        width: Scale(48),
        height: Scale(48),
        borderRadius: Scale(24),
        overflow:"hidden",
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
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    titleNew:{
        paddingHorizontal: Scale(16),
        lineHeight: Math.floor(Scale(36)),
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize: Scale(14),
    }
};

