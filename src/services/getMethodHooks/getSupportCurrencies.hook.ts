import { useQuery } from '@tanstack/react-query'
import { getMainClient } from '../api'

export type SupportedCurrencies = {
  key: string
  type: 'coin' | 'crypto' | 'currency'
  country?: string
  label: {
    fa: string
    en: string
  }
  changePercentage: number
}[]

export const useGetSupportCurrencies = () => {
  return useQuery({
    queryKey: ['supportedCurrencies'],
    queryFn: () => getSupportCurrencies(),
    retry: 0
  })
}

async function getSupportCurrencies() {
  const client = await getMainClient()
  const { data } = await client.get<{ currencies: SupportedCurrencies }>('/v2/supported-currencies')
  return data.currencies
}
