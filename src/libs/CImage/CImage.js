
import React from 'react';

import {
    ActivityIndicator,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Config, {Scale} from '../../config';

export default class CImage extends React.PureComponent {

    _mount = false;

    static defaultProps = {
        disabled: false
    };

    constructor(props) {
        super(props);
        let {width,height,heightOffset} = this.props;
        let w = width || Dimensions.get('window').width;
        let h = w/2;
        if(height && height > 0){
            h = height;
        }
        else if(heightOffset && heightOffset > 0){
            h = heightOffset;
        }

        this.state = {
            height: h,
            width: w,
            load: false
        };
    }

    _onLoadStart=()=>{
        this.setState({load: true});
    };

    _onLoadEnd=()=>{
        this.setState({load: false});
    };

    _onError=()=>{
        this.setState({load: false});
    };

    _onPress=()=>{
        if(this.props.onPress){
            this.props.onPress(this.props);
        }
    };

    componentDidMount() {
        this._mount = true;

        let source = this.props.source ? this.props.source :Config.imgDefURL;
        Image.getSize(source, (width,height) => {
            if(!this._mount)return;
            let w = this.props.width;
            let h = this.props.height;
            if(w && !h){
                this.setState({width: w,height: height*(w/width)});
            }
            else if(!w && h){
                this.setState({width: width*(h/height),height: h});
            }
            else if(w && h){
                this.setState({width: w,height: h});
            }
            else{
                w =  Dimensions.get('window').width;
                this.setState({width: w,height: height*(w/width)});
            }

        },()=>{
            this.setState({load: false});
        });

    }

    componentWillUnmount(){
        this._mount = false;
    }

    render(){
        let {style,overlayColor,styleImage,source,disabled,resizeMode, width, height, sourceDef, colorDef} = this.props;
        // let {width,height} = this.state;
        let url = source ? {uri:source}: (sourceDef ? sourceDef : Config.imgDef);
        return(
            <TouchableOpacity style={[
                                        {backgroundColor: colorDef ? colorDef : '#ccc'},
                                        style,
                                        styles.container,
                                        {width: Scale(width),height: Scale(height)}
                                     ]}
                              onPress={this._onPress}
                              disabled={disabled} >
                <Image onLoadStart={this._onLoadStart}
                       onLoadEnd={this._onLoadEnd}
                       onError={this._onError}
                       source={url}
                       style={[
                                style,styleImage,
                                styles.image,
                                {resizeMode: resizeMode || 'contain'},
                                {overlayColor: overlayColor},
                                {width:Scale(width),height:Scale(height)}
                              ]}
                />
                {this.state.load &&
                    <View style={[styles.indicator,{width:Scale(width), height:Scale(height)}]}>
                        <ActivityIndicator />
                    </View>
                }
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0
    },

    image: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },

    indicator: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    }
});
