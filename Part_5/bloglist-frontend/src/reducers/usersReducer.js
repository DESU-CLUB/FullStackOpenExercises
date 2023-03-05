/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import helper from '../services/users'
import { makeMessage } from "./messageReducer";
const initialState = []
const usersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        setUsers(state, action) {
            console.log(action.payload)
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initialiseUsers = () => {
    return async dispatch => {
        try {
            const res = await helper.getUsers()
            dispatch(setUsers(res))
        }
        catch (exception) {
            console.log(exception)
            if (exception.response.status === 500) {
                dispatch(makeMessage("User data cannot be loaded"))
            }
        }
    }
}

export default usersSlice.reducer