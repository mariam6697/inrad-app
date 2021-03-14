import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

export default axios.create({
    baseURL: "https://inrad-api.musicmania.cl/api/",
    headers: {
        "Content-type": "application/json"
    }
});
