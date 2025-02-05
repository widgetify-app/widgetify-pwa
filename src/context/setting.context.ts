import { createContext } from 'react'

export interface StoreContext {
	selectedCurrencies: Array<string>
	setSelectedCurrencies: (currencies: Array<string>) => void
}

export const storeContext = createContext<StoreContext>({
	selectedCurrencies: [],
	setSelectedCurrencies: () => {},
})
