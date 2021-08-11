import axios from 'axios'

const getAllPosts = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts")
}

const getPost = (id) => {
    return axios.get("https://jsonplaceholder.typicode.com/posts" + "/" + id)
}

const addPost = (obj) => {
    return axios.post("https://jsonplaceholder.typicode.com/posts", obj)
}

export default { getAllPosts, getPost, addPost }