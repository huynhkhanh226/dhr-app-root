import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import Config, {Scale} from '../../config';

class CSelectItemGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true,
        });
    }

    render() {
        let {data, isLoading, border} = this.props;
        let styleBorder = {
                borderTopWidth: 1,
                borderTopColor: '#CCCCCC',
            };
        return (
            <View style={{flex:1, flexDirection:'row', flexWrap:'wrap'}}>
                {data && data.map((data, idx)=> {
                    let styleBorderBottom = {};
                    if(idx === (data.length-1)){
                        styleBorderBottom = {
                            borderBottomColor : '#CCCCCC',
                            borderBottomWidth : 1
                        };
                    }
                    return(
                        <View key={idx} style={[styles.viewContentGeneral, (border || idx === 0) ? styleBorder : {}, styleBorderBottom]}>
                            <Text style={styles.textContentGeneral} numberOfLines={2}>
                                {/*{isLoading || !data.title && <ActivityIndicator size="small" color="#707070"/>}*/}
                                {data.title}
                            </Text>
                            <View style={styles.viewTextContentGeneral}>
                                {isLoading && <ActivityIndicator size="small" color="#707070"/>}
                                <Text style={styles.textContentGeneralVl} numberOfLines={2}>
                                    {data.value}
                                </Text>
                            </View>

                        </View>
                    )
                })}
            </View>
        );
    }
}


const styles = {
    viewContentGeneral: {
        minHeight: Scale(42),
        padding: Scale(3),
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },
    textContentGeneral: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(18)),
        justifyContent: 'flex-start',
        flex: 4,
    },
    viewTextContentGeneral: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 6,
        textAlign: 'right'
    },
    textContentGeneralVl: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(20)),
        textAlign: 'right',
    },
};

export default CSelectItemGeneral;

