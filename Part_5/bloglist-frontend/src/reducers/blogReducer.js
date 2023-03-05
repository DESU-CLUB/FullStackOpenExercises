import { createSlice } from "@reduxjs/toolkit";
import helper from '../services/blogs'
import { makeMessage } from "./messageReducer";
const initialState = []

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => (a.likes > b.likes ? 0 : 1));
};


const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlog(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return state.concat(action.payload)
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        updateBlog(state, action) {
            const id = action.payload.id
            const newBlog = action.payload.blog
            return sortBlogs(state.map(blog => blog.id === id ? newBlog : blog))
        }
    }
}
)

export const { setBlog, addBlog, deleteBlog, updateBlog } = blogSlice.actions

export const initialiseBlog = () => {
    return async dispatch => {
        try{
        const res = await helper.getAll()
        dispatch(setBlog(res))
        }
        catch(exception){
            if (exception.response.status === 500){
                dispatch(makeMessage({data:"Cannot fetch data",error: true}))
            }
        }
        
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        try {
            const res = await helper.postBlog(blog)
            dispatch(addBlog(res))
        }
        catch (exception) {
            if (exception.response.status === 400) {
                dispatch(makeMessage({ data: "Error: Fields left blank.", error: true }))
            }
            else if (exception.response.status === 401){
                dispatch(makeMessage({data: "Unauthorised User",error: true}))
            }
        }
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await helper.deleteBlog(id)
        dispatch(deleteBlog(id))
    }
}

export const putBlog = (blog, id) => {
    return async dispatch => {
        await helper.updateBlog(blog, id)
        dispatch(updateBlog({ id: id, blog: blog }))
    }
}


export default blogSlice.reducer