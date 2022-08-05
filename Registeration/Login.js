import { createStackNavigator } from '@react-navigation/stack';
import React, { useState ,useContext,useReducer} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image,Dimensions } from 'react-native';
import Error from './Error';
import {signIn} from '../store/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { IP, PORT } from '../constant';

// import Register from './Register';

function Login(props) {
  const { navigation } = props;
  const [portal_Id, setPortal] = useState('');
  const [error, setError] = useState('');
  const [Password, setPassword] = useState('');
  const [allEntry, setAllEntry] = useState([]);
  const userToken = useSelector((state) => state.auth.userToken)
  const dispatch = useDispatch()
  var {width,height}=Dimensions.get('window'); 

  
  // const userDetail = {
  //   portal_id: "4103149",
  //   password: 'admin12345'
  // }

 

  // const loggedIn = (portal,password) => {
  //   const users = {
  //     portal: portal_id,
  //     password: Password
  //   };

    const loggedIn = (portal, password) => 
    {
      const user = {
        StudentId: portal_Id,
        // registrationType: picker,
      };

    if (portal === '' && password === '') {
      setError('Please fill your Credentials');
    }
    else if (portal === '') {
      setError('Please Enter Your Portal-Id');
    }
    else if (password === '') {
      setError('Please Enter Your Password')
    }
    // else (password && portal)
    // {
    //   setAllEntry([users, ...allEntry])

    //   console.log(users);
    //   console.log(allEntry);
    //   console.log('Success..!!');
    // }
    else {
      setError('');
      let body = {
        StudentId: parseInt(portal),
        password: password,
      };
      axios
        .post(`http://${IP}:${PORT}/api/signIn`, body)
        .then(res => {
          console.log('Api Respones ====', res.data);
          const result = res.data;
          if (result.success) {
            dispatch(signIn({result}));
            navigation.navigate('Home') || navigation.popToTop();
          } else {
            return alert('Invalid request');
          }
        })
        .catch(err => console.log(err));
    }

//     console.log(portal,password);
//     if(!error)
//     {
//       dispatch(signIn({portal,password}));
//       console.log("In login component Token",userToken);
//      if(userToken)
//      { 
//        navigation.navigate('Home') || navigation.popToTop(); 
//      }
    
// }

  // const handleNext = () => {
  //   handleSubmit();
  //   if(portal_id.length != 0 && Password.length !=0)
  //   {
  //     loggedIn(portal_id,Password);
  //   }
    

    // // loggedIn(portal.portal ,password.password)
    // // {
    // //   navigation.navigate('Home') || navigation.popToTop();
    // // }
  };


  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image style={{ width: width, height: height/6 }} source={
          require('../assets/fyplogo.png')} resizeMode="contain" />
      </View>
      <Text style={styles.register}>WELCOME BACK!</Text>

      <TextInput
        style={styles.text}
        placeholder="Portal_Id"
        value={portal_Id}
        keyboardType="decimal-pad"
        onChangeText={id => setPortal(id.toLowerCase())}
      />

      <TextInput
        style={styles.text}
        placeholder="Password"
        secureTextEntry={false}
        value={Password}
        onChangeText={pass => setPassword(pass.toLowerCase())}
      />
      <View style={styles.error}>
        {error ? <Error message={error} /> : null}
      </View>

      {/* <View style={[{marginTop: 40}, styles.btn]}>
          <Text style={styles.middle}>Don't have any account yet?</Text>
          <Button title="Register"/>
        </View> */}
      <TouchableOpacity onPress={() => loggedIn(portal_Id,Password)}>
        <Text style={styles.btn}> NEXT </Text>
      </TouchableOpacity>
      <View style={styles.forget}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text style={{color:'#74b1e0'}}>Create Account</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal:10}}>|   Forget Password</Text>
      </View>
    </View>
  );
}

export default Login ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:
  {
    marginTop: -120,
  },
  register: {
    fontSize: 30,
    margin: 10,
    color: '#000'
  },
  text: {
    borderBottomWidth: 2,
    margin: 10,
    marginVertical: 10,
    padding: 10,
    width: 250,
    borderColor: '#74b1e0',
    color: '#000'
  },
  error: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn:
  {
    fontSize: 25,
    borderRadius: 5,
    backgroundColor: '#74b1e0',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20

  },
  // middle: {
  //   margin: 10,
  //   textAlign: 'center',
  // },
  // border:
  // {
  //   borderColor: '#0F9E90',
  //   borderWidth: 2,
  //   marginVertical: 30
  // },
  picker:
  {
    width: 250,
    height: 50,
    alignItems: 'center',
    color: '#000'
  },
  forget:
 {  
   flexDirection:'row'
 }
});
