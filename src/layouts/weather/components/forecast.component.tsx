import type { FetchedForecast } from '../../../services/getMethodHooks/weather/weather.interface'

interface ForecastProps {
	forecast: FetchedForecast
}
export function ForecastComponent({ forecast }: ForecastProps) {
	return (
		<div className="flex flex-col items-center justify-around p-3 bg-neutral-100 dark:bg-[#282828] rounded-lg shadow">
			<div className="text-sm text-gray-500 dark:text-gray-400">
				{new Date(forecast.date).toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})}
			</div>
			<img src={forecast.icon} alt="forecast" className="w-8 h-8 mx-auto" />
			<div className="text-lg font-semibold dark:text-white">
				{Math.round(forecast.temp)}°C
			</div>
		</div>
	)
}
