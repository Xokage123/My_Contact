import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload
    }
  }
})

export const { setIsAuth } = authSlice.actions

export default authSlice.reducer