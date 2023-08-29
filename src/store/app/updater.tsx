import { useEffectOnce } from "usehooks-ts"
import { useAppDispatch } from ".."
import { getAppTokensAction, getContractsAddressAction, getFullNetworkAction, getSupportNetworkAction } from "./actions"

const useAppInfo = () => {
  const dispatch = useAppDispatch()

  useEffectOnce(() => {
    dispatch(getSupportNetworkAction())
    dispatch(getFullNetworkAction())
    dispatch(getContractsAddressAction())
    dispatch(getAppTokensAction())
  })
}

const Updater = () => {

  useAppInfo()

  return null
}

export default Updater