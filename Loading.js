import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const Loading = () => {
    return (
        <View style={styles.container}>
           <Text style={styles.text}>Getting the weather</Text> 
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FDF6AA',
        paddingHorizontal:30,
        paddingVertical:100,
    },
    text:{
        color:'#2c2c2c',
        fontSize:30
    }
})

export default Loading;