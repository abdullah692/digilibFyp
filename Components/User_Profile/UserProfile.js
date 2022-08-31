import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import UserData from './UserData.json'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { IP ,PORT} from '../../constant';

let tem=[
  {
    BATCH_NO: "20182019",
BORROWER_NO: "U7 (CT)002/20182019",
BORROW_LIMIT: "2",
CAT_CO: "1",
DEPT_CO: "CCT",
DESIGNATION: null,
DISC_CO: "CT",
EMAIL: null,
ENTER_BY: "admin",
ENTER_DT: null,
E_DATE: null,
FATHER_NAME: "SALMAN AHMED KHAN",
FAXNO: null,
INDEX_NO: "262510",
INDUCTION_STATUS: "Regular Admission",
LAST_CLEARED_BY: null,
LAST_CLEARED_DT: null,
MEM_ENT_DATE: null,
NAME: "ABDUL SUBHAN",
NIC_NO: null,
PGCODE: null,
PG_STD_PROG: null,
PHONE1: null,
PHONE2: null,
PHOTO: "4107192.gif",
PROG_ID: null,
P_ADDRESS: null,
ROLL_NO: "002",
R_ADDRESS: null,
STATUS: "U",
S_DATE: null,
TYPE: "U7",
UPD_BY: null,
UPD_DT: null,
USER_DATE: null,
USER_ID: "4107192",

  }
]

export default function UserProfile({ navigation }) {
  const [userdata, setuserData] = useState(UserData);
  const [register,setReigster]=useState('');
  const [isloaded,setLoaded]=useState(true);


  // console.log(userdata[1]);

  let printData = []
  userdata.map(data => {
    let html = `
    <span>Batch: ${data.BATCH_NO}</span> &nbsp &nbsp <span>Roll No: ${data.ROLL_NO}</span>
    <p>Name : ${data.NAME} </p>
    <p>Father Name: ${data.FATHER_NAME}</p>
    <p>Department: ${data.DEPT_CO}</p>
    <p>Borrow-No: ${data.BORROWER_NO}</p>
    <p>User-Id: ${data.USER_ID}</p>
    `
    printData.push(html)
  })

  const generateHTML = (userdata) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="font-size: 25px; text-align: center; font-family:calibri;">
    <h2 style="margin-bottom: 50px;">User Profile</h2>
    ${userdata.join(``)}
    </div>
   
</body>
</html>
        
      
    `
  }


  const printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: generateHTML(printData),
      fileName: 'test',
      base64: true,
    })

    await RNPrint.print({ filePath: results.filePath })
  }



  const User = async () => {
    console.log('User profile error');
    let token = await AsyncStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    await axios.get(`http://${IP}:${PORT}/api/getuser`, config)
      .then(res => {
        console.log('Api Respones ====', res.data)
        setuserData(res.data?.user);
        setReigster(res.data?.regType[0])
        console.log('Registeration type',register)
        setLoaded(false);
      }).catch((err) => {
        
        console.log('Error Message in User Profile', err)
      })
  }
console.log('User data',userdata)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',()=>{
      User();
    })     
    return unsubscribe
  },[navigation])

  useEffect(() => {
     User();
    console.log('Profile user');
  }, [])

 
  return (
    <View style={styles.container}>
      {
        isloaded ? (
          <View>
            <ActivityIndicator size={30} color='#74b1e0' />
          </View>
        ):(
          <>        
            <View>
          <Text style={styles.heading}>User Profile</Text>
        </View>
        <TouchableOpacity>
          <Icon name="file-pdf-o" size={30} style={styles.pdf} onPress={() => printPDF()} />
        </TouchableOpacity>
  
        <Image style={{ width: 200, height: 120, marginVertical: 15 }} source={
          require('../../assets/person.png')} resizeMode='contain' />
        <ScrollView>
          <View style={styles.border}>
             <Text style={styles.info}>Membership : {register?.REG_TYPE}{'\n'}</Text>
            {userdata.map((item, index) => (
              <View key={index}>
                <Text style={styles.info}>User-Id : {item.USER_ID} {'\n'}</Text>
                <Text style={styles.info}>Batch: {item.BATCH_NO}{'\t\t\t\t'} Roll No: {item.ROLL_NO} {'\n'}</Text>
                {/* <Text style={styles.info}>Year: {item.year}{'\n'}</Text> */}
                <Text style={styles.info}>Name: {item.NAME}{'\n'}</Text>
                <Text style={styles.info}>Father Name: {item.FATHER_NAME}{'\n'}</Text>
                <Text style={styles.info}>Department: {item.DEPT_CO}
                  {'\n'}{'\n'}
                  {/* Membership: {register.REG_TYPE} */}
                  Borrow-No: {item.BORROWER_NO}
                  
                  
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        </>
      
        )

    

        
      }
      </View>
     
  )
}


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading:
  {
    fontSize: 35,
    textAlign: 'center',
    borderColor: '#36B5E4',
    color: '#000',
    borderBottomWidth: 3,
    marginHorizontal: 70,
    marginVertical: 20

  },
  border:
  {
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10
  },
  info:
  {
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: 'black'
  },
  pdf:
  {
    marginTop: 20,
    marginLeft: '60%'
  }
})