import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

export default axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    headers: {
        "Content-type": "application/json"
    }
});
