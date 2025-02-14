import { useEffect, useState } from 'react'
import { StoreKey } from '../common/constant/store.key'
import { getFromStorage, setToStorage } from '../common/storage'
import { PwaInstallerModal } from '../components/pwaInstaller-modal'
import { UpdateAvailableModal } from '../components/updateAvailable-moda'
import { type SelectedCity, storeContext } from '../context/setting.context'
import { ArzLiveLayout } from '../layouts/arzLive/arzLive.layout'
import { WeatherLayout } from '../layouts/weather/weather.layout'

export function HomePage() {
	const defaultCurrencies = ['USD', 'EUR', 'GRAM']
	const storedCurrencies = getFromStorage(StoreKey.CURRENCIES) as string[] | null
	const [selectedCurrencies, setSelectedCurrencies] = useState<Array<string>>(
		storedCurrencies && storedCurrencies.length > 0
			? storedCurrencies
			: defaultCurrencies,
	)

	const city = getFromStorage<SelectedCity>(StoreKey.SELECTED_CITY)
	const [selectedCity, setSelectedCity] = useState<SelectedCity>(
		city || {
			city: 'Tehran',
			lat: 35.6895,
			lon: 51.3896,
		},
	)

	const [showPwaModal, setShowPwaModal] = useState(false)
	const [showUpdateModal, setShowUpdateModal] = useState(false)

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

	function toggleUpdateModal() {
		setShowUpdateModal(!showUpdateModal)
	}

	function onInstall() {
		window.location.reload()
	}

	useEffect(() => {
		window.addEventListener('update-available', toggleUpdateModal)

		return () => {
			window.removeEventListener('update-available', toggleUpdateModal)
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
				selectedCity,
				setSelectedCity,
			}}
		>
			<ArzLiveLayout />
			<WeatherLayout />
			<PwaInstallerModal show={showPwaModal} onClose={() => setShowPwaModal(false)} />
			<UpdateAvailableModal
				onClose={() => toggleUpdateModal()}
				show={showUpdateModal}
				onInstall={() => onInstall()}
			/>
		</storeContext.Provider>
	)
}
