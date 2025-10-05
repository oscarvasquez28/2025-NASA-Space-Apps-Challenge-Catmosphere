import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_FRONTEND_API_URL}/api`
})

api.interceptors.request.use((config) => {

  const contentType = config.headers['Content-Type']
  if (contentType === 'multipart/form-data') {
    config.headers['Content-Type'] = 'multipart/form-data'
  } else {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
},
(error) => {
  return Promise.reject(error)
})

export default api