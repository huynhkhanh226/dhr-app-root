import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import validator from 'validator';
import CInput from '../CInput/CInput.js';
import Config, {Scale} from '../../config/index';
import ReactNativePickerModule from 'react-native-picker-module';
import IconAwe from 'react-native-vector-icons/FontAwesome5';

let validatorExt = {
    isRequired(value){
        if(typeof value === 'string')
            return value.trim() !== '';
        return true;
    },

    notCheck(value){
        return true;
    },

    isName(value){
        if(value.length<=1){
            return false;
        }
        let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        return !regex.test(value);
    },

    isPasswordOrNull(value){
        // if(value.length < 8 || value.length > 20) + Upper + lower || null);
        if(!value || value.length === 0){
            return true;
        }
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/gm;
        return regex.test(value);
    },

    isPassword(value){
        // if(value.length < 8 || value.length > 20) + Upper + lower);
        if(value.length<=1){
            return false;
        }
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/gm;
        return regex.test(value);
    },

    isEmailAndMobile(value){
        let args = [];
        args.push(value);
        let _validatorEmail = validator["isEmail"];
        let _isValidEmail = _validatorEmail.apply(null,args);

        args.push('vi-VN');
        let _validatorMobile = validator["isMobilePhone"];
        let _isValidMobile = _validatorMobile.apply(null,args);
        return _isValidEmail || _isValidMobile;
    },

    isMobile(value){
        let args = [];
        args.push(value);
        args.push('vi-VN');
        let _validatorMobile = validator["isMobilePhone"];
        return _validatorMobile.apply(null,args);
    },

    isEqual(value,comparison){
        return (value === comparison);
    }

};

const checkRule = (value,rule)=>{
    let args = [value];
    let check = validatorExt[rule] || validator[rule];
    if(check){
        return check.apply(null,args); // true , false
    }
    else{
        return true;
    }
};

const checkFeedback = (validate,feedback) =>{
    let borderFeedback = {};
    let iconFeedback = '';
    if(validate==='success'){
        borderFeedback = (feedback==='BORDER')?styles.border_success:{};
        iconFeedback = (feedback==='ICON')?'success':'';
    }
    else if(validate==='error'){
        borderFeedback = (feedback==='BORDER')?styles.border_error:{};
        iconFeedback = (feedback==='ICON')?'error':'';
    }
    return{
        borderFeedback,
        iconFeedback
    }
};

class CForm extends Component {

    validate=()=>{
        let {data} = this.props;
        let dt = {};
        for(let i=0; i<data.length; i++){
            let item = this.refs[data[i].name].validate();
            if(!item.check){
                return false;
            }
            dt[item.name] = item;
        }
        return dt;
    };

    _onChangeText=(value,rule)=>{
        let checkEqual = rule.split("=");
        if(checkEqual.length>1){
            let name = checkEqual[1];
            if(this.refs[name]){
                let valueCheck = this.refs[name].getValue();
                return (value===valueCheck)?"success":"error";
            }
        }
        return "success";
    };

    _onValueChange=(value,name)=>{
        if(this.props.onValueChange){
            this.props.onValueChange(value,name)
        }
    };

    _onSubmitEditing = (idx) => {
        let {data} = this.props;
        if(data[idx].returnKeyType === 'next'){
            this.refs[data[idx].name].onBlur();
            if(idx < (data.length - 1) && data[idx+1].key === 'TEXT'){
                this.refs[data[idx+1].name].onFocus();
            }
            if(data[idx].onSubmitEditing){
                data[idx].onSubmitEditing();
            }
        }
    };

    render() {
        let {data, style} = this.props;
        return (
            <View style={style}>
                {data.map((dt,idx)=>{
                    if(dt.key==='TEXT'){
                        return(
                            <CTextBox key={idx}
                                      onChange={this._onChangeText}
                                      ref={dt.name}
                                      onSubmitEditing={()=>this._onSubmitEditing(idx)}
                                      data={dt} />
                        )
                    }
                    else if(dt.key==='TEXTSELECT'){
                        return(
                            <CTextBoxSelect key={idx}
                                            onChange={this._onChangeText}
                                            ref={dt.name}
                                            onSubmitEditing={()=>this._onSubmitEditing(idx)}
                                            data={dt} />
                        )
                    }
                    else if(dt.key==='NUMBER'){
                        return(
                            <CNumberBox key={idx}
                                        ref={dt.name}
                                        data={dt} />
                        )
                    }
                    return null;
                })}
            </View>
        )
    }
}

export class CTextBox extends React.PureComponent{

    constructor(props) {
        super(props);
        let {validators,value} = this.props.data;
        this.state = {
            validate: '',
            value: value || ''
        };

        this._rule = validators || '';
        this.vlRef = null;
    }

    validate=()=>{
        let check = checkRule(this.state.value,this._rule);
        this.setState({validate: check?'success':'error'});
        return {
            name: this.props.data.name,
            check: check,
            value: this.state.value
        };
    };

