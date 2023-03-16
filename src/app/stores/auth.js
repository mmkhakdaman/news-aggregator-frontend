import {
  createSlice
} from '@reduxjs/toolkit'
import { removeToken, setToken } from '../../utils/api';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token')
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      setToken(action.payload.token);
      state.user = action.payload.user
    },

    logout: (state) => {
      console.log("logout")
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      removeToken();
    },

    setUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  login,
  setUser,
  logout
} = authSlice.actions


export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token

export default authSlice.reducer
