import { createSlice } from "@reduxjs/toolkit"


const initialState = {message:'',timeoutID:''}

const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            console.log(action.payload)
            if (state.timeoutID !== ''){
                clearTimeout(state.timeoutID)
            }
            state = {timeoutID:'', message: action.payload}
            return state
        },
        removeMessage(state,action){
            return {...state,message: ''}
        },
        setTimeID(state,action){
            return {...state, timeoutID: action.payload}
        }
    }
}
)

export const { setMessage,removeMessage,setTimeID } = messageReducer.actions
export default messageReducer.reducer

export const setNotification = (message,time) =>{
    return dispatch =>{

        dispatch(setMessage(message))
        const timeID = setTimeout(() =>{dispatch(removeMessage())},time*1000)
        dispatch(setTimeID(timeID))

    }
}
