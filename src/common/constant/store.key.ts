export enum StoreKey {
	CURRENCIES = 'CURRENCIES',
	hasShownPwaModal = 'hasShownPwaModal',
	CURRENCY_UPDATED_AT = 'CURRENCY_UPDATED_AT',
	SELECTED_CITY = 'SELECTED_CITY',
	CURRENT_WEATHER = 'CURRENT_WEATHER',
}
export type StoreKeyType = StoreKey | `currency:${string}`
