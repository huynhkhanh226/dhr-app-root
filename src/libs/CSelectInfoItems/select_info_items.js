import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CImage from "../CImage/CImage";
import SelectQuanity from "../CSelectedQuanity/Select-Quanity";
import Swipeout from "react-native-swipeout";

class SelectInfoItems extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangeValue = (number) => {
        if (this.props.onChangeValue) this.props.onChangeValue(number);
    };

    render() {
        const swiPeOutButton = [
            {
                component: (
                    <TouchableOpacity onPress={() => this.onChangeValue(0)}
                                      style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            flex: 1,
                                            backgroundColor: '#F85C5C',
                                            width: Scale(73)
                                      }}
                    >
                        <Icon name={'trash-alt'}
                              size={Scale(21)}
                              style={{marginRight:Scale(5)}}
                              color={"#FFFFFF"}/>
                    </TouchableOpacity>
                ),
                backgroundColor: '#F85C5C',
                // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                width: Scale(73),
                swipeEnabled: false,
                marginTop: Scale(15),
                height:'100%',
            },
        ];

        const {value, disable, disableRemove, isDetail,title1, title2, isFree, viewDetail} = this.props;
        return(
            <View style={styles.viewSwi}>
            <Swipeout style={{flex:1}} disabled={disableRemove} backgroundColor="white" right={swiPeOutButton}>
                <View style={styles.ViewSwiContainer}>
                    <View style={{width: '30%', padding: Scale(3), height:'100%', flexDirection:'row', alignItems:'center'}}>
                        <CImage source={value.PictureURL}
                                style={styles.viewCImage}
                                width={86} height={86}
                                resizeMode="contain"
                        />
                    </View>
                    <View style={[styles.viewSwiContent,{ width: !disable ? '50%' : '70%'}]}>
                        <Text numberOfLines={2} style={styles.textViewHeader}>{value.InventoryName}</Text>
                        <Text numberOfLines={1} style={styles.textViewContent}>
                            {Config.lang('PM_Ma')} {value.InventoryID}</Text>
                        {(!isDetail || title1) &&  <Text numberOfLines={1} style={styles.textViewFooter}>
                            {title1 ? title1 : Config.lang('PM_So_luong_ton')}
                            {value && value.WHQuantity?value.WHQuantity:0}{' '}
                            {value.UnitName}
                        </Text>}
                        {viewDetail && <Text numberOfLines={1} style={styles.textViewFooter}>
                            {Config.lang('PM_So_luong_ton')}
                            {value && value.WHQuantity?value.WHQuantity:0}{' '}
                            {value.UnitName}
                        </Text>}
                        {(isDetail && !viewDetail) && <Text numberOfLines={1} style={styles.textViewFooter}>
                            {title2 ? title2 : Config.lang('PM_So_luong_nhap')}
                            {value && value.OQuantity?value.OQuantity:0}{' '}
                            {value.UnitName}
                        </Text>}
                    </View>
                    <View style={{width: '20%', height: '100%'}}>
                        {!disable && <SelectQuanity
                            free={isFree}
                            paramTotal={value.WHQuantity}
                            paramValue={value.OQuantity}
                            changeValue={this.onChangeValue}
                        />}
                    </View>
                </View>
            </Swipeout>
            </View>
        )
    }
}

const styles = {
    viewSwi: {
        marginTop:Scale(15),
        paddingHorizontal: Scale(15),
        width: '100%',
        // height: Scale(92),
    },
    ViewSwiContainer: {
        width: '100%',
        // height: Scale(92),
        flexDirection: 'row',
        // flexWrap: 'wrap',
        backgroundColor: '#FAFAFC',
        borderRadius: Scale(10),
        paddingRight: Scale(-10),
    },
    viewCImage: {
        resizeMode: 'contain',
        borderRadius: Scale(10),
        alignItems: 'center',
        paddingBottom: Scale(3),
        backgroundColor: '#FAFAFC',

    },
    viewSwiContent: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: Scale(5),
        paddingVertical:Scale(8),
        fontFamily: Config.getFont('Muli-Regular')
    },
    textViewHeader: {
        fontFamily: Config.getFont('Muli-Bold'),
        fontSize:Scale(14),
        color:'#212121',
        lineHeight:Math.floor(Scale(18)),
    },
    textViewContent: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize:Scale(14),
        color:'#212121',
        lineHeight:Math.floor(Scale(18)),
    },
    textViewFooter: {
        fontFamily: Config.getFont('Muli-Regular'),
        fontSize:Scale(14),
        color:'#212121',
        lineHeight:Math.floor(Scale(18)),
    }
};

export default SelectInfoItems;
