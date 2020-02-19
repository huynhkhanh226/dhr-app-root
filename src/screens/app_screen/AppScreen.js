
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

import Header from '../../components/Header';
import {Scale} from '../../config';
import CImage from "../../libs/CImage/CImage";

class AppScreen extends Component {

    render() {
        const dataApp = [
            {
                link:'',
                name:'CRM',
                img:'https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg',
            },
            {
                link:'',
                name:'HR',
                img:'https://i.pinimg.com/originals/53/37/49/5337490ca1097befda8a3a81e0b77af4.jpg',
            },
            {
                link:'',
                name:'PROJECT',
                img:'https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/03/Scottish-Fold_01.jpg',
            },
            {
                link:'',
                name:'Tin tức',
                img:'https://image.shutterstock.com/image-photo/cute-cat-lying-on-his-260nw-572338033.jpg',
            },
            {
                link:'',
                name:'Danh bạ',
                img:'http://fenozi.com/wp-content/uploads/2017/04/cute-cats-6.jpg',
            },
            {
                link:'',
                name:'Công việc',
                img:'https://cms.hostelbookers.com/hbblog/wp-content/uploads/sites/3/2012/02/cat-happy-cat-e1329931204797.jpg',
            },
        ];
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showMenu={true}
                        headerName={'APP'}
                />
                <ScrollView style={{flex:1, width:'100%'}}
                            contentContainerStyle={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                                justifyContent: 'space-around',
                                marginTop: Scale(20)
                            }}
                >
                    {dataApp && dataApp.map((key, idx)=>{
                        return(
                            <View key={idx}
                                  style={{
                                        width:'50%',
                                        alignItems: 'center',
                                        marginBottom: Scale(20)
                                    }}
                            >
                                <CImage width={100}
                                        height={100}
                                        resizeMode="cover"
                                        source={key.img}
                                        style={{borderRadius: Scale(4)}}/>
                                <Text style={{
                                    marginTop:Scale(10)
                                }}>{key.name}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'white',
        minHeight:'100%',
        paddingTop:Scale(70),
        justifyContent:'center'
    }
};

export default AppScreen;
