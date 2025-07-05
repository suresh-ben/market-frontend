import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND;
const timeoutErrorMessage = 'Could not load the activity, Please try again!'

export default axios.create({
    baseURL:BASE_URL,
    timeout: 100000,
    timeoutErrorMessage: timeoutErrorMessage,
    headers: { 'Content-Type': 'application/json' },
});
