import React from "react";
import {ActivityIndicator, View} from "react-native";

class CLoading extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#707070"/>
            </View>
        )
    }
}

export default CLoading;

const styles = {
    container:{
        flex: 1,
        width:'100%',
        height:'100%',
        position:'absolute',
        left:0,
        top:0,
        alignItems:'center',
        justifyContent:'center',
        // opacity: 0.5,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
};
