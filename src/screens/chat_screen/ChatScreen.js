
import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList, ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import CImage from '../../libs/CImage/CImage';
import Config, {Scale} from '../../config';
class MessageScreen extends Component {

    render() {
        let dataMessage = [
            {
                link:'',
                fullName:'Milo',
                message:'Hi there! I am wondering if you can help me with a problem I\'ve been having.',
                owner:'58m',
                img:'https://source.unsplash.com/fn_BT9fwg_E/60x60',
                isRead:'Y'
            },
            {
                link:'',
                fullName:'Rena',
                message:'I have the photos that you ordered last month, how would you like them sent to you?',
                owner:'58m',
                img:'https://source.unsplash.com/AU4VPcFN4LE/60x60',
                isRead:'N'
            },
            {
                link:'',
                fullName:'Luxy',
                message:'Last month\'s report looks great, I am very happy with the progress so far, keep up the good work!',
                owner:'58m',
                img:'https://source.unsplash.com/CS2uCrpNzJY/60x60',
                isRead:'N'
            },
            {
                link:'',
                fullName:'Ten',
                message:'Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren\'t good...',
                owner:'58m',
                img:'https://source.unsplash.com/Mv9hjnEUHR4/60x60',
                isRead:'N'
            },
        ];
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}
                        showMenu={false}
                        headerName={'MESSAGES'}/>
                <View style={{width:'100%', flex:1}}>
                    {dataMessage.map((key, idx)=>{
                        return(
                            <Item data={key}
                                  key={'item-member'+idx}
                            />
                        )
                    })}
                </View>
            </View>
        );
    }
}

