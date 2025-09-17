import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL || ''

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// Basic retry for transient errors
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const config = error.config || {}
    if (!config.__retryCount) config.__retryCount = 0
    const status = error.response?.status
    const retriable = !status || (status >= 500 && status < 600)
    if (retriable && config.__retryCount < 2) {
      config.__retryCount++
      await new Promise((r) => setTimeout(r, 300 * config.__retryCount))
      return api(config)
    }
    return Promise.reject(error)
  }
)

export default api
