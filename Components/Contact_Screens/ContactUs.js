import React from 'react'
import { View, Text, StyleSheet,Dimensions, ScrollView} from 'react-native'
var {height,width}=Dimensions.get('window')
function Contact() {
    return (
        <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Contact Us</Text>
            </View>
            <View style={styles.contact}>
                <Text style={styles.head}>Phone:</Text>
                <Text style={styles.txt}>92(21)99261261-8{"\n"} PABX: 2229,2327,2428,2358</Text>
            </View>
            <View style={styles.contact}>
            <Text style={styles.head1}>Fax:</Text>
            <Text style={styles.txt1}>92(21)99261255</Text>
            </View>
            <View style={styles.contact}>
            <Text style={styles.head1}>Email:</Text>
            <Text style={styles.txt1}>libadmin@neduet.edu.pk</Text>
            </View>
            <View style={styles.contact}>
            <Text style={styles.head2}>Postal Address:</Text>
            <Text style={styles.txt2}>Engr. Abul Kalam Library,{"\n"}
            NED University of Eng. & Tech.{"\n"}
            University Road, Karachi 75270,{"\n"} Pakistan.</Text>
            </View>
            <View style={styles.contact}>
                <Text style={styles.line}>For queries regarding  E Resources contact Ms. Naveen Ali. </Text>
            </View>
            
            <View style={styles.contact}>
            <Text style={styles.head}>Phone:</Text>
            <Text style={styles.txt}>92(21)99261261-8{"\n"}PABX: 2428</Text>
            </View>
            
            <View style={styles.contact}>
            <Text style={styles.head1}>Email:</Text>
            <Text style={styles.txt1}>naveen@neduet.edu.pk</Text>
            </View>

        </View>
        </ScrollView>
    )
}

export default Contact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        width:width,
        height:height,
        // justifyContent:'center',
        // alignItems:'center'
       
    },
    heading: 
    {
        fontSize:30,
       textAlign:'center',
        borderColor:'#36B5E4',
        color:'#000',
        borderBottomWidth:2,
        marginHorizontal:115,
        marginVertical:20

    },
    txt:
    {
        fontSize:18,
        color: "black",
        marginTop:10
         
    },
    head:
    {
        fontSize:18,
        color: "black", 
        marginTop:18,
        borderBottomWidth:2 ,
        borderColor:'#36B5E4',
        marginHorizontal:30
    },
    head1:
    {
        fontSize:18,
        color: "black", 
        borderBottomWidth:2 ,
        borderColor:'#36B5E4',
        marginHorizontal:30
    },
    txt1:
    {
        fontSize:18,
        color: "black",
    },
    head2:
    {
        fontSize:18,
        color: "black", 
        borderBottomWidth:2 ,
        borderColor:'#36B5E4',
        marginHorizontal:15,
         marginBottom:50
    },
    txt2:
    {
        fontSize:15,
        color: "black",
        // textAlign:'left'
    },
    contact:
    {
        flexDirection:'row',
        marginVertical:10
    },
    line:
    {
        flex:1,
        // padding:10,
        fontSize:19,
        fontFamily:'roboto',
        textAlign:'center',
        color:'#000'
    }
})
