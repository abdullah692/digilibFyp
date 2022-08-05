import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books:[],
  userName: null,
  userToken: null,
  
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      // setUserToken('aassd');
      // setLoading(false);
      console.log('In signIn reducer', action.payload, state)
      state.userToken = action.payload?.result?.token;
      AsyncStorage.setItem('token', action.payload?.result?.token)
      // if (action.payload.portal === '4103149' && action.payload.password === 'pass12345') {
      //   state.userToken = 'aasd'
      //   AsyncStorage.setItem('token', state.userToken)
      // }
      // else {

      //   alert("Credentials are not Correct");
      // }
    },
    signOut: (state) => {
      state.userToken = null
      AsyncStorage.removeItem('token')

    },
    bookApis: (state,payload) => {
      state.books=payload;
    },
    updateToken:(state, action)=>{
      state.userToken = action.payload;
      console.log('Update token Reducer',action.payload)


    }

    //   signUp:()=>{
    //     setUserToken('aassd');
    //     setLoading(false);
    //   },
  }
})

// export const bookSlice=createSlice({
//   name:'books',
//   initialState,
//   reducers:{
//     bookApis: (state, payload) => {
//       state.books =payload;
//     }
//   }
// })

// const Authreducer=authSlice.reducer;
// const Bookreducer=bookSlice.reducer;
// Action creators are generated for each case reducer function
export const { signIn, signOut,bookApis,updateToken} = authSlice.actions
// export const {bookApis} = bookSlice.actions
// export  {Authreducer ,Bookreducer};
export default authSlice.reducer;
