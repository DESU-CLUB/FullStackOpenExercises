import { connect } from "react-redux"
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'gainsboro'
  }

  const message = props.message
  if (message!== ''){
  return (
    <div style={style}>
      <p style = {{color: 'green',fontWeight:'bold', fontSize:'20px'}}>{message}</p>
    </div>
  )
  }
}



const mapStatetoProps = (state) =>{
  return {message:state.message.message}
}

export default connect(mapStatetoProps)(Notification)