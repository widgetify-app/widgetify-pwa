export enum StoreKey {
	CURRENCIES = 'CURRENCIES',
	hasShownPwaModal = 'hasShownPwaModal',
}
export type StoreKeyType = StoreKey | `currency:${string}`
