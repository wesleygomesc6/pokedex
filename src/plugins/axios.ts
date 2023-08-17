import axios from 'axios'

const $axios = axios.create({
  //withCredentials: true,
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

export default $axios;