import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.message)
  const label = message.error ? "red" : "green";
  const styled = {
    color: label,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  console.log(message.message,message)
  if (message.message !== "") {
    return (
      <h1 id="message" style={styled}>
        {message.message}
      </h1>
    );
  }
};

export default Notification;
