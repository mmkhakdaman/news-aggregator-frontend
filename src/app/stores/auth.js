import {
  createSlice
} from '@reduxjs/toolkit'

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

      state.user = action.payload.user
    },

    logout: (state) => {
      console.log("logout")
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

export default authSlice.reducer
