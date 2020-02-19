import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {Scale} from '../../config';

export default class CDate extends React.PureComponent{

    static defaultProps = {
        mode: 'date', // date || datetime || time
        placeholder: 'Ngày sinh',
        format: 'DD/MM/YYYY',
        confirmBtnText: 'Accept',
        cancelBtnText: 'Cancel',
        iconSource: require('./date_icon.png'),
        customStyles: {
            dateIcon: {
                position: 'absolute',
                right: Scale(10),
                width: Scale(15),
                height: Scale(15)
            },
            dateInput: {
                alignItems: 'flex-start',
                borderWidth: 0,
                height: Scale(30)
            },
            dateTouchBody: {
                height: Scale(30),
            },
            dateText: {
                color:'#6b6f72',
                fontSize:Scale(14, true),
            },
            placeholderText: {
                color:'#6b6f72',
                fontSize:Scale(14, true)
            }
        }
    };

    render(){
        let {
            date,
            style,
            mode,
            placeholder,
            format,
            confirmBtnText,
            cancelBtnText,
            iconSource,
            customStyles,
            onDateChange,
            maximumDate,
            minimumDate
        } = this.props;

        Object.keys(CDate.defaultProps.customStyles).forEach((key) => {
            if(!customStyles[key]) customStyles[key] = CDate.defaultProps.customStyles[key];
        });


        return(
            <DatePicker
                style={style}
                date={date}
                mode={mode}
                maxDate={maximumDate}
                minDate={minimumDate}
                placeholder={placeholder}
                format={format}
                confirmBtnText={confirmBtnText}
                cancelBtnText={cancelBtnText}
                iconSource={iconSource ? iconSource : null}
                onDateChange={onDateChange}
                customStyles={customStyles}
            />

        )
    }
}
