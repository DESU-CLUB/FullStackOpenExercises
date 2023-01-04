import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll= ()=>{
    const response = axios.get(baseUrl)
    return response.then(response =>response.data)
    
}

const create = (obj) =>{
    const response = axios.post(baseUrl,obj)
    return response.then(response => response.data)
}

const update = (id,obj) =>{
    const response = axios.put(`${baseUrl}/${id}`,obj)
    return response.then(response => response.data)
}

const del = (id) =>{
    const response = axios.delete(`${baseUrl}/${id}`)
    return response
}

export default {getAll,create,update,del}