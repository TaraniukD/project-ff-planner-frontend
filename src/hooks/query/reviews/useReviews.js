import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../queryKeys'
import { toReview } from '../mappers'
import { getReviews } from '../../../api/'
import { useAuthContext } from '../../../contexts/auth'
import { handleRequestError } from '../../../utils/notifications'

export const useReviews = (filterBy = 'best') => {
  const { logger } = useAuthContext()

  const id = logger?.id ?? ''

  const { isLoading, data: reviews = [] } = useQuery(
    [queryKeys.getReviews, filterBy, id],
    () => getReviews({ filterBy, ownerId: id }),
    {
      onError: handleRequestError,
      select: (res) => res.data.map(toReview),
      enabled: filterBy === 'owner' ? !!id : true,
    },
  )

  return { isLoading, reviews }
}
