import { View, Text,StyleSheet ,Image, TouchableOpacity,Dimensions} from 'react-native';
import React from 'react';
var {width,height}=Dimensions.get('window');

export default function Welcome({navigation}) {
  return (
    <View style={styles.contianer}>
       <View style={styles.logo}>
          <Image style={{ width:width, height:height/5 }} source={
                        require('../assets/congrats.png') } resizeMode="contain" />
            </View>
            <Text style={styles.txt}>WELCOME TO HOMEPAGE</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.btn}> NEXT </Text>
            </TouchableOpacity>
     <View style={styles.footer}>
          <Image style={{ width:width-20, height:height/7 }} source={
                        require('../assets/engabulkalamlib2.png') } resizeMode="contain" />
          </View>
    </View>
  );
}

const styles=StyleSheet.create({
    contianer:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        width:width,
        height:height

    },
    logo:
    {
         marginTop:40,
    
    },
    txt:
    {
        marginVertical:40,
        fontSize:22,
        color:'#000'
    },
    btn:
    {
        fontSize:20,
        borderRadius:5,
        backgroundColor:'#74b1e0',
        color:'#fff',
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:20

    },
    footer:
    {
        marginTop:170
    }
})
