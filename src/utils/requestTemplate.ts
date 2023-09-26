import { SignedTransaction } from 'zklink-js-sdk'

export function getRequestBody(signedTransaction?: SignedTransaction) {
  if (!signedTransaction) {
    return ''
  }
  return `
    {
      "id": 1,
      "jsonrpc": "2.0",
      "method": "sendTransaction",
      "params": [
        ${JSON.stringify(signedTransaction!.tx)},
        ${
          signedTransaction?.ethereumSignature
            ? JSON.stringify(signedTransaction?.ethereumSignature)
            : 'null'
        },
        null
      ]
    }
  `
}
export function getCurlTemplate(signedTransaction?: SignedTransaction) {
  if (!signedTransaction) {
    return ''
  }
  return `
    curl -X POST --location 'http://127.0.0.1:3030'
    --header 'Content-Type:application/json'
    --data '${getRequestBody(signedTransaction)}'
  `
}
