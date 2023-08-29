
export const encryptionAddress = (address: string, start = 6, end = 4) => {
  if (!address) {
    return ''
  }
  return `${address.substr(0, start)}...${address.substr(-end)}`
}

export function isGasAddress(tokenAddress: string): boolean {
  if (!tokenAddress) {
    return false
  }
  return (
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase() ===
    tokenAddress.toLowerCase()
  )
}

export const AddressZero = '0x0000000000000000000000000000000000000000'

export function isZeroAddress(tokenAddress: string): boolean {
  if (!tokenAddress) {
    return false
  }
  return AddressZero === tokenAddress
}