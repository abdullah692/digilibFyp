import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'

const UpdatePassword = () => {
    const {navigation, route} = props;
    const [user, setUser] = useState(route.params || {});
    const [Udpassword, setUdPassword] = useState('');
    const [cnfrmPassword, setCnfrmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [allEntry, setAllEntry] = useState([]);
    
    const handleSubmit = () => {
      const body = {...user};
      body.password = password;
      
      if (Udpassword === '' && cnfrmPassword === '') {
        setError('Please ! Enter your Password');
      } else if (Udpassword != cnfrmPassword) {
        setError('The Password you enter is not matched');
      } else 
      { 
        axios
      .post(`http://${IP}:${PORT}/api/setPassword`, body)
      .then(res => {
        setUdPassword('');
        setCnfrmPassword('');
        setError('');
        setShowPass(false);
        const result = res.data;
        if (!result.success) return setError('Invalid request');
      })
      .catch(err => console.log(err));
        navigation.navigate('Welcome') 
        
        console.log("Password body", body)
    }
      
    };
    const handleNext = () => {
      handleSubmit();
      // navigation.navigate('Welcome')
    };
  
  return (
    <View>
       <View style={styles.container}>
      <View style={styles.logo}>
          <Image style={{ width:width, height:height/6 }} source={
                        require('../assets/lock.png') } resizeMode="contain" />
            </View>
      <TextInput
        style={styles.text}
        placeholder="Enter Password"
        secureTextEntry={!showPass}
        value={Udpassword}
        onChangeText={id => setUdPassword(id.toLowerCase())}
      />
      <TextInput
        style={styles.text}
        placeholder="Confirm Password"
        secureTextEntry={!showPass}
        value={cnfrmPassword}
        onChangeText={id => setCnfrmPassword(id.toLowerCase())}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={showPass}
          onValueChange={setShowPass}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Password {showPass ? 'Hide' : 'Show'}?</Text>
      </View>
      {/* <CheckBox value={showPass} onValueChange={setShowPass} /> */}

      <View style={styles.error}>
        {error ? <Error message={error} /> : null}
        <TouchableOpacity onPress={() => handleNext()}>
        <Text style={styles.btn}> SUBMIT </Text>
      </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default UpdatePassword

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width:width,
      height:height
    },
    error: {
      alignItems: 'center',
      marginTop: 50,
    },
    btn:
      {
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: '#74b1e0',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom:10
      },
      logo:
    {
      // marginTop: 20,
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
    checkboxContainer: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    checkbox: {
      alignSelf: 'center',
      
    },
    label: {
      margin: 8,
    },
  });
  


