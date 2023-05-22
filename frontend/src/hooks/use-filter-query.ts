// Utility hook for get/set filter queries in various screens
import { isEmpty, omit } from "lodash"
import { useMemo, useCallback } from "react"
import { useNavigate, useLocation, useSearchParams, createSearchParams } from "react-router-dom"

export const useFilterQuery = () => {
  const { hash } = useLocation()

  // URL query parsing
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Example: const dataSpaceVersion = searchParams.get("dataSpaceVersion")?.toString()
  const q = searchParams.get("q")?.toString()
  const status = searchParams.get("status")?.toString()
  const name = searchParams.get("name")?.toString()
  const providerId = searchParams.get("providerId")?.toString()
  const page = searchParams.get("page")?.toString()
  const participant = searchParams.get("participant")?.toString()

  // prepare data filter
  const filters = useMemo(() => {
    const res = {
      // ...(!!dataSpaceVersion ? { dataSpaceVersion } : undefined),
      ...(!!q ? { q } : undefined),
      ...(!!status ? { status } : undefined),
      ...(!!name ? { name } : undefined),
      ...(!!providerId ? { providerId } : undefined),
      ...(!!page ? { page } : undefined),
      ...(!!participant ? { participant } : undefined),
    }

    return res
  }, [searchParams])

  const isEmptyQuery = Object.keys(omit(filters)).every((k) => isEmpty(filters[k]))

  const onFilter = useCallback(
    (newFilters: FilterQuery) => {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          ...newFilters,
        }).toString(),
        hash,
      })
    },
    [location.pathname, hash]
  )

  const resetFilter = useCallback(
    () =>
      navigate({
        pathname: location.pathname,
        search: createSearchParams({}).toString(),
      }),
    [navigate]
  )

  return {
    isEmptyQuery,
    filters,
    onFilter,
    resetFilter,
  }
}
