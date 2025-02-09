import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import Modal from '../../../components/modal'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)

interface CurrencyModalComponentProps {
	code: string
	currency: any
	displayPrice: number
	imgColor: string | undefined
	isModalOpen: boolean
	priceChange: number | null
	toggleCurrencyModal: () => void
}

export const CurrencyModalComponent = ({
	code,
	currency,
	displayPrice,
	imgColor,
	isModalOpen,
	priceChange,
	toggleCurrencyModal,
}: CurrencyModalComponentProps) => {
	const chartData = {
		labels: currency?.priceHistory?.map((entry: any) => entry.createdAt) || [],
		datasets: [
			{
				label: 'Price History',
				data: currency?.priceHistory?.map((entry: any) => entry.price) || [],
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				tension: 0.4,
				fill: true,
				pointRadius: 3,
				pointBackgroundColor: 'rgba(75, 192, 192, 1)',
			},
		],
	}

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					color: (theme: { dark: any }) => (theme.dark ? '#ffffff' : '#666666'),
				},
			},
			y: {
				grid: {
					color: (theme: { dark: any }) =>
						theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
				},
				ticks: {
					color: (theme: { dark: any }) => (theme.dark ? '#ffffff' : '#666666'),
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				titleColor: '#ffffff',
				bodyColor: '#ffffff',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
		},
	}

	return (
		<Modal isOpen={isModalOpen} onClose={toggleCurrencyModal} size="sm" title="">
			<div className="flex flex-col items-center justify-center space-y-2 font-[balooTamma] p-2">
				<div className="relative">
					<img
						src={currency?.icon}
						alt={currency?.name?.en}
						className="z-50 object-cover w-16 h-16 rounded-full shadow"
					/>
					<div
						className="absolute top-0 z-10 w-16 h-16 blur-xl opacity-30"
						style={{ backgroundColor: imgColor }}
					/>
				</div>
				<div className="text-center">
					<p className="text-xl font-bold text-gray-800 dark:text-gray-200">
						{currency?.name.en}
					</p>
					<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
						{code.toUpperCase()}
					</p>
				</div>
				<div className="space-y-0">
					<div className="relative text-xl font-bold text-gray-900 dark:text-gray-200">
						{priceChange ? <PriceChangeComponent priceChange={priceChange} /> : null}
						<p>{displayPrice !== 0 ? displayPrice.toLocaleString() : ''} </p>
						{currency?.type === 'crypto' ? (
							<p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
								$
								{currency?.price ? Number(currency.price.toFixed()).toLocaleString() : ''}
							</p>
						) : null}

						{currency?.type === 'coin' ? (
							<p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 font-[Vazir]">
								{currency?.name ? currency.name.fa : ''}
							</p>
						) : null}
					</div>
				</div>
				{currency?.priceHistory?.length ? (
					<div className="w-full h-64">
						{/* @ts-ignore */}
						<Line data={chartData} options={chartOptions} />
					</div>
				) : null}
			</div>
		</Modal>
	)
}
interface Prop {
	priceChange: number
}
export function PriceChangeComponent({ priceChange }: Prop) {
	return (
		<div
			className={` text-xs  ml-1 flex  z-50 ${
				priceChange > 0 ? 'text-red-500' : 'text-green-500'
			}`}
		>
			{priceChange > 0 ? <FaArrowUpLong /> : <FaArrowDownLong />}
			<p className="">{Number(priceChange.toFixed()).toLocaleString()}</p>
		</div>
	)
}
