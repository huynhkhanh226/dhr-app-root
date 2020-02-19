import React, {Component} from 'react';
import {
    View,
    Text,
    Image, ActivityIndicator,
} from 'react-native';


import Config, {Scale} from '../../config';

class CShapeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    render() {
        const {title, value, isLoading} = this.props;
        return (
            <View elevation={3} style={styles.viewShape}>
                <Image resizeMode={'contain'} source={require('./head_approval.png')}
                       style={styles.imageShape}
                />
                <View style={styles.viewContent}>
                    <View style={styles.viewTextContentGeneral}>
                        {isLoading && <ActivityIndicator size="small" color="#707070"/>}
                            <Text style={styles.textTitle}>
                            {title ? title.toUpperCase() : ''}
                            </Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.viewTextContentGeneral}>
                        {isLoading && <ActivityIndicator size="small" color="#707070"/>}
                        <Text style={styles.textValue}>
                            {value || ''}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = {
    viewShape: {
        height: Scale(68),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#707070",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageShape: {
        width: '100%',
        height: '100%',
        flex: 2,
        left: Scale(-15),
    },
    viewContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingVertical: Scale(5),
        flex: 8,
    },
    viewTextContentGeneral: {
        flexDirection: 'row',
    },
    line:{
        height:Scale(1),
        backgroundColor: '#CCCCCC',
    },
    textTitle: {
        color: '#323232',
        fontSize: Scale(16),
        lineHeight: Math.floor(Scale(30)),
        fontFamily: Config.getFont('Roboto-Bold'),

    },
    textValue: {
        fontSize: Scale(18),
        lineHeight: Math.floor(Scale(30)),
        fontFamily: Config.getFont('Muli-Regular'),
        color: '#323232',
    }
};

export default CShapeHeader;

