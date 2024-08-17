import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    guest: false
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) =>{
            state.status = true;
        },
        logout: (state) =>{
            state.status = false;
        },
        user: (state) =>{
            state.status = true;
        },
        guestuser: (state) =>{
            state.guest = true;
        },
        removeguest: (state) =>{
            state.guest = false;
        },
    },
})
export default authSlice.reducer;
export const {login, logout, user, guestuser, removeguest} = authSlice.actions;