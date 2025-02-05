import { useEffect, useState } from 'react'
import { IoPulse } from 'react-icons/io5'
import { StoreKey } from '../common/constant/store.key'
import { getFromStorage, setToStorage } from '../common/storage'
import { AddCurrencyBox } from '../components/AddCurrencyBox'
import { CurrencyBox } from '../components/CurrencyBox'
import { storeContext } from '../context/setting.context'
import { useGetSupportCurrencies } from '../services/getMethodHooks/getSupportCurrencies.hook'

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
			<section className="p-2 rounded shadow bg-neutral-100 dark:bg-neutral-800">
				<h2 className="flex gap-1 mb-4 text-lg font-semibold dark:text-gray-200">
					<IoPulse /> Currency Rates
				</h2>
				<div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
					{selectedCurrencies.map((currency, index) => (
						<CurrencyBox key={index} code={currency} />
					))}

					<AddCurrencyBox loading={isLoading} supportCurrencies={data || []} />
				</div>
			</section>
		</storeContext.Provider>
	)
}
