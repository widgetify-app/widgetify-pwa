export enum StoreKey {
	CURRENCIES = 'CURRENCIES',
}
export type StoreKeyType = StoreKey | `currency:${string}`
