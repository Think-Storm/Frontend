import { usePost } from '@/helpers/reactQuery'
import { apiRoutes, url } from '@/utils/apiRoutes'

export const useRegister = <T, S>(
  updater?: (oldData: T | undefined, newData: S) => T | undefined,
) => usePost<T, S>({ url: `${url.base}${apiRoutes.register}`, updater })
