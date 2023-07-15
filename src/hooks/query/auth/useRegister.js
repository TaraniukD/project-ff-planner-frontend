import { useMutation } from '@tanstack/react-query'
import { register } from '../../../api'
import { queryKeys } from '../queryKeys'
import { useTranslation } from 'react-i18next'
import { handleRequestError, handleRequestSuccess } from '../../../utils/notifications'

export const useRegister = (onSuccess) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.register],
    mutationFn: register,
    onError: handleRequestError,
    onSuccess: () => {
      handleRequestSuccess(t('We send a verify letter to your email!'))
      onSuccess?.()
    },
  })

  return {
    register: ({ password, name, email }) => mutate({ password, name, email }),
    isLoading,
  }
}
