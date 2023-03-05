import { useDispatch } from "react-redux";
import { putBlog } from "./reducers/blogReducer";
import { makeMessage } from "./reducers/messageReducer";

const Details = (props) => {
  const dispatch = useDispatch()
  const updateBlog = () => {
    const newBlog = { ...props.blog };
    newBlog.likes = newBlog.likes + 1;
    dispatch(putBlog(newBlog,props.blog.id))
    dispatch(makeMessage({data:`${props.blog.title} has been liked`,error:false}))
  };
  if (props.blog === undefined){
    return null
  }
  return (
    <div>
      <p className="url">URL: {props.blog.url}</p>
      <p className="Likes">
        Likes: {props.blog.likes}{" "}
        <button className="Liker" onClick={updateBlog}>
          Like
        </button>
      </p>
      <p>{props.blog.user.username}</p>
    </div>
  );
};
export default Details;
