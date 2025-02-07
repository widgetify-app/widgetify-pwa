import { useQuery } from '@tanstack/react-query'
import { getMainApi } from '../api'

export interface FetchedCurrency {
	name: {
		fa: string
		en: string
	}
	icon: string
	price: number
	rialPrice: number
	changePercentage: number
	priceHistory: PriceHistory[]
	type: 'coin' | 'crypto' | 'currency'
}

export interface PriceHistory {
	price: number
	createdAt: string
}

export const useGetCurrencyByCode = (currency: string) => {
	return useQuery<FetchedCurrency>({
		queryKey: [`currency-${currency}`],
		queryFn: async () => getSupportCurrencies(currency),
		retry: 0,
	})
}

async function getSupportCurrencies(currency: string): Promise<FetchedCurrency> {
	const client = await getMainApi()
	const { data } = await client.get<FetchedCurrency>(`/v2/arz/${currency}`)
	return data
}
