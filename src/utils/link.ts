import { Provider } from 'zklink-js-sdk'

export const createLinkProvider = async (): Promise<Provider> => {
  return await Provider.newHttpProvider(import.meta.env.VITE_APP_ZKLINK_ENDPOINT, 10000)
}

export let provider: Provider
export const providers: Provider[] | false[] = []

export const getLinkProvider = async (): Promise<Provider> => {
  if (provider) {
    return provider
  }
  provider = await createLinkProvider()
  return provider
}
