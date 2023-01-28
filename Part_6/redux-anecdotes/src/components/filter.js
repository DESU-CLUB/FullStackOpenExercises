import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) =>{
    
    return(
        <p>Filter: <input type='text' onChange={({target}) => props.setFilter(target.value)}/></p>
    )
}

const mapDispatchToProps = {setFilter}

export default connect(null,mapDispatchToProps)(Filter);