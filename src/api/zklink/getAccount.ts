import { zklink } from '.'

export async function getAccount(account: string) {
  return await zklink('getAccount', [account])
}
