import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image,Dimensions } from 'react-native'
export default function StaffDirect({navigation}) {

   var { height,width } = Dimensions.get("window");
   return (
      <ScrollView>
         

<View style={styles.links}>
            <View style={styles.btns}>
            <TouchableOpacity onPress={()=>navigation.navigate('Donation')}>
                  <Text style={styles.txt}>Donation Policy</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate('Staff Directory')}>
                  <Text style={styles.txt}>Staff Directory</Text>
               </TouchableOpacity>
            </View>
            </View>

            <View style={styles.container}>
            <Text style={styles.heading}>Staff Directory</Text>
            <View style={styles.img}> 
            <Image 
            style={{ width: width, height:height/2}} 
            source={require('../../assets/staff1.png') } resizeMode="contain"/>
             <Image 
            style={{ width: width, height:height/2,marginTop:-10}} 
            source={require('../../assets/staff2.png') } resizeMode="contain"/> 
              <Image 
            style={{ width:width, height:height/2,alignContent:'stretch'}} 
            source={require('../../assets/staff3.png') } resizeMode="stretch"/>
             <Image 
            style={{ width: width, height:height/5,marginTop:-10}} 
            source={require('../../assets/staff4.png') } resizeMode="contain"/>
            </View>
            <Text>{"\n"}{"\n"}</Text>
            </View>
            </ScrollView>
)
}

const styles=StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#fff',
      //   alignItems:'center'
    },
    links:
   {
       flex:1,
       backgroundColor:'#fff'
   },
    btns:
    {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical:15
    },
    txt:
    {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#74b1e0'
    },
    heading:
   {
      fontSize: 30,
      color: '#000',
      textAlign: 'center',
      // marginTop: 20,
   },
}
)