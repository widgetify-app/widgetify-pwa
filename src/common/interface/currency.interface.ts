export interface Currency {
	name: {
		fa: string
		en: string
	}
	icon: string
	price: number
	rialPrice: number
	changePercentage: number | null
}
