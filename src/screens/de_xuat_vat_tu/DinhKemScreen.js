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

import CScrollView from "../../libs/CScrollView/CScrollView";
import CImagePicker from '../../libs/CImagePicker/picker_image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dash from 'react-native-dash';
import CAttach from "../../libs/CAttach/CAttach";
import CButton from "../../libs/CButton/CButton";


class DinhKemScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isTakePic: false,
            loading: null,
            imgAva: [],
            flag:1
        });
    }

    takePic = () => {
        this.setState({
            isTakePic:true
        })
    };

    removeAttach = (idx) => {
        const {imgAva, flag} = this.state;
        let dataTemp = [...imgAva];
        dataTemp.splice(idx,1);
        this.setState({
            imgAva: dataTemp
        })
    };

    onSave = () => {
        const {imgAva} = this.state;
        if(this.props.navigation.state.params && this.props.navigation.state.params.onChange) this.props.navigation.state.params.onChange(imgAva);
        this.props.navigation.goBack(null);
    };

    componentDidMount() {
        if(this.props.navigation.state.params && this.props.navigation.state.params.Attachment){
            this.setState({
                imgAva:this.props.navigation.state.params.Attachment
            })
        }
    }

    render() {
        const {imgAva, flag} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showBack={true}
                        // goBack={this.goBack}
                        customClass={{
                            height: Scale(43),
                            borderBottomWidth: 1,
                            borderBottomColor: Config.gStyle.color_border,
                        }}
                        onRight={this.onSave}
                        colorBtnRight={Config.gStyle.color_def}
                        btnRight={Config.lang('PM_Luu')}
                        headerName={Config.lang('PM_Chi_tiet_dinh_kem')}/>
                <CScrollView style={{width: '100%', height: '100%'}}
                             maxHeight={Config.h - Scale(90)}
                >
                    {imgAva && imgAva && imgAva.length>0 && <View style={{
                        paddingTop: Scale(15),
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1, flexWrap: 'wrap',
                            paddingTop: Scale(10)
                        }}>
                            {flag && <CAttach onLink={false} removeAttach={this.removeAttach} data={imgAva} />}
                        </View>
                    </View>}
                </CScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: Scale(30),
                }}>
                    <TouchableOpacity style={{
                        height: Scale(36),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                        // onPress={() => this.onSave('reject')}
                    >
                        <Icon name={'paperclip'} size={Scale(15)} color={"black"}/>

                        <CButton width={120}
                                 height={25}
                                style={{
                                    flexDirection:'column',
                                }}
                                 styleCustomText={{
                                     fontSize: Scale(16),
                                     fontFamily: Config.getFont('Muli'),
                                     fontWeight:'100',
                                     lineHeight: Math.floor(Scale(20)),
                                     color: '#212121',
                                 }}
                                 text={Config.lang('PM_Dinh_kem_file')}
                              onPress={this.takePic}
                        >
                            <Dash dashColor={'#707070'}
                                  dashGap={4}
                                  dashThickness={1}
                                  dashLength={4}
                                  style={{
                                      width:Scale(120),
                                      height:1,
                                      position:'absolute',
                                      left: Scale(-10),
                                      bottom:0,
                                      flexDirection:'row',
                                  }}/>
                        </CButton>
                    </TouchableOpacity>
                </View>
                {this.state.isTakePic &&
                    <CImagePicker
                        onHide={()=>{this.setState({isTakePic: !this.state.isTakePic})}}
                        // onLoading={()=>{this.setState({loading: true})}}
                        onImageUri={(data)=>{
                            let dataTemp = [...imgAva];
                            dataTemp=dataTemp.concat(data);
                            this.setState({
                                isTakePic: false, imgAva: dataTemp, flag: flag+1
                            })
                        }}
                    />
                }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    viewApproval: {
        width: '100%',
        height: Scale(66),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopRightRadius: Scale(33),
        borderTopStartRadius: Scale(33),
        borderWidth: 0,
        position: 'relative',
        bottom: Scale(-5),
        shadowColor: '#95989A',
        shadowOffset: {
            width: 0,
            height: -4
        },
        shadowRadius: 10,
        shadowOpacity: 0.2,

        elevation: 3

    },
    touchableApproval: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    touchableApprovalOpa: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        opacity: 0.4,
    },
    textApproval: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(18)),
        marginTop: Scale(8)
    },

};

export default connect(state => ({
        getListProposeType: state.dxkvt.getListProposeType,
    }),
    (dispatch) => ({
        dxvtAction: bindActionCreators(dxvtAction, dispatch),
        navigationAction: bindActionCreators(navigationAction, dispatch)
    })
)(DinhKemScreen);
