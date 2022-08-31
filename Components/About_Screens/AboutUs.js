import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,Dimensions } from 'react-native'
function AboutUs({ navigation }) {
   var { height,width } = Dimensions.get("window");

   return (
      <ScrollView>
         <View  style={styles.links}>
            <View style={styles.btns}>
               <TouchableOpacity onPress={() => navigation.navigate('Donation')}>
                  <Text style={styles.txt}>Donation Policy</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => navigation.navigate('Staff Directory')}>
                  <Text style={styles.txt}>Staff Directory</Text>
               </TouchableOpacity>
            </View>
            </View>
            <View style={styles.container}>
            <Text style={styles.heading}>Library Campuses</Text>
            <Image style={{ width:width-30, height: height/5 }} source={
               require('../../assets/campus.png')} resizeMode="contain" />
            
               <Text style={styles.text}>
                  From its humble beginning in 1922 the Engr. Abul Kalam Library has become the largest library in the field of engineering, science and technology in Pakistan.
                  The library is equipped with state-of-art systems and technologies such as Computerized Library Management System, Library Security System, Library OPAC, Library Website and Library Portal Services.{"\n"}{"\n"}
                  Engr. Abul Kalam Library comprises of two buildings adjacent to each other.
                  The reference and administration building consists of three floors with spacious reading halls having a capacity of 800 users at a time.
                  The building adjacent to this comprises of two floors with Circulation section on the ground and the Book Bank and Duty society on the first floor.{"\n"}{"\n"}
                  Departmental libraries have also been set up in the remote campuses, City campus and LEJ campus as well as in the main campus.{"\n"}{"\n"}
                  The library is committed to providing calm, quiet, peaceful and pleasant user- oriented learning environment for its users.{"\n"}{"\n"}
                  </Text>
                  
                  <View>
                  
                     <Image style={{ width:width-30, height: height/2,marginBottom:10 }} source={
                        require('../../assets/timing.png')} resizeMode="contain" />
                  </View>
               
                  
         
         </View>
      </ScrollView>
   )
}

export default AboutUs

const styles = StyleSheet.create({
   container:
   {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center'
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
      marginVertical: 15
   },
   txt:
   {
      marginHorizontal: 8,
      // fontSize: 16,
      color: '#74b1e0'
   },
   text:
   {
      // fontSize: 15,
      color: "#000",
      marginVertical: 10,
      marginHorizontal: 15,

   },
   subheading:
   {
      fontSize: 20,
      color: '#000',
   },
   heading:
   {
      fontSize: 30,
      color: '#000',
      textAlign: 'center',
      // marginTop: 20,
   },
})

