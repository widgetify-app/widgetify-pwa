import { useQuery } from '@tanstack/react-query'
import { getMainApi } from '../api'

export type SupportedCurrencies = {
	key: string
	type: 'coin' | 'crypto' | 'currency'
	country?: string
	label: {
		fa: string
		en: string
	}
}[]

export const useGetSupportCurrencies = () => {
	return useQuery<SupportedCurrencies>({
		queryKey: ['supportedCurrencies'],
		queryFn: async () => getSupportCurrencies(),
		retry: 0,
	})
}

async function getSupportCurrencies(): Promise<SupportedCurrencies> {
	const client = await getMainApi()
	const { data } = await client.get<{ currencies: SupportedCurrencies }>(
		'/v2/supported-currencies',
	)
	return data.currencies
}
