import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/auth/authSlice';
import Icons from 'react-native-vector-icons/FontAwesome';

export default function CustomDrawer(props) {
    const dispatch = useDispatch()
    const userToken = useSelector((state) => state.auth.userToken)
    const {height,width}=Dimensions.get('window')
    return (
        <View style={{ flex: 1}}>
            <DrawerContentScrollView {...props}>
        
        <View style={{flex:1,alignItems:'center'}}>
                <Image style={{ width: width/1.5, height:height/8}}
                    source={
                        require('../assets/abdulkalam.png')} resizeMode="contain" />
                        </View>
                <DrawerItemList {...props}  />
                </DrawerContentScrollView>
                <View style={{padding:25}}>
                    {
                        userToken &&
                        <View style={{paddingVertical:20}}>
                            <View style={styles.logout}>
                            <Icons name='sign-out' size={27} />
                            <Text onPress={() => dispatch(signOut())} style={{ fontSize: 20 }}> Logout</Text>
                            </View>
                        </View>
                    }

                </View>


            
        </View>
    );
}

const styles = StyleSheet.create({
    logout:
    {
        flexDirection:'row',
        marginTop:-60
        
        // marginTop: '100%',
        // marginHorizontal: 20
    }
})