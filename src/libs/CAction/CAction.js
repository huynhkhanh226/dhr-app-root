import React from "react";
import {Platform, Text, View} from "react-native";
import CButton from "../CButton/CButton";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Config, {Scale} from "../../config";

class CAction extends React.Component{

    onApproval = () => {
      if(this.props.onApproval) this.props.onApproval();
    };

    onSaveReject = () => {
      if(this.props.onSaveReject) this.props.onSaveReject();
    };

    onLink = () => {
        if(this.props.onLink) this.props.onLink();
    };

    render(){
        const {isApproval,isReject,isHistory,isSubmit,isLoading, titleReject} = this.props;
        const nameReject = titleReject ? titleReject : 'PM_Huy_xac_nhan';
        return(
            <View style={[styles.viewApproval,{
                backgroundColor: Platform.OS === 'ios' ? 'white' : 'none'
            }]}>

                <CButton width={120}
                         height={66}
                         style={[styles.touchableApproval,{opacity: !isApproval ? 1 : 0.4 }]}
                         disabled={!!isApproval || isSubmit}
                         loading={isLoading}
                         colorLoading={'grey'}
                         onPress={this.onApproval}
                >
                    <Icon color={'#1BCE62'}
                          name={'check'}
                          size={Scale(16)}/>

                    <Text style={styles.textApproval}>
                        {Config.lang('PM_Xac_nhan')}
                    </Text>
                </CButton>

                <CButton width={120}
                         height={66}
                         style={[styles.touchableApproval,{opacity: !!isReject ? 1 : 0.4 }]}
                         disabled={!isReject || isSubmit || isLoading}
                         onPress={this.onSaveReject}
                         colorLoading={'grey'}
                >
                    <Icon color={'#FF4600'}
                          name={'times'}
                          size={Scale(16)}/>

                    <Text style={styles.textApproval}>
                        {Config.lang(nameReject)}
                    </Text>
                </CButton>

                {isHistory && <CButton width={120}
                         height={66}
                         style={styles.touchableApproval}
                         disabled={!!isHistory || isSubmit}
                         onPress={this.onLink}
                >
                    <Icon color={'#2680EB'}
                          name={'clock'}
                          size={Scale(16)}/>

                    <Text style={styles.textApproval}>
                        {Config.lang('PM_Lich_su')}
                    </Text>
                </CButton>}

            </View>
        )
    }
}

const styles = {
    viewApproval: {
        width: '100%',
        height: Scale(70),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopRightRadius: Scale(33),
        borderTopStartRadius: Scale(33),
        borderWidth: 0,
        position: 'relative',
        bottom: 0,
        shadowColor: '#95989A',
        shadowOffset: {
            width: 0,
            height: -4
        },
        shadowRadius: 10,
        shadowOpacity: 0.2,

        elevation:3

    },
    touchableApproval: {
        flexDirection: 'column',
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
        lineHeight: Math.floor(Scale(16)),
        marginTop: Scale(8)
    },
};

export default CAction;
