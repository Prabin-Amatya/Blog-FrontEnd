import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (new_token) =>{
    console.log(new_token)
  token = `Bearer ${new_token}`
}

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newBlog) =>{
    const config = {
        headers:{ Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = (id, newBlog) =>{
    const config = {
        headers:{ Authorization: token }
    }
    
    console.log(config)

    const request = axios.put(`${baseUrl}/${id}`, newBlog, config)
    return request.then(response => response.data)
}

const remove = async (id) =>{
    const config = {
        headers:{ Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}

const checkValid = async() =>{
    const config = {
        headers:{ Authorization: token }
    }
    
    await axios.get(`/api/info/checkValid`, config)
}

export default {getAll, create, setToken, update, remove, checkValid}