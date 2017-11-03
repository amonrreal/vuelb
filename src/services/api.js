import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { Authorization: 'Token 34db0eff45a0dfcd5effb47d77291e200f51c4e8' }
})

export default api
