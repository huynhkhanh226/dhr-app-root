
/**
 * Created by vunl on 13/06/2017.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Animated
} from 'react-native';

import {KeyboardAwareScrollView, KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import Config, {Scale} from '../../config';

class CListView extends React.PureComponent{

    _loadFirst = false;
    _loadMore = true;
    _animatedEvent = null;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            scrollY: new Animated.Value(0)
        };
        if(props.renderStickyHeader) {
            if(!props.stickyHeaderHeight || !props.headerHeight){
                console.error('Property `stickyHeaderHeight` and `headerHeight` is required');
            }
        }
        this._animatedEvent = Animated.event([{nativeEvent: { contentOffset: { y: this.state.scrollY } } }]);
    }

    _renderHeader=()=>{
        if(this.props.renderHeader){
            return this.props.renderHeader();
        }
        return null;
    };

    _renderFooter=()=>{
        if (!this.state.loading)
            return null;

        if(this.props.renderFooter){
            return this.props.renderFooter();
        }

        if(this.props.renderPlaceholder) {
            return(
                <View style={{flex:1, width: '100%'}}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item , idx) => {
                        return this.props.renderPlaceholder(item, idx);
                    })}
                </View>
            )
        }
        else return <ActivityIndicator animating size="large" />;

    };

    _renderEmpty=()=>{
        let length = this.props.data.length;
        if(length > 0 || this.state.loading || this.state.refreshing || !this._loadFirst )
            return null;
        if(this.props.renderEmpty){
            return this.props.renderEmpty();
        }
        return <Text style={styles.txtNoData}>{Config.lang('PM_Khong_tim_thay_du_lieu')}</Text>;
    };

    _renderSeparator=()=>{
        if(this.props.renderSeparator){
            return this.props.renderSeparator();
        }
        return null;
    };

    _renderItem=({item,index})=>{
        if(this.props.renderItem){
            return this.props.renderItem(item,index);
        }
        return null;
    };

    _onScroll=(e)=>{
        this._animatedEvent(e);
        if(this.props.onScroll){
            this.props.onScroll(e);
        }
    };

    _onContentSizeChange=(contentWidth, contentHeight)=>{
        if(this.props.onContentSizeChange){
            this.props.onContentSizeChange(contentWidth, contentHeight);
        }
    };

    refresh=()=>{
        this._loadFirst = true;
        this._loadMore = true;
        this.setState({
                refreshing: true
            },
            () => {
                if(this.props.onRefresh){
                    this.props.onRefresh(()=>{
                        this.setState({refreshing: false,loading:false});
                    })
                }
                else{
                    this.setState({refreshing: false,loading:false});
                }
            }
        );
    };

    loadMore=()=>{
        if(!this._loadMore)
            return;
        this._loadMore = false;
        this._loadFirst = true;
        this.setState({
                loading: true
            },
            () => {
                if(this.props.onLoadMore){
                    this.props.onLoadMore(stop=>{
                        stop = stop > 0;
                        this._loadMore = stop;
                        this.setState({refreshing: false,loading:false});
                    })
                }
                else{
                    this.setState({refreshing: false,loading:false});
                }
            }
        );
    };

    scrollToTop=()=>{
        this.refs['ListView'].scrollToOffset({offset:0});
    };

    scrollToBottom=(params)=>{
        this.refs['ListView'].scrollToEnd(params);
    };

    scrollToIndex=(index)=>{
        this.refs['ListView'].scrollToIndex({index: index});
    };

    loadData=()=>{
        this._loadMore = true;
        this._loadFirst = false;
        this.loadMore();
    };

    render(){
        let {
            data,
            renderButtonTop,
            renderStickyHeader,
            stickyHeaderHeight,
            headerHeight,
            styleCustomStickyHeader,
            styleCustomButtonTop,
            keyExtractor,
            numColumns,
            inverted,
            extraData,
            style,
            extraScrollHeight
        } = this.props;
        if(!data)
            return null;
        return(
            <View style={[{flex:1},style]}>
                <KeyboardAwareFlatList
                    extraScrollHeight={Scale(90)}
                    ref="ListView"
                    contentContainerStyle={{
                        flexDirection:'column',
                        alignItems:'flex-start'
                    }}
                    style={{flex:1}}
                    data={data}
                    inverted={inverted}
                    numColumns={numColumns}
                    refreshing={this.state.refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadMore}
                    // extraScrollHeight={extraScrollHeight}
                    onEndReachedThreshold={0.1}
                    onScroll={this._onScroll}
                    extraData={extraData}
                    onContentSizeChange={this._onContentSizeChange}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={false}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                    ListEmptyComponent={this._renderEmpty}
                    renderItem={this._renderItem}
                />
                {renderStickyHeader && (
                    <Animated.View
                        style={[styles.sticky_header,styleCustomStickyHeader,
                            {
                                height: stickyHeaderHeight,
                                opacity: this.state.scrollY.interpolate({
                                     inputRange: [headerHeight,headerHeight*1.5],
                                     outputRange: [0,1],
                                     extrapolate: 'clamp'
                                })
                            }
                        ]}>
                        {renderStickyHeader()}
                    </Animated.View>
                )}
                {renderButtonTop && data.length>0 && (
                    <Animated.View
                        style={[styles.button_top,styleCustomButtonTop,
                            {
                                opacity: this.state.scrollY.interpolate({
                                     inputRange: [50,100],
                                     outputRange: [0,1],
                                     extrapolate: 'clamp'
                                })
                            }
                        ]}>
                        <TouchableOpacity onPress={this.scrollToTop}>
                            {renderButtonTop()}
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        )
    }
}

export default CListView;

const styles = StyleSheet.create({

    button_top:{
        position: 'absolute',
        right: '10%',
        bottom: '10%'
    },

    sticky_header:{
        backgroundColor:'transparent',
        position:'absolute',
        top:0,
        left:0,
        right:0
    },

    txtNoData:{
        width:Config.w,
        textAlign:'center',
        color: Config.gStyle.color_grey,
        fontSize: Scale( 16),
        paddingVertical: Scale(100)
    }

});
