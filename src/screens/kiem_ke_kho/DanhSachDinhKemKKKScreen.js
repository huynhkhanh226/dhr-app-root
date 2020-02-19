import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../../navigation/redux/navigation_actions";
import * as kiemkekhoAction from "../../redux/kiem_ke_kho/kiemkekho_actions";

import Config, {Scale} from '../../config';
import CScrollView from "../../libs/CScrollView/CScrollView";
import CImage from "../../libs/CImage/CImage";
import CAttach from "../../libs/CAttach/CAttach";

class DanhSachDinhKemKKKScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        });
        this.perPage = 20;
        this.dataFilter = {
            limit: this.perPage,
            skip: 0,
            search: ''
        };
    }

    openLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    renderIcon(item) {
        let imgFile = null;
        switch (item.FileExt) {
            case 'doc': imgFile = require("../../assets/images/file/icon-doc.png"); break;
            case 'docx': imgFile = require("../../assets/images/file/icon-docx.png"); break;
            case 'xls': imgFile = require("../../assets/images/file/icon-xls.png"); break;
            case 'xlsx': imgFile = require("../../assets/images/file/icon-xlsx.png"); break;
            case 'ppt': imgFile = require("../../assets/images/file/icon-ppt.png"); break;
            case 'pptx': imgFile = require("../../assets/images/file/icon-pptx.png"); break;
            case 'pdf': imgFile = require("../../assets/images/file/icon-pdf.png"); break;
            case 'txt': imgFile = require("../../assets/images/file/icon-txt.png"); break;
            case 'vid': imgFile = require("../../assets/images/file/video-icon.png"); break;
            case 'ytb': imgFile = require("../../assets/images/file/youtube-icon.png"); break;
            default: imgFile = false; break;
        }
        if(imgFile)
            return <TouchableOpacity onPress={()=>this.openLink(item.URL)}>
                <Image source={imgFile}
                       style={{
                           width: Scale(50),
                           height: Scale(50),
                           resizeMode:'contain'
                       }}
                /></TouchableOpacity>
        else return (
            <CImage width={50}
                    height={50}
                    source={item.file}
                    onPress={()=>this.openLink(item.file)}
                    style={{
                        resizeMode:'contain',
                        borderRadius: Scale(10)
                    }}
            />
        )
    }

    render() {
        const {getDetailInventoryKKK} = this.props;
        const dataAttach = getDetailInventoryKKK && getDetailInventoryKKK.attachment ? getDetailInventoryKKK.attachment : [];
        // console.log("dataAttach dataAttach", dataAttach);
        return (
            <View style={styles.container}>
                <CScrollView style={{width:'100%', height:'100%'}}
                             maxHeight={Config.h-Scale(90)}
                >
                        <View style={{
                            flexDirection: 'row',
                            flex: 1,
                            flexWrap: 'wrap',
                            paddingTop: Scale(10)
                        }}>
                            <CAttach onLink={true} data={dataAttach}/>
                        </View>
                    {dataAttach && dataAttach.length<=0 && <View style={{
                        width:'100%',
                        height:'100%',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Text style={styles.txtNoData}>{Config.lang('PM_Khong_tim_thay_du_lieu')}</Text>
                    </View>}
                </CScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    txtNoData:{
        color: Config.gStyle.color_grey,
        fontSize: Scale( 16),
        paddingVertical: Scale(100)
    }

};

export default connect(state => ({
        getDetailInventoryKKK: state.kiemkekho.getDetailInventoryKKK,
    }),
    (dispatch) => ({
        kiemkekhoAction: bindActionCreators(kiemkekhoAction, dispatch),
        navigationActions: bindActionCreators(navigationActions, dispatch),
    })
)(DanhSachDinhKemKKKScreen);
