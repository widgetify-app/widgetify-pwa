export interface Currency {
	name: {
		fa: string
		en: string
	}
	icon: string
	price: number
	rialPrice: number
	type: 'coin' | 'crypto' | 'currency'
	changePercentage: number | null
}
