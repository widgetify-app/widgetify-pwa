import {
	type FetchedCurrency,
	useGetCurrencyByCode,
} from '../services/getMethodHooks/getCurrencyByCode.hook'

interface CurrencyBoxProps {
	code: string
}

export const CurrencyBox = ({ code }: CurrencyBoxProps) => {
	const { data, isLoading } = useGetCurrencyByCode(code)

	return (
		<div className="flex flex-col items-center justify-between h-20 p-2 mt-2 bg-white rounded-lg shadow-sm dark:bg-neutral-700 w-36">
			<div className="flex flex-row items-center justify-between w-full px-2">
				{isLoading ? (
					<div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
				) : (
					<img
						src={data?.icon}
						alt={data?.name?.en}
						className="object-cover w-4 h-4 rounded-full contrast-50"
					/>
				)}
				<p className="text-sm font-medium dark:text-gray-300">
					{isLoading ? '' : data?.name.en}
				</p>
			</div>

			<div className="w-full">
				<p className="text-[1.2rem] text-gray-500 dark:text-gray-200">
					{data?.price.toLocaleString()}
					<span className="ml-1 font-mono text-xs">T</span>
				</p>
			</div>
		</div>
	)
}
