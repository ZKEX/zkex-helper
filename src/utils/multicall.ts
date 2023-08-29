import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import MulticallAbi from './abis/multicall.json'

export const sendMulticall = async (
  provider: Web3Provider,
  contractAddress: string,
  abi: string[],
  functionName: string,
  callAddresses: string[],
  calls: string[]
) => {
  try {
    const iface = new Interface(abi)
    const fragment = iface.getFunction(functionName)
    const contract = new Contract(contractAddress, MulticallAbi, provider)
    const tx = await contract.multiStaticCall(callAddresses, calls)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_blockNumber, returnDatas] = tx
    return returnDatas.map(
      (
        data: {
          success: boolean
          returnData: string
        },
        _index: number
      ) => {
        const decodeData = iface.decodeFunctionResult(fragment, data.returnData)
        return decodeData[0]
      }
    )
  } catch (e) {
    return []
  }
}
