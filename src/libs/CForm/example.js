import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    AsyncStorage,
    Platform,
} from 'react-native';

import CForm, {CTextBox,CNumberBox} from './CForm.js';
import Config, {Scale} from '../../config';

class ExampleCForm extends Component {

    constructor(props) {
        super(props);
    }

    _onCheck=()=>{
        let check = this.refs['CForm'].validate();
        alert(check);
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CTextBox
                    data={{
                        validators: 'isEmail',
                        feedback: "ICON",
                        placeholder: 'Email',
                        label: 'Email',
                        // title: 'Title',
                        icon: require('./icon.png'),
                        style:{
                            width: Scale(150),
                            height: Scale(30),
                            borderRadius: Scale(15),
                            borderWidth:1,
                            paddingLeft: Scale(30),
                            borderColor:'#ccc',
                            backgroundColor: 'white'
                        },
                        styleIconFeedback:{
                            position: 'absolute',
                            right: Scale(30),
                            width: Scale(20),
                            height: Scale(20),
                        },
                        styleLabel:{
                            color: 'white',
                            marginRight: Scale(30)
                        },
                        styleTitle:{
                            color: 'red',
                            position: 'absolute',
                            top: Scale(-80),
                            left: Scale(70)
                        },
                        styleIcon:{
                            width: Scale(20),
                            height: Scale(20),
                            marginRight: Scale(30)
                        }
                    }}
                />
                {/*<CDropDownBox*/}
                {/*    data={{*/}
                {/*        data:[*/}
                {/*            {id:1,name:"Nam"},*/}
                {/*            {id:2,name:"Nu"},*/}
                {/*        ],*/}
                {/*        width: 150*Config.s,*/}
                {/*        height: 30*Config.s,*/}
                {/*        feedback: 'BORDER',*/}
                {/*        placeholder: 'Gioi Tinh',*/}
                {/*        label: 'Gioi Tinh',*/}
                {/*        // title: 'Title',*/}
                {/*        icon: require('./icon.png'),*/}
                {/*        style:{*/}
                {/*            borderRadius: 15*Config.s,*/}
                {/*            borderWidth:1,*/}
                {/*            borderColor:'#ccc'*/}
                {/*        },*/}
                {/*        styleRow:{*/}
                {/*            marginTop: 30*Config.s*/}
                {/*        },*/}
                {/*        styleArrow:{*/}
                {/*            position: 'absolute',*/}
                {/*            right: 30*Config.s,*/}
                {/*            width: 20*Config.s,*/}
                {/*            height: 20*Config.s,*/}
                {/*        },*/}
                {/*        styleTextRow:{*/}
                {/*            fontSize: 12*Config.s,*/}
                {/*            paddingLeft: 30*Config.s,*/}
                {/*        },*/}
                {/*        styleIconFeedback:{*/}
                {/*            position: 'absolute',*/}
                {/*            right: 30*Config.s,*/}
                {/*            width: 20*Config.s,*/}
                {/*            height: 20*Config.s,*/}
                {/*        },*/}
                {/*        styleLabel:{*/}
                {/*            color: 'white',*/}
                {/*            marginRight: 30*Config.s*/}
                {/*        },*/}
                {/*        styleTitle:{*/}
                {/*            color: 'red',*/}
                {/*            position: 'absolute',*/}
                {/*            top: -80*Config.s,*/}
                {/*            left: 70*Config.s*/}
                {/*        },*/}
                {/*        styleIcon:{*/}
                {/*            width: 20*Config.s,*/}
                {/*            height: 20*Config.s,*/}
                {/*            marginRight: 30*Config.s*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<CDateBox*/}
                {/*    data={{*/}
                {/*        feedback: "BORDER",*/}
                {/*        value: '',*/}
                {/*        placeholder: 'Ngay',*/}
                {/*        label: 'Ngay',*/}
                {/*        // title: 'Title',*/}
                {/*        icon: require('./icon.png'),*/}
                {/*        style:{*/}
                {/*            width: 150*Config.s,*/}
                {/*            height: 30*Config.s*/}
                {/*        },*/}
                {/*        customStyles:{*/}
                {/*            dateIcon: {*/}
                {/*                width: 36*Config.s,*/}
                {/*                height: 40*Config.s,*/}
                {/*                position: 'absolute',*/}
                {/*                right: 30*Config.s,*/}
                {/*                tintColor: '#9b9b9b'*/}
                {/*            },*/}
                {/*            dateInput: {*/}
                {/*                alignItems: 'flex-start',*/}
                {/*                borderWidth: 0*/}
                {/*            },*/}
                {/*            dateTouchBody: {*/}
                {/*                borderWidth:1,*/}
                {/*                borderColor:'#dfe3e9',*/}
                {/*                height: 30*Config.s,*/}
                {/*                borderRadius:15*Config.s,*/}
                {/*                backgroundColor: 'white',*/}
                {/*                paddingLeft: 30*Config.s,*/}
                {/*            },*/}
                {/*            dateText: {*/}
                {/*                color:'#4a4a4a',*/}
                {/*                fontSize: 12*Config.s,*/}
                {/*                // fontFamily: Config.font_def*/}
                {/*            },*/}
                {/*            placeholderText: {*/}
                {/*                color:'#4a4a4a',*/}
                {/*                fontSize: 12*Config.s,*/}
                {/*                // fontFamily: Config.font_def*/}
                {/*            }*/}
                {/*        },*/}
                {/*        styleRow:{*/}
                {/*            marginTop: 30*Config.s*/}
                {/*        },*/}
                {/*        styleIconFeedback:{*/}
                {/*            position: 'absolute',*/}
                {/*            right: 30*Config.s,*/}
                {/*            width: 20*Config.s,*/}
                {/*            height: 20*Config.s,*/}
                {/*        },*/}
                {/*        styleLabel:{*/}
                {/*            color: 'white',*/}
                {/*            marginRight: 30*Config.s*/}
                {/*        },*/}
                {/*        styleTitle:{*/}
                {/*            color: 'red',*/}
                {/*            position: 'absolute',*/}
                {/*            top: -80*Config.s,*/}
                {/*            left: 70*Config.s*/}
                {/*        },*/}
                {/*        styleIcon:{*/}
                {/*            width: 20*Config.s,*/}
                {/*            height: 20*Config.s,*/}
                {/*            marginRight: 30*Config.s*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                <CNumberBox
                    data={{
                        feedback: "BORDER",
                        value:'',
                        placeholder: 'Number',
                        label: 'Number',
                        // title: 'Title',
                        icon: require('./icon.png'),
                        style:{
                            width: Scale(150),
                            height: Scale(30),
                            borderRadius: Scale(15),
                            borderWidth:1,
                            paddingLeft: Scale(30),
                            borderColor:'#ccc',
                            backgroundColor: 'white'
                        },
                        styleRow:{
                            marginTop: Scale(30)
                        },
                        styleIconFeedback:{
                            position: 'absolute',
                            right: Scale(30),
                            width: Scale(20),
                            height: Scale(20)
                        },
                        styleLabel:{
                            color: 'white',
                            marginRight: Scale(30)
                        },
                        styleTitle:{
                            color: 'red',
                            position: 'absolute',
                            top: Scale(-80),
                            left: Scale(70)
                        },
                        styleIcon:{
                            width: Scale(20),
                            height: Scale(20),
                            marginRight: Scale(30)
                        }
                    }}
                />
                <View style={{width:'30%',height:Scale(10),marginVertical:Scale(30),backgroundColor: 'red'}}>
                </View>

                <CForm
                    ref="CForm"
                    data={[
                        {
                            key: 'TEXT',
                            name: "email",
                            validators: 'isEmail',
                            feedback: "ICON",
                            placeholder: 'Email',
                            label: 'Email',
                            // title: 'Title',
                            icon: require('./icon.png'),
                            style:{
                                width: Scale(150),
                                height: Scale(30),
                                borderRadius: Scale(15),
                                borderWidth:1,
                                paddingLeft: Scale(30),
                                borderColor:'#ccc',
                                backgroundColor: 'white'
                            },
                            styleIconFeedback:{
                                position: 'absolute',
                                right: Scale(30),
                                width: Scale(20),
                                height: Scale(20),
                            },
                            styleLabel:{
                                color: 'white',
                                marginRight: Scale(30)
                            },
                            styleTitle:{
                                color: 'red',
                                position: 'absolute',
                                top: Scale(-80),
                                left: Scale(70)
                            },
                            styleIcon:{
                                width: Scale(20),
                                height: Scale(20),
                                marginRight: Scale(30)
                            }
                        },
                        {
                            key: 'DROP_DOWN',
                            name: "gender",
                            data:[
                                {id:1,name:"Nam"},
                                {id:2,name:"Nu"},
                            ],
                            width: Scale(150),
                            height: Scale(30),
                            feedback: 'BORDER',
                            placeholder: 'Gioi Tinh',
                            label: 'Gioi Tinh',
                            // title: 'Title',
                            icon: require('./icon.png'),
                            style:{
                                borderRadius: Scale(15),
                                borderWidth:1,
                                borderColor:'#ccc'
                            },
                            styleRow:{
                                marginTop: Scale(30)
                            },
                            styleArrow:{
                                position: 'absolute',
                                right: Scale(30),
                                width: Scale(20),
                                height: Scale(20),
                            },
                            styleTextRow:{
                                fontSize: Scale(12),
                                paddingLeft: Scale(30),
                            },
                            styleIconFeedback:{
                                position: 'absolute',
                                right: Scale(30),
                                width: Scale(20),
                                height: Scale(20),
                            },
                            styleLabel:{
                                color: 'white',
                                marginRight: Scale(30)
                            },
                            styleTitle:{
                                color: 'red',
                                position: 'absolute',
                                top: Scale(-80),
                                left: Scale(70)
                            },
                            styleIcon:{
                                width: Scale(20),
                                height: Scale(20),
                                marginRight: Scale(30)
                            }
                        },
                        {
                            key: 'DATE',
                            name: "birthday",
                            feedback: "BORDER",
                            value: '',
                            placeholder: 'Ngay',
                            label: 'Ngay',
                            // title: 'Title',
                            icon: require('./icon.png'),
                            style:{
                                width: Scale(150),
                                height: Scale(30)
                            },
                            customStyles:{
                                dateIcon: {
                                    width: Scale(36),
                                    height: Scale(40),
                                    position: 'absolute',
                                    right: Scale(30),
                                    tintColor: '#9b9b9b'
                                },
                                dateInput: {
                                    alignItems: 'flex-start',
                                    borderWidth: 0
                                },
                                dateTouchBody: {
                                    borderWidth:1,
                                    borderColor:'#dfe3e9',
                                    height: Scale(30),
                                    borderRadius:Scale(15),
                                    backgroundColor: 'white',
                                    paddingLeft: Scale(30),
                                },
                                dateText: {
                                    color:'#4a4a4a',
                                    fontSize: Scale(12),
                                    // fontFamily: Config.font_def
                                },
                                placeholderText: {
                                    color:'#4a4a4a',
                                    fontSize: Scale(12),
                                    // fontFamily: Config.font_def
                                }
                            },
                            styleRow:{
                                marginTop: Scale(30)
                            },
                            styleIconFeedback:{
                                position: 'absolute',
                                right: Scale(30),
                                width: Scale(30),
                                height: Scale(30),
                            },
                            styleLabel:{
                                color: 'white',
                                marginRight: Scale(30)
                            },
                            styleTitle:{
                                color: 'red',
                                position: 'absolute',
                                top: Scale(-80),
                                left: Scale(70)
                            },
                            styleIcon:{
                                width: Scale(20),
                                height: Scale(20),
                                marginRight: Scale(30)
                            }
                        },
                        {
                            key: 'NUMBER',
                            name: "age",
                            feedback: "BORDER",
                            value:'',
                            placeholder: 'Number',
                            label: 'Number',
                            // title: 'Title',
                            icon: require('./icon.png'),
                            style:{
                                width: Scale(150),
                                height: Scale(30),
                                borderRadius: Scale(15),
                                borderWidth:1,
                                paddingLeft: Scale(30),
                                borderColor:'#ccc',
                                backgroundColor: 'white'
                            },
                            styleRow:{
                                marginTop: Scale(30)
                            },
                            styleIconFeedback:{
                                position: 'absolute',
                                right: Scale(30),
                                width: Scale(20),
                                height: Scale(20),
                            },
                            styleLabel:{
                                color: 'white',
                                marginRight: Scale(30)
                            },
                            styleTitle:{
                                color: 'red',
                                position: 'absolute',
                                top: Scale(-80),
                                left: Scale(70)
                            },
                            styleIcon:{
                                width: Scale(20),
                                height: Scale(20),
                                marginRight: Scale(30)
                            }
                        }
                    ]}
                />

                <Text style={{marginTop:Scale(30),color:'red'}} onPress={this._onCheck}>
                    CHECK
                </Text>
                <Text
                    style={{
                        position:'absolute',
                        top: 0,
                        right: 0,
                        fontSize:20
                    }}>
                    Example Form
                </Text>

                <Text
                    onPress={this.props.onBack}
                    style={{
                        backgroundColor:'red',
                        position:'absolute',
                        top: 30,
                        left: 30,
                        width: 60,
                        height: 20,
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}>
                    Back
                </Text>
            </View>
        );
    }
}


export default ExampleCForm;


