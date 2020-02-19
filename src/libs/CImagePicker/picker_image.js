import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mainActions from '../../redux/main/main_actions';
import CButton from '../../libs/CButton/CButton';
import Config from '../../config/index';
import ImagePicker from 'react-native-image-crop-picker';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
class ImagePick extends React.Component {

    onHide = () => {
        if (this.props.onHide) this.props.onHide();
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.onHide}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent:'center',
                        backgroundColor:'rgba(0, 0, 0, 0.3)'
                      }}>
                    <View
                        style={{
                              flexDirection: 'column',
                              justifyContent: 'space-around',
                              alignItems: 'center',
                              width: 300*Config.s,
                              backgroundColor:'white',
                              borderRadius: 10
                            }}>
                        <CButton
                            text={Config.lang('PM_Thu_vien')}
                            style={styles.btn}
                            width={260}
                            height={60}
                            styleCustomText={{fontSize: 20*Config.s}}
                            onPress={this._pickImage}
                        />
                        <CButton
                            text={Config.lang('PM_May_anh')}
                            style={[styles.btn,{borderBottomWidth:1*Config.s, borderTopWidth:1*Config.s}]}
                            width={260}
                            height={60}
                            styleCustomText={{fontSize: 20*Config.s}}
                            onPress={this._takePhoto}
                        />
                        <CButton
                            text={Config.lang('PM_Huy')}
                            style={styles.btn}
                            width={260}
                            height={60}
                            styleCustomText={{fontSize: 20*Config.s}}
                            onPress={this.onHide}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _takePhoto = () => {
        ImagePicker.openCamera({
            // width: 400,
            // height: 400,
            // compressImageQuality: 0.7,
            // compressImageMaxWidth: 1080,
            // compressImageMaxHeight: 1080,
            // cropping: true
        }).then(image => {
            this._handleImagePicked([image]);
        });
    };

    _pickImage = () => {
        ImagePicker.openPicker({
            multiple: true,
            // width: 400,
            // height: 400,
            // mediaType: 'photo',
            // compressImageQuality: 0.7,
            // compressImageMaxWidth: 1080,
            // compressImageMaxHeight: 1080,
            // cropping: true //true or false
        }).then(image => {
            this._handleImagePicked(image);
        })
    };

    _handleImagePicked = pickerResult => {
        try {
            if (!pickerResult.cancelled) {
                // console.log('pickerResult',pickerResult);
                pickerResult.forEach((item, idx)=>{
                    const nameParts = item.path.split('/');
                    const fileName = nameParts[nameParts.length - 1];
                    pickerResult[idx].FileName = fileName;
                    pickerResult[idx].FileSize = item.size;
                    pickerResult[idx].URL = item.path;
                    pickerResult[idx].isLocal = true;
                    pickerResult[idx].FileExt = item.mime;
                });

                if (this.props.onImageUri) this.props.onImageUri(pickerResult);
                if(this.props.onLoading) this.props.onLoading();
            }
        } catch (e) {
            alert('Upload failed, sorry :(');
        }
    };
}

export default connect(state=>({
    }),(dispatch)=>({
        mainActions: bindActionCreators(mainActions, dispatch)
    })
)(ImagePick);

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'absolute',
        width: Config.w,
        height: Config.h,
        top:0,
        left:0,
        // backgroundColor:'white'
    },
    btn:{
        width: '100%'
    }
    // btnClose:{
    //     position:'absolute',
    //     top:10*Config.s,
    //     right:10*Config.s
    // }

});
