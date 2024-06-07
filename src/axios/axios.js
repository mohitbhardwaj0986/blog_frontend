import axios from "axios"

const instance = axios.create({
    baseURL: "https://render.com/docs/web-services#port-binding/api/v1",
    withCredentials:true,
})

export default instance;