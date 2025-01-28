import { useState } from 'react'
import { IoPulse } from 'react-icons/io5'
import { AddCurrencyBox } from './components/AddCurrencyBox'
import { CurrencyBox } from './components/CurrencyBox'

function App() {
	const currencyData = [
		{
			name: 'USD',
			todyPrice: '83,150',
			icon: 'https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/us.svg',
			changePercentage: 1.27,
		},
		{
			name: 'EUR',
			todyPrice: '987,150',
			icon: 'https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/eu.svg',
			changePercentage: -0.27,
		},
	]

	return (
		<>
			<header className="p-4 m-auto mt-2 text-center text-white rounded-md w-72 bg-gray-950">
				<h1 className="text-xl font-bold dark:text-gray-200">ویجتی‌فای</h1>
			</header>

			<main className="p-4">
				<section className="p-4 rounded shadow bg-neutral-100 dark:bg-neutral-800">
					<h2 className="flex gap-1 mb-4 text-lg font-semibold dark:text-gray-200">
						<IoPulse /> Currency Rates
					</h2>
					<div className="flex flex-row flex-wrap px-4 space-x-2">
						{currencyData.map((currency, index) => (
							<CurrencyBox key={index} {...currency} />
						))}
						<AddCurrencyBox />
					</div>
				</section>
			</main>
		</>
	)
}

export default App
