import { useMemo } from 'react'
import { breakpoints } from 'styles/Themes'
import { useWindowSize } from 'usehooks-ts'

const { md } = breakpoints.values!
function useResize() {
  const windowSize = useWindowSize()
  return useMemo(() => {
    return {
      innerHeight: windowSize.height,
      innerWidth: windowSize.width,
      isMobile: windowSize.width <= md,
    }
  }, [windowSize])
}
export default useResize
