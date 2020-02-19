import React from 'react';
import {
    View,
} from 'react-native';
import Config, {Scale} from '../../config';
import CInput from "../CInput/CInput";

class Search_item extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = ({
            isSubmit: false,
        });
    }

    onChangePress = (text) => {
        if(this.timeOut) clearTimeout(this.timeOut);
        this.timeOut = setTimeout(()=>{
            if(this.props.onChangePress)
                this.props.onChangePress(text);
        }, 500)
    };

    render() {
        let {placeholderTitle, style, height} = this.props;
        height = height ? height :  Scale(44);
        return(
            <View style={[{width:'100%', height: height, marginBottom: Scale(2)},style]}>
                <CInput
                    placeholderTextColor={'#808080'}
                    width={Scale(280)}
                    height={height}
                    image={require('./icon_search.png')}
                    styleImage={{
                        width: Scale(18),
                        height: Scale(18),
                        top: Scale(13),
                        left: Scale(10)
                    }}
                    style={{
                        backgroundColor: '#F1F1F1',
                        borderRadius: Scale(5),
                        borderBottomWidth: 0,
                        margin:0,
                        width:'100%',
                    }}
                    styleText={{
                        fontSize: Scale(16),
                        fontFamily: Config.getFont('Roboto'),
                        color: '#808080',
                        marginLeft: Scale(10),
                        borderWidth:0
                    }}
                    placeholder={placeholderTitle}
                    onChangeText={this.onChangePress}
                />
            </View>
        )
    }
}

export default Search_item;