class Item extends React.PureComponent{
    render(){
        const {data}= this.props;
        return(
            <TouchableOpacity style={styles.itemView} onPress={()=>{}}>
                <View style={styles.imgAva}>
                    <CImage source={data.img}
                            resizeMode={'cover'}
                            width={68}
                            height={62}
                            disabled={true}
                            />
                </View>
                <View style={styles.viewTextItem}>
                    <Text style={styles.textName}>
                        {data.fullName}
                    </Text>
                    <Text style={styles.textTitle} numberOfLines={2}>
                        {data.message}
                        {/*So strongly and metaphysically did I conceive of my situation then, that while earnestly watching his motions, I seemed distinctly to perceive that my own individuality was now merged in a joint stock company of two; that my free will had received a mortal wound; and that another's mistake or misfortune might plunge innocent me into unmerited disaster and death. Therefore, I saw that here was a sort of interregnum in Providence; for its even-handed equity never could have so gross an injustice. And yet still further pondering—while I jerked him now and then from between the whale and ship, which would threaten to jam him—still further pondering, I say, I saw that this situation of mine was the precise situation of every mortal that breathes; only, in most cases, he, one way or other, has this Siamese connexion with a plurality of other mortals. If your banker breaks, you snap; if your apothecary by mistake sends you poison in your pills, you die. True, you may say that, by exceeding caution, you may possibly escape these and the multitudinous other evil chances of life. But handle Queequeg's monkey-rope heedfully as I would, sometimes he jerked it so, that I came very near sliding overboard. Nor could I possibly forget that, do what I would, I only had the management of one end of it.*/}
                    </Text>
                </View>
                <Text style={styles.txtTime}>
                    {data.owner}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default MessageScreen;

const styles = {
    container: {
        flex: 1,
        minHeight: '100%',
        paddingTop: Scale(85),
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    styleList:{
        // alignItems:'center',
        // justifyContent:'center',
        // paddingTop:2*Config.s,
        // backgroundColor:'red'
    },
    txtTime:{
        fontSize:Scale(11),
        color:Config.gStyle.color_C4C4C4,
        marginLeft:Scale(25),
        lineHeight: Scale(62),
        paddingTop:Scale(5)
    },
    bgPopup:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    imagePopup:{
        marginTop: Scale(22),
        backgroundColor:'white',
        width:Scale(323),
        height:Scale(470),
        borderRadius:Scale(6),
        paddingHorizontal:Scale(26),
        justifyContent:'center',
        alignItems:'center'
    },
    bottomAdd:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:Scale(60),
        backgroundColor:'white',
        position:'absolute',
        bottom:0,

        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {
            height: Scale(-1),
            width: 0
        },

    },
    btnEdit:{
        position:'absolute',
        right: Scale(10),
        top:Scale(10),
        zIndex:1,
        // backgroundColor:'red',
    },
    btnTextEdit:{
        color:Config.gStyle.color_4A90E2,
        fontSize:Scale(16),
        lineHeight:Math.floor(Scale(20))
    },
    itemView: {
        width: Scale(335),
        height: Scale(62),
        marginBottom: Scale(15),
        marginHorizontal: Scale(20),
        flexDirection:'row',
        position: 'relative',
        borderRadius:Scale(8),
        //ios
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 2,
        //     width: 0
        // },
        // //android
        // elevation: 30,
    },

    viewTextItem:{
        marginLeft:Scale(30),
        height:'100%',
        width:Scale(175),
        justifyContent:'center',
        // backgroundColor:'red'
    },
    textName:{
        color:Config.gStyle.color_def,
        fontSize:Scale(17),
        lineHeight:Math.floor(Scale(23)),
    },
    textTitle:{
        color:Config.gStyle.color_C4C4C4,
        fontSize:Scale(12),
        lineHeight:Math.floor(Scale(17)),
        marginTop:Scale(2)
    },
    imgAva: {
        width: Scale(68),
        height: Scale(62),
        borderRadius: Scale(8),
        overflow:"hidden",
    },


    imgAvaMember: {
        width: Scale(88),
        height: Scale(80),
        borderTopLeftRadius: Scale(8),
        borderBottomLeftRadius: Scale(8),
        overflow:"hidden",
    },

    title: {
        color: Config.gStyle.color_black,
        fontSize: Scale(13),
        lineHeight: Math.floor(Scale(18)),
        marginTop: Scale(20)
    },
    txt1: {
        color: Config.gStyle.color_black,
        //fontFamily: 'OpenSans',
        fontSize: Scale(13),
        lineHeight: Math.floor(Scale(16)),
        marginTop: Scale(27),
        width: '100%',
        textAlign: 'left',
        paddingHorizontal: Scale(22)
    },
    textBoxSearch:{
        paddingTop: Scale(2),
        backgroundColor: '#F9F9F9',
    },
    txtTextBox:{
        fontSize:Scale(11),
        height:Scale(15),
        width:Scale(300),
        paddingHorizontal:Scale(20),
        //fontFamily:'Roboto-Light',
        lineHeight:Math.floor(Scale(13)),
        color: Config.gStyle.color_black
    },
    txtTextBoxAdd:{
        fontSize:Scale(11),
        height:Scale(15),
        width:Scale(330),
        paddingHorizontal:Scale(5),
        //fontFamily:'Roboto-Light',
        lineHeight:Math.floor(Scale(13)),
        color: Config.gStyle.color_black
    },
    iconSearch:{
        position:'absolute',
        left: Scale(10),
        width:Scale(15),
        height:Scale(15)
    },

    styleIconFeedback:{
        position: 'absolute',
        right: Scale(20),
        top: Scale(20),
        width: Scale(20),
        height: Scale(20)
    },

    btnRemove:{
        position:'absolute',
        right:Scale(10),
        top:Scale(25)
    },
    txtPending:{
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        // top:0,
        // left:0,
        padding: Scale(5),
        // backgroundColor: 'rgba(0, 205, 172, 0.5)',
        borderTopLeftRadius: Scale(100),
        borderBottomRightRadius: Scale(100),
        fontSize: Scale(10),
        minWidth:Scale(60),
        flex:1,
        textAlign:'center'
    },

    bgItem:{
        width: Scale(370),
        display:'none',
        height:Scale(370*91)/361,
        position:'absolute',
        top:0,
        // backgroundColor:'red'
    },
    itemViewMember: {
        width: Scale(350),
        height: Scale(80),
        marginBottom: Scale(10),
        marginHorizontal: Scale(12),
        flexDirection:'row',
        position: 'relative',
        backgroundColor:'white',
        borderRadius:Scale(8),
        //ios
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        //android
        elevation: 30,
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
};

