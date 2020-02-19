import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

import Config, {Scale} from '../../config';

class CSelectItemCommodity extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    render() {
        let {data} = this.props;
        return (
            <View style={styles.viewCommodity}>
                {data && data.map((item, index)=>{
                    return(
                        <View key={index} style={styles.viewContentCommodity}>
                            <Text style={styles.textContentCommodity} numberOfLines={2}>
                                {item.title}
                            </Text>
                            <Text style={styles.textContentCommodityVl} numberOfLines={2}>
                                {item.value}
                            </Text>
                        </View>
                    )
                })}
            </View>
        );
    }
}


const styles = {
    viewCommodity: {
        width: '100%',
        flex:1,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        justifyContent: 'space-around',
        paddingVertical: Scale(4),
    },
    viewContentCommodity: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        height: Scale(42)
    },
    textContentCommodity: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli'),
        lineHeight: Math.floor(Scale(18)),
        justifyContent: 'flex-start',
        flex: 4,
    },
    textContentCommodityVl: {
        fontSize: Scale(14),
        fontFamily: Config.getFont('Muli-Bold'),
        lineHeight: Math.floor(Scale(18)),
        justifyContent: 'flex-end',
        flex: 6,
        textAlign: 'right'
    },
};

export default CSelectItemCommodity;

