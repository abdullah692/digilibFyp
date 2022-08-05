import { configureStore } from '@reduxjs/toolkit'
import authreducer from '../store/auth/authSlice'
// import { Bookreducer } from '../store/auth/authSlice'

export const store = configureStore ({
  reducer: 
  { 
    auth: authreducer, 
    // books:Bookreducer
  },
})