import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import CListView from './CListView.js';

class ExampleCListView extends React.Component {

    _skip = 0;
    _limit = 10;

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };

    }

    componentDidMount() {
        this.refs['CListView'].loadData();
    }

    _renderHeader=()=>{
        return (
            <View style={{
                        height: 70,
                        width:'100%',
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                <Text style={{color: 'white',flex:1}}>
                    Header list
                </Text>
            </View>
        )
    };

    _renderStickyHeader=()=>{
        return(
            <View style={{flex:1,backgroundColor:'red'}}/>
        )
    };

    _renderButtonTop=()=>{
        return(
            <View style={{backgroundColor: 'blue',width:30,height:30}} />
        )
    };

    _renderEmpty=()=>{
        return(
            <View style={{width: '100%',height: 100,backgroundColor:'red'}}>
                <Text>
                    Not Data...
                </Text>
            </View>
        )
    };

    _renderSeparator=()=>{
        return (
            <View
                style={{
                  height: 1,
                  width: "80%",
                  backgroundColor: "#CED0CE",
                  marginLeft: "10%"
                }}
            />
        );
    };

    _onRefresh=(cb)=>{
        this._skip = 0;
        this._makeRemoteRequest(cb);
    };

    _onLoadMore=(cb)=>{
        this._makeRemoteRequest(cb);
    };


    _makeRemoteRequest=(cb)=>{

        const url = `https://api.oscar-cms.jp/api/provinceinfo?skip=${this._skip}&limit=${this._limit}`;
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                let dt = [];
                if(this.state.data){
                    dt = [...this.state.data,...res];
                }
                else{
                    dt = res;
                }
                this.setState({
                    data: dt
                });
                this._skip = this._skip + this._limit;
                cb && cb(res.length!==0);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{width:'100%',height:'100%'}}>
                    <CListView
                        ref="CListView"
                        data={this.state.data || []}
                        keyExtractor={(item)=>item.id}
                        // renderHeader={this._renderHeader}
                        // renderStickyHeader={this._renderStickyHeader}
                        // stickyHeaderHeight={50}
                        // headerHeight={200}
                        // renderButtonTop={this._renderButtonTop}
                        // renderEmpty={this._renderEmpty}
                        // renderSeparator={this._renderSeparator}
                        onRefresh={this._onRefresh}
                        onLoadMore={this._onLoadMore}
                        renderItem={(item,index)=>(
                            <Item data={item}
                                  index={index}/>
                        )}
                    />
                </View>


                {/*<Text*/}
                    {/*style={{*/}
                        {/*position:'absolute',*/}
                        {/*top: 0,*/}
                        {/*right: 0,*/}
                        {/*fontSize:20*/}
                    {/*}}>*/}
                    {/*Example ListView*/}
                {/*</Text>*/}

                {/*<Text*/}
                    {/*onPress={this.props.onBack}*/}
                    {/*style={{*/}
                        {/*backgroundColor:'red',*/}
                        {/*position:'absolute',*/}
                        {/*top: 30,*/}
                        {/*left: 30,*/}
                        {/*width: 60,*/}
                        {/*height: 20,*/}
                        {/*textAlign: 'center',*/}
                        {/*textAlignVertical: 'center'*/}
                    {/*}}>*/}
                    {/*Back*/}
                {/*</Text>*/}
            </View>

        );
    }
}

export default ExampleCListView;

class Item extends React.PureComponent{
    render(){
        let {data} = this.props;
        return(
            <View style={styles.item}>
                <Text>
                    {data.provinceName}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        height: 80,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
