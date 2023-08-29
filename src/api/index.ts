
import axios from "axios";


const api = axios.create({
  headers: {},
})


api.interceptors.response.use(
  (response) => {
    return response.data
  }
)

export default api
