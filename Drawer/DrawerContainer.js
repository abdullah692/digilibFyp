
import React,{useState,useEffect} from 'react';
import { StyleSheet, Image, View ,ScrollView, Dimensions} from 'react-native';
import ContactUs from '../Components/Contact_Screens/ContactUs'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackUserProfile, StackRegisteration, StackContact } from './Stacks';
import CustomDrawer from './CustomDrawer';
import MyTabs, { AboutTabs, ContactTabs,ScannerTab,UserProfileTabs } from './TabNavigator';
import { HomeTabs } from './TabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../Components/User_Profile/UserProfile';
import Contact from '../Components/Contact_Screens/ContactUs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/Ionicons';
import Icns from 'react-native-vector-icons/AntDesign';
import {updateToken} from "../store/auth/authSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Drawer = createDrawerNavigator();


export default function DrawerContainer() {
  const userToken = useSelector((state) => state.auth.userToken)
  var {width,height}=Dimensions.get('window')
  const dispatch=useDispatch();

  const UpdateTokenHandle=async()=>{
   let token=await AsyncStorage.getItem('token')

   if(token)
   {
    dispatch(updateToken(token))
   }

  }

  useEffect (()=>{
    UpdateTokenHandle();
  },[])

  function HeaderImage() {
    return (
      <View style={styles.header}>
        <Image style={{ width: 150, height: 50, marginHorizontal: 55 }} source={
          require('../assets/digilib.jpeg')} resizeMode="contain" />
      </View>
    )
  }

  return (
    // <ScrollView>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor:'#74b1e0',
        drawerActiveTintColor:'#fff',
        // drawerInactiveTintColor:'#333'
      }}
      >
      <Drawer.Screen name="Home" component={HomeTabs} options={{ headerTitle: () => (<HeaderImage />) ,
      drawerIcon:({color})=>(<Icons name='home-outline' color={color} size={22}/>)
      }} />
      <Drawer.Screen name="Registration" component={StackRegisteration} options={{ headerTitle: () => (<HeaderImage />),
    drawerIcon:({color})=>(<Icon name='file-text-o' color={color} size={22}/>)
    }} />
      <Drawer.Screen name="About Us" component={AboutTabs} options={{ headerTitle: () => (<HeaderImage />),
    drawerIcon:({color})=>(<Icons name='people-outline' color={color} size={22}/>)
    }} />
      <Drawer.Screen name="Contact Us" component={ContactTabs} options={{ headerTitle: () => (<HeaderImage />),
    drawerIcon:({color})=>(<Icon name='phone' color={color} size={22}/>)
    }} />
      {/* <Drawer.Screen name="Bar Code Scanner " component={ScannerTab} options={{ headerTitle: () => (<HeaderImage />) }} /> */}
     {userToken && 
      <Drawer.Screen name="User Profile" component={UserProfile} options={{ headerTitle: () => (<HeaderImage />) ,
      drawerIcon:({color})=>(<Icon name='user-o' color={color} size={22}/>)
    }} />
     }
     
    </Drawer.Navigator>
    // </ScrollView>

  );
}
const styles = StyleSheet.create({
  header:
  {
    flex: 1,
    flexDirection: 'row'
  }
})
