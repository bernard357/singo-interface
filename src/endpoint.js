import axios from 'axios'
import bus from '@/event-bus'
import { c11n } from '@/customization'

export const endpoint = axios.create({
  baseURL: c11n.serviceUrl || 'http://127.0.0.1:5000/',
  headers: {'Content-Type': 'application/json'},
  timeout: 1000,
})

export function set_bearer(value) { localStorage.setItem('bearer', value) }

endpoint.interceptors.request.use(config => {
  bus.$emit('begin-transaction')
  config.headers["X-Bearer"] = localStorage.getItem('bearer') || 'no-bearer';
  return config;
})

endpoint.interceptors.response.use(
  response => {
    bus.$emit('end-transaction')
    return response
  },
  error => {
    bus.$emit('end-transaction')
    return Promise.reject(error)
  }
)

export default endpoint
