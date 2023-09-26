import axios from 'axios'
import { Signature } from 'zklink-js-sdk'

export async function repeater(data: {
  id: number
  jsonrpc: '2.0'
  method: 'sendTransaction'
  params: [any, any, Signature]
}) {
  return axios
    .post('/api-v1/api/layer2/repeater/admin', data, {
      baseURL: import.meta.env.VITE_ZKEX_ENDPOINT,
    })
    .then((r) => r.data)
}
