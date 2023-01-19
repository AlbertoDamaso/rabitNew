import axios from "axios";

const api = axios.create({
    baseURL: 'https://44d8-2804-3d90-8011-2c01-9485-1185-631a-7105.sa.ngrok.io'
})

export { api };