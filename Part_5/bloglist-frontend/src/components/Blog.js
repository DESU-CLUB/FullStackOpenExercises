import { useState } from "react";
import {useDispatch } from "react-redux";
import { removeBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
const Blog = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const deletion = () => {
    dispatch(removeBlog(props.blog.id))
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const label = visible ? "Hide" : "Show";
  const detailStyle = { display: visible ? "" : "none" };
  return (
    <div className="Fixed" style={blogStyle}>
      <div className="Shown">
        <Link key = {props.blog.id} to = {`/blog/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
        <button onClick={handleVisibility} className="Joe">
          {label}
        </button>
      </div>
      <div className="Hidden" style={detailStyle}>
        {props.children}
        <button className="deleter" onClick={deletion}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
