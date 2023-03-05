import Toggleable from "./Toggleable";
import Noteform from "./NoteForm";
import {  useSelector } from "react-redux";
import { useRef } from "react";
import Blog from "./Blog";
import Details from "../Details";

const Home = () => {
    const user = useSelector(state => state.user.username)
    const blogs = useSelector(state => state.blog)
    const blogFormRef = useRef(null);
    if (!user) {
        return null
    }

    const noteform = () => (
        <Toggleable buttonLabel="Show form" ref={blogFormRef}>
            <Noteform />
        </Toggleable>
    );


 
    return (
        <div>
            <div>               
                {noteform()}
            </div>
            <div className="blogs">
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog}>
                        <Details blog={blog} />
                    </Blog>
                ))}
            </div>
        </div>
    )
}

export default Home