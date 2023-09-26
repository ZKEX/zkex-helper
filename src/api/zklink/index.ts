import axios from 'axios'

export async function zklink(method: string, params: any[]) {
  return axios
    .post(import.meta.env.VITE_ZKLINK_ENDPOINT, {
      id: 0,
      jsonrpc: '2.0',
      method,
      params,
    })
    .then((r) => r.data)
}
