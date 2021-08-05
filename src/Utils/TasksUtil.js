import axios from 'axios'

const getAllTasks = () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos")
}

const getTask = (id) => {
    return axios.get("https://jsonplaceholder.typicode.com/todos" + "/" + id)
}

const updateTask = (id, obj) => {
    return axios.put("https://jsonplaceholder.typicode.com/todos" + "/" + id, obj)
}

export default { getAllTasks, getTask, updateTask }