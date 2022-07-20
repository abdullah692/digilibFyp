import { View, Text,StyleSheet ,Image, TouchableOpacity,Dimensions} from 'react-native';
import React from 'react';

export default function Welcome({navigation}) {
    var {width,height}=Dimensions.get('window');
  return (
    <View style={styles.contianer}>
       <View style={styles.logo}>
          <Image style={{ width:width, height:height/4 }} source={
                        require('../assets/congrats.png') } resizeMode="contain" />
            </View>
            <Text style={styles.txt}>WELCOME TO HOMEPAGE</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.btn}> NEXT </Text>
            </TouchableOpacity>
     <View style={styles.footer}>
          <Image style={{ width:width-70, height:height/8 }} source={
                        require('../assets/abdulkalam.png') } resizeMode="contain" />
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
        backgroundColor:'#fff'
    },
    logo:
    {
        marginTop:-90,
    
    },
    txt:
    {
        marginVertical:40,
        fontSize:25,
        color:'#000'
    },
    btn:
    {
        fontSize:25,
        borderRadius:5,
        backgroundColor:'#74b1e0',
        color:'#fff',
        paddingHorizontal:20,
        paddingVertical:10,
        marginBottom:20

    },
    footer:
    {
        marginTop:70
    }
})
