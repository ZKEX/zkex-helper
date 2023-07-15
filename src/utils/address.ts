
export const encryptionAddress = (address: string, start = 6, end = 4) => {
  if (!address) {
    return ''
  }
  return `${address.substr(0, start)}...${address.substr(-end)}`
}