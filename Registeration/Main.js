import React from 'react'
import { View, Text ,StyleSheet, TouchableOpacity ,Image, Dimensions} from 'react-native'

export default function Main( {navigation}) {
    var {width,height}=Dimensions.get('window')
    return (
        <View style={styles.container}>
          <View style={styles.logo}>
          <Image style={{ width:width, height:height/5 }} source={
                        require('../assets/fyplogo.png') } resizeMode="contain" />
            </View>
         <View  stlye={styles.btn}>
         <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text  style={{fontSize:25,color:'#fff',backgroundColor:'#74b1e0',
            paddingVertical:10,paddingHorizontal:40 ,borderRadius:5,textAlign:'center' ,marginTop:100}}>SIGN UP</Text>
          </TouchableOpacity>
         
         </View>
          
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text  style={{fontSize:25,color:'#fff',backgroundColor:'#74b1e0',
            paddingVertical:10,paddingHorizontal:45 ,borderRadius:5,textAlign:'center',marginTop:10}} >SIGN IN</Text>
          </TouchableOpacity>
        
          <View style={styles.footer}>
          <Image style={{ width:width-50, height:height/8 }} source={
                        require('../assets/abdulkalam.png') } resizeMode="contain" />
          </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent:'center',
        alignItems:'center'
    },
    logo:
    {
        marginTop:50,
    
    },
    btn:
    {
        marginTop:50
    },
    footer:
    {
        marginTop:120
    }

})