    getValue=()=>{
        return this.state.value;
    };

    _onChange=(value)=>{
        if(value.length===0){
            this.setState({value: '',validate: ''});
            return;
        }
        let check = checkRule(value,this._rule);
        if(this.props.onChange){
            let checkOnChange = this.props.onChange(value,this._rule);
            if(checkOnChange==="error"){
                check = false;
            }
        }
        this.setState({value: value,validate: check?'success':'error'});
    };

    showAlert = (data) => {
        if(data.toolTip){
            Alert.alert('',data.toolTip);
        }
    };

    onFocus = () => {
        let {data} = this.props;
        if(data.key === 'TEXT') this.vlRef.onFocus();
    };

    onBlur = () => {
        this.vlRef.onBlur();
    };

    render(){
        let {data, onSubmitEditing} = this.props;
        let {value,validate} = this.state;
        let feedback = checkFeedback(validate, data.feedback);
        // if(feedback && feedback.borderFeedback && feedback.borderFeedback.borderBottomColor){
        //     this.onFocus();
        // }
        return(
            <View style={[styles.box_container,data.styleRow]}>
                <Label style={data.styleLabel} data={data}/>
                <CInput style={[data.style]}
                        ref={ref => this.vlRef = ref}
                        multiline={data.multiline}
                        password={data.password}
                        edit={data.edit}
                        placeholder={data.placeholder}
                        placeholderTextColor={data.placeholderTextColor}
                        value={value}
                        returnKeyType={data.returnKeyType}
                        onSubmitEditing={onSubmitEditing}
                        shadow={data.shadow}
                        maxLength={data.maxLength}
                        styleText={[data.styleText,feedback.borderFeedback]}
                        styleImage={data.styleImage}
                        image={data.image}
                        width={data.width}
                        height={data.height}
                        stylePassWord={data.stylePassWord}
                        onChangeText={this._onChange}/>
                {feedback.iconFeedback==='success' && data.feedback && (
                    <Icon icon={data.iconFeedBackTrue || require('./icon_check.png')}
                          style={data.styleIconFeedback} />
                )}
                {feedback.iconFeedback==='error' && data.feedback && (
                    <Icon icon={data.iconFeedBackFalse || require('./icon_warning.png')}
                          onTooltip={()=>this.showAlert(data)}
                          style={data.styleIconFeedback} />
                )}
                {Object.keys(feedback.borderFeedback).length > 0 && data.feedback && data.tooltipError && (
                    <Text style={[{position:'absolute', left:Scale(10), bottom: Scale(-16), fontSize: Scale(10), color:'red'},data.styleMessageError]}>{data.tooltipError}</Text>
                )}
            </View>
        )
    }
}

export class CTextBoxSelect extends React.PureComponent{

    constructor(props) {
        super(props);
        let {validators,value} = this.props.data;
        this.state = {
            validate: '',
            value: value || ''
        };

        this._rule = validators || '';
        this.vlRef = null;
    }

    validate=()=>{
        let check = checkRule(this.state.value,this._rule);
        this.setState({validate: check?'success':'error'});
        return {
            name: this.props.data.name,
            check: check,
            value: this.state.value
        };
    };

    getValue=()=>{
        return this.state.value;
    };

    _onChange=(value)=>{
        if(value.length===0){
            this.setState({value: '',validate: ''});
            return;
        }
        let check = checkRule(value,this._rule);
        if(this.props.onChange){
            let checkOnChange = this.props.onChange(value,this._rule);
            if(checkOnChange==="error"){
                check = false;
            }
        }
        this.setState({value: value,validate: check?'success':'error'});
    };

    showAlert = (data) => {
        if(data.toolTip){
            Alert.alert('',data.toolTip);
        }
    };

    onFocus = () => {
        let {data} = this.props;
        if(data.key === 'TEXT') this.vlRef.onFocus();
    };

    onBlur = () => {
        this.vlRef.onBlur();
    };

