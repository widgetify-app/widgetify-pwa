import { useEffect, useState } from 'react'
import { BiBroadcast } from 'react-icons/bi'
import { IoPulse } from 'react-icons/io5'
import { MdTrendingUp } from 'react-icons/md'
import { StoreKey } from '../common/constant/store.key'
import { getFromStorage, setToStorage } from '../common/storage'
import { AddCurrencyBox } from '../components/AddCurrencyBox'
import { CurrencyBox } from '../components/CurrencyBox'
import { PwaInstallerModal } from '../components/PwaInstallerModal'
import { storeContext } from '../context/setting.context'
import { useGetSupportCurrencies } from '../services/getMethodHooks/getSupportCurrencies.hook'

export function HomePage() {
	const [selectedCurrencies, setSelectedCurrencies] = useState<Array<string>>(
		getFromStorage(StoreKey.CURRENCIES) || [],
	)

	const [showPwaModal, setShowPwaModal] = useState(false)

	useEffect(() => {
		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			//@ts-ignore
			window.navigator.standalone

		if (!isStandalone) {
			const timer = setTimeout(() => {
				setShowPwaModal(true)
			}, 5000) // Show modal after 5 seconds

			return () => clearTimeout(timer)
		}
	}, [])

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
			<section className="p-2 mx-1 rounded shadow lg:mx-4 bg-neutral-100 dark:bg-neutral-800">
				<h2 className="flex  items-center text-center gap-1 mb-4 text-lg font-semibold dark:text-gray-200 font-[balooTamma]">
					🪙 ArzLive
				</h2>
				<div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
					{selectedCurrencies.map((currency, index) => (
						<CurrencyBox key={index} code={currency} />
					))}
					<AddCurrencyBox loading={isLoading} supportCurrencies={data || []} />
				</div>
			</section>
			<PwaInstallerModal show={showPwaModal} onClose={() => setShowPwaModal(false)} />
		</storeContext.Provider>
	)
}
