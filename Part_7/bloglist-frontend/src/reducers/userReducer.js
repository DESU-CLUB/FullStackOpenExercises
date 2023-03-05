/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {username:null}
const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        addName(state,action){
            console.log(action.payload)
            return {username: action.payload}
        }
    }
})

export const {addName} = userSlice.actions
export default userSlice.reducer