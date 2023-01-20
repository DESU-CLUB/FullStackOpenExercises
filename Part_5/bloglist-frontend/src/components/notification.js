const Notification = ({ msg, isError }) => {
  const label = isError?'red':'green'
  const styled = { color:label, background: 'lightgrey',fontSize: '20px',borderStyle:'solid',borderRadius:'5px',padding:'10px',marginBottom:'10px' }
  if (msg !== ''){
    return(
      <h1 id = 'message' style={styled}>{msg}</h1>
    )

  }
}

export default Notification