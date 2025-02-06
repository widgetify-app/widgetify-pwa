export enum StoreKey {
	CURRENCIES = 'CURRENCIES',
	hasShownPwaModal = 'hasShownPwaModal',
	CURRENCY_UPDATED_AT = 'CURRENCY_UPDATED_AT',
}
export type StoreKeyType = StoreKey | `currency:${string}`
