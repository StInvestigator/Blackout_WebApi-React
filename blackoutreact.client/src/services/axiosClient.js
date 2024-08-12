import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: 'https://localhost:7238',
    //baseURL: 'https://api.quiz.com',
    responseType: 'json',
    withCredentials: false,
    headers: {
        'mode': 'no-cors',
        'Content-Type': "application/json",
        'Accept': "application/json",
    }
})


const tokenKey = "user_token"

export const authorizeAxios = () => {
    axiosClient.interceptors.request.use(config => {
        let token = localStorage.getItem(tokenKey)
        config.headers["Authorization"] = `Bearer ${token}`
        return config
    }, error => Promise.reject(error))
}

export const saveToken = token => localStorage.setItem(tokenKey, token)
export const clearToken = () => localStorage.removeItem(tokenKey)

export const isAuthorized = () => localStorage.getItem(tokenKey) !== null

export const initAxios = async () => {
    if (isAuthorized()) {
        authorizeAxios()
    }
}