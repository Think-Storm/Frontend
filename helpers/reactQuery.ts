import {
  useQueryClient,
  useMutation,
  QueryFilters,
} from '@tanstack/react-query'

interface MutationContext<T> {
  previousData?: T
}

const useGenericMutation = <T, S>(
  func: (data: T) => Promise<S>,
  url: string,
  params?: object,
  updater?: (oldData: T | undefined, newData: S) => T | undefined,
) => {
  const queryClient = useQueryClient()

  return useMutation<S, Error, T, MutationContext<T>>({
    mutationFn: func,
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params] as QueryFilters)

      const previousData = queryClient.getQueryData([url, params])

      queryClient.setQueryData<T>([url, params], (oldData) => {
        return updater ? updater(oldData, data as unknown as S) : (data as T)
      })

      return { previousData } as MutationContext<T> | undefined
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([url, params], context)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params] as QueryFilters)
    },
  })
}

const defaultPostFunc = <S>(url: string) => {
  return async (data: any): Promise<S> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred while fetching')
    }
    return response.json()
  }
}

export const usePost = <T, S>({
  url,
  params,
  updater,
}: {
  url: string
  params?: object
  updater?: (oldData: T | undefined, newData: S) => T | undefined
}) => useGenericMutation<T, S>(defaultPostFunc<S>(url), url, params, updater)
