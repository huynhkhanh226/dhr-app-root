import React, {Component} from 'react';
import {
    View, Text, Image,
    TouchableOpacity, ActivityIndicator
} from 'react-native';

import Config, {Scale} from '../../config';
import Header from "../../components/Header";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as navigationAction from '../../navigation/redux/navigation_actions.js';
import * as dxvtAction from '../../redux/de_xuat_vat_tu/dxvt_actions';
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import CListView from "../../libs/CListView/CListView";


class LoaiDeXuatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangeLDX = (value) => {
        if(this.props.navigation.state.params.onChange){
            this.props.navigation.state.params.onChange(value);
            this.props.navigation.goBack(null);
        }
    };

    render() {
        const {value, isChecked} = this.props;
        return (
            <View style={{
                width:'100%',
                paddingHorizontal:Scale(16),
            }}>
                <TouchableOpacity style={styles.component}
                                  onPress={()=>this.onChangeLDX(value)}
                >
                    <Text style={styles.textTitleComponent}>
                        {value.ProposeTypeName ? value.ProposeTypeName : ''}
                    </Text>
                    {isChecked && <View style={styles.viewCheck}>
                        <Image style={styles.imageCheck}
                               source={require('../../assets/images/icon_check_box.png')}/>
                    </View>}
                </TouchableOpacity>
            </View>
        )
    }
}

class LoaiDeXuatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sSubmit: false,
            dataLoaiDeXuat: []
        });

        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            StrSearch: ''
        };
    }


    componentDidMount() {
        this.props.dxvtAction.getListProposeType({}, (error, data) => {
            if (error) {
                Config.alertMess({code: '', message: error.message});
                this.setState({
                    dataLoaiDeXuat: [],
                    isSubmit: true });
            } else if (data && data.length>0) {
                this.setState({
                    dataLoaiDeXuat: data,
                    isSubmit: true
                });
            }
        });
    }



    render() {
        const {dataLoaiDeXuat}= this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        customClass={{
                            borderBottomWidth: 1,
                            borderBottomColor: Config.gStyle.color_border,
                            height: Scale(43)
                        }}
                        headerName={Config.lang('PM_Loai_de_xuat')}/>
                {dataLoaiDeXuat && dataLoaiDeXuat.length>0 && dataLoaiDeXuat.map((item, idx)=>{
                    const isChecked = this.props.navigation.state.params.ProposeTypeID === item.ProposeTypeID;
                    return(
                        <LoaiDeXuatComponent value={item} key={idx} isChecked={isChecked} navigation={this.props.navigation}/>
                    )
                })}
            </View>
        );
    }
}

const styles = {
    component: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C4C5C7',
        minHeight: Scale(45),
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Scale(15),
    },
    viewComponent: {
        minHeight: Scale(45),
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: Scale(15),
    },
    textTitleComponent: {
        width: Scale(102),
        fontSize: Scale(16),
        fontFamily: Config.getFont('Muli-Regular'),
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
        position: 'absolute',
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
        width: '100%',
    }
};

export default connect(state => ({
        getListProposeType: state.dxkvt.getListProposeType,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(LoaiDeXuatScreen);
