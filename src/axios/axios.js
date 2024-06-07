import axios from "axios"

const instance = axios.create({
    baseURL: "https://blog-backend-bzm8.onrender.com/api/v1",
    withCredentials:true,
})

export default instance;