import axios from "axios";

const api = axios.create({
    baseURL: 'https://ba94-2804-3d90-8011-2c01-b900-db6f-603f-319f.sa.ngrok.io/'
})

export { api };