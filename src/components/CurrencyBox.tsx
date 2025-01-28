interface CurrencyBoxProps {
	name: string
	todyPrice: string
	icon: string
	changePercentage: number
}

export const CurrencyBox = ({ name, todyPrice, icon }: CurrencyBoxProps) => {
	return (
		<div className="flex flex-col items-center justify-between h-20 p-2 mt-2 bg-white rounded-lg shadow-sm dark:bg-neutral-700 w-36">
			<div className="flex flex-row items-center justify-between w-full px-2">
				<img
					src={icon}
					alt={name}
					className="object-cover w-4 h-4 rounded-full contrast-50"
				/>
				<p className="text-sm font-medium dark:text-gray-300">{name}</p>
			</div>

			<div className="w-full">
				<p className="text-[1.2rem] text-gray-500 dark:text-gray-200">
					{todyPrice}
					<span className="font-mono text-xs">T</span>
				</p>
			</div>
		</div>
	)
}
