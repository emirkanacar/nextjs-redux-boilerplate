"use client"

import {createSlice} from "@reduxjs/toolkit";

interface AuthStateInterface {
    user: UserModel | null;
    isAuthenticated: boolean;
}

const initialState: AuthStateInterface = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = action.payload.isAuthenticated
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setAuth, logout} = authSlice.actions;
export default authSlice.reducer;
