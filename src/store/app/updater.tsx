import { useEffectOnce } from 'usehooks-ts'
import { useSupportChainsStore } from './chains'
import { useContractsStore } from './contracts'
import { useSupportTokensStore } from './tokens'

function useFetchSupportChains() {
  const { fetch } = useSupportChainsStore()

  useEffectOnce(() => {
    fetch()
  })
}

function useFetchSupportTokens() {
  const { fetch } = useSupportTokensStore()

  useEffectOnce(() => {
    fetch()
  })
}

function useFetchContracts() {
  const { fetch } = useContractsStore()

  useEffectOnce(() => {
    fetch()
  })
}

const Updater = () => {
  useFetchSupportChains()
  useFetchSupportTokens()
  useFetchContracts()

  return null
}

export default Updater
