import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer";
import { BrowserRouter as Router } from 'react-router-dom'
import usersReducer from "./reducers/usersReducer";
const store = configureStore({
    reducer:
    {
        message: messageReducer,
        blog: blogReducer,
        user: userReducer,
        users: usersReducer
    }
})
console.log(store)
ReactDOM.createRoot(document.getElementById("root"))
    .render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
