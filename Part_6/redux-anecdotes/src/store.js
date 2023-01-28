import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import filterReducer from "./reducers/filterReducer";
console.log(messageReducer,anecdoteSlice)


const store = configureStore({
    reducer: {anecdotes: anecdoteSlice, message: messageReducer, filter: filterReducer},
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

console.log(store.getState())

export default store