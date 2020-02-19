import React from 'react';
import {
    TouchableOpacity,
    Text, Image,
    View, ActivityIndicator
} from 'react-native';
import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

class SelectItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangePress = () => {
        const {disable} = this.props;
        if(disable) return;
        if(this.props.onChangePress)
            this.props.onChangePress();
    };

    render() {
        const {textTitle, value, icon, isLoading, disable, styleVl} = this.props;
        return (
            <View style={{height: Scale(53), width: '100%'}}>
                <TouchableOpacity style={styles.viewTouch} onPress={this.onChangePress}>
                    <View style={styles.viewContainer}>
                        {icon && <View style={{width:'10%'}}>
                            <Image style={{width:Scale(33), height:Scale(33)}} source={icon}/>
                        </View>}
                        <View style={{paddingLeft:Scale(8), width: icon ? '90%' : '100%'}}>
                            <View style={styles.viewContent}>
                                <Text numberOfLines={1} style={[styles.textTitleContent,{opacity:disable ? 0.5 : 1}]}>
                                    {textTitle}
                                </Text>
                                <View style={[styles.viewTitleContent]}>
                                    {isLoading && <ActivityIndicator size="small" style={{marginRight: Scale(10)}} color="#707070"/>}
                                    {!isLoading && <Text placeholder={'danh sach dinh kem'} numberOfLines={2} style={[styles.textTitleRight,styleVl]}>
                                        {value}
                                    </Text>}
                                    <Icon name={'chevron-right'} size={Scale(16)} color={"#707070"} style={{opacity: !disable ? 1: 0}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    viewTouch: {
        width: '100%',
        height: Scale(53),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    viewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CECECE',
        height: Scale(53),
        width: '100%'
    },
    textTitleContent: {
        width: '40%',
        fontSize: Scale(16),
        fontFamily: Config.getFont('Roboto'),
        lineHeight: Math.floor(Scale(24)),
    },
    viewTitleContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '60%',
    },
    textTitleRight: {
        paddingHorizontal: Scale(8),
        fontFamily: Config.getFont('Roboto-Bold'),
        color: 'black',
        width:'100%',
        textAlign:'right',
        fontSize: Scale(16),
    }
};

export default SelectItem;
