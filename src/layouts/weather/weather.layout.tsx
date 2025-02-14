import ms from 'ms'
import { useContext, useEffect, useState } from 'react'
import { FaGears } from 'react-icons/fa6'
import { StoreKey } from '../../common/constant/store.key'
import { getFromStorage, setToStorage } from '../../common/storage'
import { storeContext } from '../../context/setting.context'
import { useGetWeatherByLatLon } from '../../services/getMethodHooks/weather/getWeatherByLatLon'
import type { FetchedWeather } from '../../services/getMethodHooks/weather/weather.interface'

import { CurrentWeatherBox } from './components/current-box.component'
import { ForecastComponent } from './components/forecast.component'
import { WeatherOptionsModal } from './components/options-modal.component'

export function WeatherLayout() {
	const { selectedCity } = useContext(storeContext)
	const [cityWeather, setCityWeather] = useState<FetchedWeather | null>(
		getFromStorage(StoreKey.CURRENT_WEATHER) || null,
	)
	const { data, refetch, dataUpdatedAt } = useGetWeatherByLatLon(
		selectedCity.lat,
		selectedCity.lon,
		{
			refetchInterval: 600000, // 10 minutes
		},
	)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, ms('10m'))

		return () => clearInterval(intervalId)
	}, [refetch])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data) {
			setCityWeather(data)
			setToStorage(StoreKey.CURRENT_WEATHER, data)
		}
	}, [dataUpdatedAt])

	return (
		<>
			<section className="p-2 mx-1 rounded lg:mx-4">
				<div className="flex items-center justify-between w-full px-1">
					<h2 className="text-lg font-semibold dark:text-gray-200 font-[balooTamma]">
						☂️ Weather
					</h2>
					<div
						className="text-xs text-gray-500 dark:text-gray-400 font-[balooTamma] font-semibold flex items-center gap-1
					hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
						onClick={() => setShowModal(true)}
					>
						<FaGears className="inline-block w-4 h-4" />
						<span>{cityWeather?.city?.en || 'Options'}</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
					{cityWeather ? <CurrentWeatherBox weather={cityWeather.weather} /> : null}
					{cityWeather?.forecast
						? cityWeather.forecast.map((item) => (
								<ForecastComponent forecast={item} key={item.temp} />
							))
						: null}
				</div>
			</section>
			<WeatherOptionsModal show={showModal} onClose={() => setShowModal(false)} />
		</>
	)
}