    render(){
        let {data, onSubmitEditing} = this.props;
        let {value,validate} = this.state;
        let feedback = checkFeedback(validate, data.feedback);
        // if(feedback && feedback.borderFeedback && feedback.borderFeedback.borderBottomColor){
        //     this.onFocus();
        // }
        return(
            <View style={[styles.box_container,data.styleRow]}>
                <Label style={data.styleLabel} data={data}/>
                <CInput style={[data.style]}
                        ref={ref => this.vlRef = ref}
                        multiline={data.multiline}
                        password={data.password}
                        edit={data.edit}
                        placeholder={data.placeholder}
                        placeholderTextColor={data.placeholderTextColor}
                        value={value}
                        returnKeyType={data.returnKeyType}
                        onSubmitEditing={onSubmitEditing}
                        shadow={data.shadow}
                        maxLength={data.maxLength}
                        styleText={[data.styleText,feedback.borderFeedback]}
                        styleImage={data.styleImage}
                        image={data.image}
                        width={data.width}
                        height={data.height}
                        stylePassWord={data.stylePassWord}
                        onChangeText={this._onChange}/>
                {feedback.iconFeedback==='success' && data.feedback && (
                    <Icon icon={data.iconFeedBackTrue || require('./icon_check.png')}
                          style={data.styleIconFeedback} />
                )}
                {feedback.iconFeedback==='error' && data.feedback && (
                    <Icon icon={data.iconFeedBackFalse || require('./icon_warning.png')}
                          onTooltip={()=>this.showAlert(data)}
                          style={data.styleIconFeedback} />
                )}

                {Object.keys(feedback.borderFeedback).length > 0 && data.feedback && data.tooltipError && (
                    <Text style={[{position:'absolute', left:Scale(10), bottom: Scale(-16), fontSize: Scale(10), color:'red'},data.styleMessageError]}>{data.tooltipError}</Text>
                )}


                {data.dataSelect && data.dataSelect.length > 1 &&
                <TouchableOpacity onPress={() => {this.pickerRef.show()}}
                                  style={[{
                                      position: 'absolute',
                                      width: Scale(data.height),
                                      height: Scale(data.height),
                                      right: 0,
                                      bottom: 0,
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                  }, data.styleIcon]}
                >
                    <IconAwe name={'angle-down'}
                             size={Scale(16)}
                             color={Config.gStyle.color_grey}
                    />
                </TouchableOpacity>
                }

                <ReactNativePickerModule
                    pickerRef={e => this.pickerRef = e}
                    items={data.dataSelect || []}
                    onValueChange={(value) => this._onChange(value)}/>
            </View>
        )
    }
}

export class CNumberBox extends React.PureComponent{


    constructor(props) {
        super(props);
        let {value,validators} = this.props.data;
        let number = value.replace(/[^0-9]+/g, '');
        let v = number.toString().replace(/,/g,'');
        this.state = {
            value: v.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,"),
            number: v,
            validate: ''
        };

    }

    validate=()=>{
        let check = (this.state.value.length>0);
        this.setState({validate: check?'success':'error'});
        return {
            name: this.props.data.name,
            check: check,
            value: this.state.number
        };
    };

    _onChange=(txt)=>{
        let number =  txt.replace(/[^0-9]+/g, '');
        if(number.length===0){
            this.setState({value: '',validate: ''});
            return;
        }
        let v = number.toString().replace(/,/g,'');
        let value = v.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        let check = (value.length>0);
        if(this.props.onChange){
            this.props.onChange(v);
        }
        this.setState({
            value: value,
            number: v,
            validate: check?'success':'error'
        });
    };

    render(){
        let {data} = this.props;
        let {value,validate} = this.state;
        let feedback = checkFeedback(validate,data.feedback);

        return(
            <View style={[styles.box_container,data.styleRow]}>
                <Label data={data}/>
                <CInput style={[data.style,feedback.borderFeedback]}
                        multiline={data.multiline}
                        password={data.password}
                        edit={data.edit}
                        placeholder={data.placeholder}
                        placeholderTextColor={data.placeholderTextColor}
                        value={value}
                        onChangeText={this._onChange}/>
                {feedback.iconFeedback==='success' && (
                    <Icon icon={data.iconFeedBackTrue || require('./icon_check.png')}
                          style={data.styleIconFeedback} />
                )}
                {feedback.iconFeedback==='error' && (
                    <Icon icon={data.iconFeedBackFalse || require('./icon_warning.png')}
                          style={data.styleIconFeedback} />
                )}
            </View>
        )
    }
}

class Label extends React.PureComponent{
    render(){
        let {data} = this.props;
        return(
            <View style={{flexDirection: 'row'}}>
                {data.icon && (
                    <Icon icon={data.icon}
                          style={data.styleIcon} />
                )}
                {data.label && (
                    <Text style={data.styleLabel}>
                        {data.label}
                    </Text>
                )}
                {data.title && (
                    <Text style={data.styleTitle}>
                        {data.title}
                    </Text>
                )}
            </View>
        )
    }
}

class Icon extends React.PureComponent{

    onPress = () => {
        if(this.props.onTooltip) this.props.onTooltip();
    };

    render(){
        let {icon,style} = this.props;
        if(!icon){
            return null;
        }
        return(
            <TouchableOpacity onPress={this.onPress}>
                <Image style={style}
                       source={icon} />
            </TouchableOpacity>
        )
    }
}

export default CForm;

const styles = {
    box_container:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    border_success:{
        // borderBottomWidth: 1,
        // borderBottomColor: '#3c763d'
    },

    border_error:{
        borderColor: 'red'
    },

    styleIconFeedback:{
        position: 'absolute',
        right: Scale(20),
        top: Scale(44),
        width: Scale(20),
        height: Scale(20)
    }
};
