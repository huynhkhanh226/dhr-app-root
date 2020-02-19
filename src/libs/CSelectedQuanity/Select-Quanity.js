import React from 'react';
import {
    TouchableOpacity,
    View,
    Text, TextInput,
} from 'react-native';
import Config, {Scale} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

class SelectQuanity extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            isSubmit: false,
            countValue:  0,
            countValueMax: 0,
            isDisablePlus: false,
            isDisableMinus: false,
            isQuanity: true,
        });
    }

    componentDidMount() {
        const {paramTotal,paramValue, free} = this.props;
        const value = paramValue ? paramValue : 0;
        const total = free ? Number.MAX_SAFE_INTEGER : (paramTotal ? paramTotal : 0);
        this.init(paramValue,value,total);
    };

    init = (paramValue,value,total) => {
        if(paramValue <=0){
            this.setState({
                countValue:  value,
                countValueMax: total,
                isDisablePlus: false,
                isDisableMinus: true,
                isQuanity: true,
            })
        }else {
            this.setState({
                countValue:  value,
                countValueMax: total,
                isDisablePlus: false,
                isDisableMinus: false,
                isQuanity: false,
            })
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.paramValue !== this.props.paramValue || nextProps.paramTotal !== this.props.paramTotal){
            const {paramTotal,paramValue, free} = nextProps;
            const value = paramValue ? paramValue : 0;
            const total = free ? Number.MAX_SAFE_INTEGER : (paramTotal ? paramTotal : 0);
            this.init(paramValue,value,total);
        }
    };

    onChangePlus = () => {
        const {countValue, countValueMax}= this.state;
        const count = countValue !== this.vlValue ? parseInt(this.vlValue) : countValue;
        this.setState({
            countValue: count >= countValueMax ? countValueMax : count+1,
            isDisablePlus: count >= countValueMax,
        },()=>{
            if (this.props.changeValue) this.props.changeValue(this.state.countValue);
        })
    };

    onChangeMinus = () => {
        const {countValue}= this.state;
        const count = countValue !== this.vlValue ? parseInt(this.vlValue) : countValue;
        this.setState({
            countValue: count <=0 ? 0 : count-1,
            isDisableMinus: count <=0,
        },()=>{
            if (this.props.changeValue) this.props.changeValue(this.state.countValue);
        })
    };

    onChangeQn = () => {
        const {countValue}= this.state;
        this.setState({
            isQuanity: false,
            countValue: countValue+1,
            isDisableMinus: false
        },()=>{
             if (this.props.changeValue) this.props.changeValue(this.state.countValue);
        })
    };

    render() {
        const {countValueMax, countValue, isDisablePlus, isQuanity, isDisableMinus} = this.state;
        this.vlValue = countValue;
        return(
                <View style={styles.selectView}>

                    {!countValue && <TouchableOpacity style={!countValueMax ? styles.selectQnNoneDsb : styles.selectQnNone}
                                                                 onPress={()=>{
                                                                     if(!countValueMax) return false;
                                                                     this.onChangeQn()
                                                                 }}>
                        <Text style={!countValueMax ? styles.textSelectQnNoneDsb : styles.textSelectQnNone}>{Config.lang('PM_Them')}</Text>
                    </TouchableOpacity>}

                    {!countValue === false && <View style={styles.selectQn}>
                        <TouchableOpacity style={styles.touchPlus}
                                          onPress={this.onChangePlus}
                                          disabled={isDisablePlus || isQuanity}>
                            <Icon name={'plus'} size={Scale(16, true)} color={"#FF9C12"}/>
                        </TouchableOpacity>
                        <View style={styles.viewTouchPlus}>
                            <TextInput style={styles.texTouchPlus}
                                       numberOfLines={1}
                                       ref={'TextInput'}
                                       onChangeText={text => {
                                           this.vlValue = text;
                                           if(parseInt(text?text:'0') > parseInt(countValueMax)){
                                               this.vlValue = countValueMax;
                                                   this.refs.TextInput.setNativeProps({text: this.vlValue.toString()});
                                           }
                                           if (this.props.changeValue) this.props.changeValue(this.vlValue);
                                       }}
                                       onBlur={()=>{
                                           if(!this.vlValue || this.vlValue==='0' || parseInt(this.vlValue) < 0){
                                               this.setState({
                                                   countValue:0
                                               });
                                               if(this.props.changeValue) this.props.changeValue(0);
                                           }
                                       }}
                                       name={'textSelectNone'}
                                       defaultValue={countValue.toString()}
                                       autoCorrect={true}
                                       keyboardType={'numeric'}
                            />
                        </View>
                        <TouchableOpacity style={styles.touchPlus}
                                          onPress={this.onChangeMinus}
                                          disabled={isDisableMinus || isQuanity}>
                            <Icon style={{position:'absolute', }}
                                  name={'minus'}
                                  size={Scale(16, true)}
                                  color={"#FF9C12"}
                            />
                        </TouchableOpacity>
                    </View>}
                </View>
        )
    }
}

const styles = {
    selectView: {
        height:"100%",
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    selectQnNone:{
        width: Scale(44, true),
        height: Scale(24, true),
        borderRadius: Scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAE6CA'
    },
    selectQnNoneDsb:{
        width: Scale(44, true),
        height: Scale(24),
        borderRadius: Scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5D5D5'
    },
    textSelectQnNone:{
        fontSize:Scale(12, true),
        fontFamily:Config.getFont('Muli-Bold'),
        lineHeight:Math.floor(Scale(15, true)),
        color:'#FF9C12',
    },
    textSelectQnNoneDsb:{
        fontSize:Scale(12, true),
        fontFamily:Config.getFont('Muli-Bold'),
        lineHeight:Math.floor(Scale(15, true)),
        color:'#BCBAB8',
    },
    selectQn:{
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    touchPlus:{
        width: Scale(44, true),
        height: Scale(24, true),
        borderRadius: Scale(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAE6CA'
    },
    viewTouchPlus:{
        width:Scale(44, true),
        height:Scale(21),
        borderWidth:1,
        borderColor:'#FAE6CA',
        backgroundColor:'#FFFFFF',
        borderRadius:Scale(5),
        position: 'relative'
    },
    texTouchPlus:{
        color:'#212121',
        // position:'absolute',
        fontSize:Scale(14, true),
        height:Scale(21),
        padding:Scale(2),
        paddingTop: 0,
        lineHeight:Math.floor(Scale(18, true)),
        fontFamily:Config.getFont('Muli-Bold'),
        textAlign: 'center',
    },
    touchMinus:{
        width: Scale(20, true),
        height: Scale(20),
        borderRadius: Scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f95122'
    }
};

export default SelectQuanity;
