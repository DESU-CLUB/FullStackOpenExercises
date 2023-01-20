import axios from 'axios'
const baseUrl = '/api/blog'

let token = ''

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)

  const response = await axios.post(baseUrl,newBlog,config)
  return response.data
}

const updateBlog = async (newBlog,id) => {
  const response = await axios.put(`${baseUrl}/${id}`,newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`,config)
  console.log(res)
  return res
}

export default { getAll,setToken,postBlog, updateBlog,deleteBlog }
