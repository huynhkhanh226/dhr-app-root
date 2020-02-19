import React from 'react';
import Config from '../../config';
import {
    ScrollView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class CScrollView extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            screenHeight:0
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({
            screenHeight: contentHeight
        })
    };

    render(){
        let {children,
            maxHeight,
            style,
            contentContainerStyle,
            isScroll,
            keyboardShouldPersistTaps,
            resetScrollToCoords,
            removeClippedSubviews,
            flex
        } = this.props;
        const {screenHeight} = this.state;
        maxHeight = maxHeight ? maxHeight : Config.h;
        const scrollEnable =  isScroll ? isScroll : (screenHeight > maxHeight);
        return(
            <ScrollView style={style}
                        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                        resetScrollToCoords={resetScrollToCoords}
                        removeClippedSubviews={removeClippedSubviews}
                        contentContainerStyle={[contentContainerStyle,{flex: !DeviceInfo.isTablet() && flex ? 1 : 0}]}
                        onContentSizeChange={this.onContentSizeChange}
                        scrollEnabled={scrollEnable ? scrollEnable : false}
            >
                {children}
            </ScrollView>
        )
    }

}
