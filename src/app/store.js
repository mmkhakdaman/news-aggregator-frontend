import {
  configureStore
} from '@reduxjs/toolkit'
import authReducer from './stores/auth'

export default configureStore({
  reducer: {
    auth: authReducer,
  }
})
