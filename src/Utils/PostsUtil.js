import axios from 'axios'

const getAllPosts = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts")
}

const getPost = (id) => {
    return axios.get("https://jsonplaceholder.typicode.com/posts" + "/" + id)
}

export default { getAllPosts, getPost }