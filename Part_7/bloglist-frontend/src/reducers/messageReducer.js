import { createSlice } from "@reduxjs/toolkit";

const initialState = {message:'',tid:'',error:true}


const messageSlice = createSlice({
    name:'Message',
    initialState,
    reducers:{
        addMessage(state,action){
            if (state.tid !== ''){
                clearTimeout(state.tid)
            }
            console.log(action)
            return {...state,message:action.payload.data,error:action.payload.error}
        },
        // eslint-disable-next-line no-unused-vars
        removeMessage(state,action){
            console.log(action)
            return {...state,message:''}

        },
        addTimeout(state,action){
            console.log(action)
            return {...state,tid : action.payload}
        }
    }
})


export const {addMessage,removeMessage,addTimeout} = messageSlice.actions
export const makeMessage = (message) =>{
    return dispatch =>{
        dispatch(addMessage(message))
        const tid = setTimeout(()=>{dispatch(removeMessage())},5000)
        dispatch(addTimeout(tid))
    }
}

export default messageSlice.reducer;