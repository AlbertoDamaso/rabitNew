import axios from "axios";

const api = axios.create({
    baseURL: 'https://66c6-2804-3d90-8011-2c01-e07e-684-6aac-992a.sa.ngrok.io'
})

export { api };