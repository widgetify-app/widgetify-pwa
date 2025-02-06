import { useEffect, useState } from 'react'
import { StoreKey } from '../common/constant/store.key'
import { getFromStorage, setToStorage } from '../common/storage'
import { PwaInstallerModal } from '../components/pwaInstaller-modal'
import { storeContext } from '../context/setting.context'
import { ArzLiveLayout } from '../layouts/arzLive/arzLive.layout'

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

		const hasShownPwaModal = getFromStorage(StoreKey.hasShownPwaModal)

		if (!isStandalone && !hasShownPwaModal) {
			const timer = setTimeout(() => {
				setShowPwaModal(true)
				setToStorage(StoreKey.hasShownPwaModal, true)
			}, 10000) // Show modal after 10 seconds

			return () => clearTimeout(timer)
		}
	}, [])

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
			<ArzLiveLayout />
			<PwaInstallerModal show={showPwaModal} onClose={() => setShowPwaModal(false)} />
		</storeContext.Provider>
	)
}
