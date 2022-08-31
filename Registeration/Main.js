import React from 'react'
import { View, Text ,StyleSheet, TouchableOpacity ,Image, Dimensions} from 'react-native'
var {width,height}=Dimensions.get('window')
export default function Main( {navigation}) {
    
    return (
        <View style={styles.container}>
          <View style={styles.logo}>
          <Image style={{ width:width, height:height/6 }} source={
                        require('../assets/fyplogo.png') } resizeMode="contain" />
            </View>
         <View  stlye={styles.btn}>
         <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text  style={{fontSize:20,color:'#fff',backgroundColor:'#74b1e0',
            paddingVertical:10,paddingHorizontal:20 ,borderRadius:5,textAlign:'center',margin:20 }}>SIGN UP</Text>
          </TouchableOpacity>
         
         </View>
          
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text  style={{fontSize:20,color:'#fff',backgroundColor:'#74b1e0',
            paddingVertical:10,paddingHorizontal:25 ,borderRadius:5,textAlign:'center'}} >SIGN IN</Text>
          </TouchableOpacity>
        
          <View style={styles.footer}>
            
          <Image style={{ width:width-10, height:height/7}} source={
                        require('../assets/engabulkalamlib2.png') } resizeMode="contain" />
          </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center',
        height:height,
        width:width
    },
    logo:
    {
       margin:50
    
    },
    btn:
    {
        marginTop:50
    },
    footer:
    {
        marginTop:170
    }

})