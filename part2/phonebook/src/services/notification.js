const Notification = ({message,error}) =>{
    if (message === null){
        return null;
    }
    else{
        return( <div style ={{
            color: error?'red':'green',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        }}>
            {message}
            </div>
        )
    }
}

export default Notification;