import type { FetchedWeather } from '../../../services/getMethodHooks/weather/weather.interface'

interface CurrentWeatherBoxProps {
	weather: FetchedWeather['weather']
}
export function CurrentWeatherBox({ weather }: CurrentWeatherBoxProps) {
	return (
		<div className="col-span-2 p-3 bg-neutral-100 dark:bg-[#282828] rounded-lg shadow ">
			<div className="flex items-center justify-between">
				<img
					src={weather.icon.url}
					alt="weather"
					width={weather.icon.width}
					height={weather.icon.height}
				/>
				<div className="text-right">
					<div className="text-3xl font-bold dark:text-white">
						{Math.round(weather.temperature.temp)}°C
					</div>
					<div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
						<p>
							{weather.description.emoji} {weather.description.text}
						</p>
						<div className="flex items-center gap-2">
							<div>🌡️ {weather.temperature.humidity}%</div>
							<div>🍃{weather.temperature.wind_speed} m/s</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-16 mt-4 text-sm text-gray-500 dark:text-gray-400 max-h-16">
				<p
					className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 "
					dir="rtl"
				>
					{weather.ai?.description || weather.temperature.temp_description}
				</p>
			</div>
		</div>
	)
}
