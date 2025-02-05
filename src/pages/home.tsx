import { useEffect, useState } from 'react'
import { IoPulse } from 'react-icons/io5'
import { StoreKey } from '../common/constant/store.key'
import { getFromStorage, setToStorage } from '../common/storage'
import { AddCurrencyBox } from '../components/AddCurrencyBox'
import { storeContext } from '../context/setting.context'
import { useGetSupportCurrencies } from '../services/getMethodHooks/getSupportCurrencies.hook'
import { CurrencyBox } from '../components/CurrencyBox'

export function HomePage() {
	const [selectedCurrencies, setSelectedCurrencies] = useState<Array<string>>(
		getFromStorage(StoreKey.CURRENCIES) || [],
	)

	const { isLoading, data } = useGetSupportCurrencies()

	useEffect(() => {
		setToStorage(StoreKey.CURRENCIES, selectedCurrencies)
	}, [selectedCurrencies])

	return (
		<storeContext.Provider
			value={{
				selectedCurrencies,
				setSelectedCurrencies,
			}}
		>
			<section className="p-4 rounded shadow bg-neutral-100 dark:bg-neutral-800">
				<h2 className="flex gap-1 mb-4 text-lg font-semibold dark:text-gray-200">
					<IoPulse /> Currency Rates
				</h2>
				<div className="flex flex-row flex-wrap px-4 space-x-2">
					{selectedCurrencies.map((currency, index) => (
						<CurrencyBox key={index} code={currency} />
					))}
					<AddCurrencyBox loading={isLoading} supportCurrencies={data || []} />
				</div>
			</section>
		</storeContext.Provider>
	)
}
