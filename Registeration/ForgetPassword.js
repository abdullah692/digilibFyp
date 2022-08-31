import { View, Text,TouchableOpacity, Image ,StyleSheet,Dimensions,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { IP, PORT } from '../constant';



const ForgetPassword = (props) => {
    const { navigation } = props;
  const [portal_Id, setPortal] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [allEntry, setAllEntry] = useState([]);
//   const userToken = useSelector((state) => state.auth.userToken)
//   const dispatch = useDispatch()
  var {width,height}=Dimensions.get('window'); 

  const loggedIn = (portal, email) => 
  {
    console.log('Portal',portal)
    console.log('Eamil',email)
    const user = {
      StudentId: portal_Id,
      action:'resetPassword'  
      // registrationType: picker,
    };

  if (portal === '' && email === '') {
    setError('Please fill your Credentials');
  }
  else if (portal === '') {
    setError('Please Enter Your Portal-Id');
  }
  else if (email === '') {
    setError('Please Enter Your Email')
  }
  else {
    setError('');
    let body = {
      StudentId: parseInt(portal),
      email: email,
    };
    console.log('Portal Id',body)
    console.log('User',user)
    axios
      .post(`http://${IP}:${PORT}/api/verifyEmail`, body)
      .then(res => {
        console.log('Api Respones ====', res.data);
        const result = res.data;
        if (result.success) {
        //   dispatch(signIn({result}));
        //   navigation.navigate('Home') || navigation.popToTop();
        navigation.navigate('Registration',{screen:"Otp", params:user});
        } else 
        {
          return alert('Invalid request');
        }
      })
      .catch(
        console.log(err)
      );
  }
  }


  return (
    
       <View style={styles.container}>

<View style={styles.logo}>
  <Image style={{ width: width, height: height/7 }} source={
    require('../assets/fyplogo.png')} resizeMode="contain" />
</View>
<Text style={styles.register}>EMAIL VERIFICATION!</Text>
<TextInput
  style={styles.text}
  placeholder="Portal_Id"
  value={portal_Id}
  keyboardType="decimal-pad"
  onChangeText={id => setPortal(id.toLowerCase())}
/>

<TextInput
  style={styles.text}
  placeholder="Email"
  secureTextEntry={false}
  value={email}
  onChangeText={email => setEmail(email.toLowerCase())}
/>
<View style={styles.error}>
  {error ? <Error message={error} /> : null}
</View>

{/* <View style={[{marginTop: 40}, styles.btn]}>
    <Text style={styles.middle}>Don't have any account yet?</Text>
    <Button title="Register"/>
  </View> */}
<TouchableOpacity  onPress={()=>loggedIn(portal_Id,email)}>
  <Text style={styles.btn}> NEXT </Text>
</TouchableOpacity>
<View style={styles.forget}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text>Remember Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
        <Text style={{marginHorizontal:10,color:'#74b1e0'}}>|   Login</Text>
        </TouchableOpacity>
      </View>
</View>

    
  )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:
    {
      marginTop: -30, 
      marginBottom:30
    },
    register: {
      fontSize: 25,
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
      fontSize: 20,
      borderRadius: 5,
      backgroundColor: '#74b1e0',
      color: '#fff',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 40
  
    },
    forget:
    {  
      flexDirection:'row'
    }
//     picker:
//     {
//       width: 250,
//       height: 50,
//       alignItems: 'center',
//       color: '#000'
//     },
//     forget:
//    {  
//      flexDirection:'row'
//    }
  });
  