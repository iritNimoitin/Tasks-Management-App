import axios from 'axios'

const getAllUsers = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}

const getUser = (id) => {
    return axios.get("https://jsonplaceholder.typicode.com/users" + "/" + id)
}

const addUser = (obj) => {
    return axios.post("https://jsonplaceholder.typicode.com/users", obj)
}

const updateUser = (id, obj) => {
    return axios.put("https://jsonplaceholder.typicode.com/users" + "/" + id, obj)
}

const deleteUser = (id) => {
    return axios.delete("https://jsonplaceholder.typicode.com/users" + "/" + id)
}

export default { getAllUsers, getUser, addUser, updateUser, deleteUser }