// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { BarCodeScanner } from 'expo-barcode-scanner'
// import Isbn from './Isbn';


// const Scanner = ({ navigation }) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [scanned, setScanned] = useState(false);
//   const [text, setText] = useState('Not yet scanned')



//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       console.log('hreerre',status)
//       setHasPermission(status === 'granted');
//     })();
//   }, [scanned]);


//   // What happens when we scan the bar code
//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setText(data)
//     console.log('Type: ' + type + '\nData: ' + data)
//   };

//   // Check permissions and return the screens
//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text>Requesting for camera permission</Text>
//       </View>)
//   }
//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ margin: 10 }}>No access to camera </Text>
//         {/* <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} /> */}
//       </View>)
//   }

//   // Return the View
//   return (
//     <View style={styles.container}>
//       <View style={styles.barcodebox}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? false : handleBarCodeScanned}
//           style={{ height: 400, width: 400 }} />
//       </View>
//       <View style={styles.isbn}>
//         <Text style={styles.maintext}>{text}</Text>
//         {scanned && <Button title={'Scan again?'} color='tomato' />
//         }
//         {/* {
//         scanned && <Button title={'Verify'}  onPress={()=>navigation.navigate("Isbn",{isbn:text})}  />
//       } */}
//         <TouchableOpacity >
//           <Text style={styles.verify} onPress={() => [navigation.navigate("Isbn", { isbn: text }),  
//           ]}>
//             Check the value
//           </Text>
//           {/* <View>
//           <Isbn isbn={text}/>
//         </View> */}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

// }


// export default Scanner


import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Value } from 'react-native-reanimated';

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet Scanned')
  var {height,width}=Dimensions.get('window')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });
    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const value= /^[0-9]+$/.test(data);
    if(value)
    {
      setText(data)
    }
    else
    {
      setText('Please scan the barcode to search the book..')
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <View >
        <Text style={styles.maintext}>{text}</Text>
        {scanned && <Button title={'Scan again?'} color='coral' onPress={() => setScanned(false)} />}
        <TouchableOpacity >

          <Text style={styles.verify} onPress={() => navigation.navigate("Isbn", { isbn: text })}>
            Check the value
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  maintext: {
    fontSize: 20,
    fontFamily: 'roboto',
    textAlign: 'center',
    marginVertical:30,
    
  },
  barcodebox: {
    marginTop:50,
    alignItems: 'center',
    // justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 40,
  },
  verify:
  {
    color: 'white',
    backgroundColor: '#219ebc',
    // alignItems: 'center',
    marginTop:25,
    paddingVertical: 15,
    paddingHorizontal:20,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 25,   
  }


})