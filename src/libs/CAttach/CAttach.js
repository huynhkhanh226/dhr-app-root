import React from "react";
import Config, {Scale} from "../../config";
import {ActivityIndicator, Image, Linking, Text, TouchableOpacity, View} from "react-native";
import CImage from "../CImage/CImage";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CButton from "../CButton/CButton";

class CAttach extends React.Component{

    openLink = (url) => {
        const {removeAttach, onLink} = this.props;
        if(!url || !!removeAttach || !onLink) return;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    renderIcon = (item) => {

        let imgFile = null;

        if(item.FileName){
            if(item.FileName.includes('doc')) imgFile = require("../../assets/images/file/icon-doc.png");
            else if(item.FileName.includes('docx')) imgFile = require("../../assets/images/file/icon-docx.png");
            else if(item.FileName.includes('xls')) imgFile = require("../../assets/images/file/icon-xls.png");
            else if(item.FileName.includes('xlsx')) imgFile = require("../../assets/images/file/icon-xlsx.png");
            else if(item.FileName.includes('ppt')) imgFile = require("../../assets/images/file/icon-ppt.png");
            else if(item.FileName.includes('pptx')) imgFile = require("../../assets/images/file/icon-pptx.png");
            else if(item.FileName.includes('pdf')) imgFile = require("../../assets/images/file/icon-pdf.png");
            else if(item.FileName.includes('txt')) imgFile = require("../../assets/images/file/icon-txt.png");
            else if(item.FileName.includes('vid')) imgFile = require("../../assets/images/file/video-icon.png");
            else if(item.FileName.includes('ytb')) imgFile = require("../../assets/images/file/youtube-icon.png");
            else imgFile = false;
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
        else if(item.URL) {
            return (
                <CImage width={98}
                        height={116}
                        source={item.URL}
                        onPress={()=>this.openLink(item.URL)}
                        colorDef={'transparent'}
                        style={{
                            resizeMode:'contain',
                            borderRadius: Scale(5)
                        }}
                />
            )
        }
    };

    removeAttach = (idx) => {
        if(this.props.removeAttach) this.props.removeAttach(idx)
    };

    render(){
        const {data, removeAttach} = this.props;
        return(
            <View style={styles.container}>
                {data && data.map((item, idx) => {
                    return (
                        <View style={styles.listView}
                              key={'attachment' + idx}
                        >
                            <View style={styles.itemView}>
                                {this.renderIcon(item)}
                                {!!removeAttach &&
                                    <CButton
                                        width={21}
                                        height={21}
                                        hitSlop={{top: Scale(3),bottom:Scale(3),left:Scale(3),right:Scale(3)}}
                                        style={styles.btnClose}
                                        onPress={()=>this.removeAttach(idx)}
                                        iconAweSome={"times"}
                                        iconAweSomeSize={14}
                                        iconAweSomeColor={'white'}
                                    />
                                }
                            </View>
                            <Text numberOfLines={2} style={styles.fileName}>
                                {item.FileName}
                            </Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default CAttach;

const styles = {
    container:{
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginHorizontal: Scale(9),
        paddingTop: Scale(10)
    },
    listView:{
        padding: Scale(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemView:{
        width: Scale(98),
        height: Scale(116),
        borderRadius: Scale(5),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Scale(8),
        //ios
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 10,
    },
    fileName:{
        width: Scale(98),
        fontSize: Scale(12),
        fontFamily: 'Muli',
        color: Config.gStyle.color_323232
    },
    btnClose:{
        position:'absolute',
        backgroundColor:'red',
        width: Scale(21),
        height: Scale(21),
        borderRadius: Scale(11),
        paddingHorizontal:Scale(6),
        paddingVertical:Scale(4),
        right:Scale(5),
        top:Scale(7)
    }
};
