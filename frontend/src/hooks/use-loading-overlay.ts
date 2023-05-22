import { setLoading } from "@/redux/loading"
import { RootState } from "@/redux/store"
import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useLoadingOverlay = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: RootState) => state.ui)

  const showLoading = useCallback(
    (show?: boolean, withWarning?: boolean) => {
      dispatch(setLoading({ isLoading: !!show, withWarning }))
    },
    [dispatch]
  )

  // re-memo
  return useMemo(
    () => ({
      isLoading,
      showLoading,
    }),
    [dispatch, showLoading]
  )
}
