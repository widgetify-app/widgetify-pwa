import { useContext, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { TiPlus } from 'react-icons/ti'
import { storeContext } from '../context/setting.context'
import { MultiSelectDropdown } from './selectBox/multiSelectDropdown.component'

export type SupportedCurrencies = {
	key: string
	type: 'coin' | 'crypto' | 'currency'
	country?: string
	label: {
		fa: string
		en: string
	}
}[]

interface AddCurrencyBoxProps {
	supportCurrencies: SupportedCurrencies
	disabled?: boolean
	loading?: boolean
}

export const AddCurrencyBox = ({
	supportCurrencies,
	disabled,
	loading,
}: AddCurrencyBoxProps) => {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<div
				className={`flex flex-col items-center justify-between h-24 p-2  bg-white rounded-lg shadow-sm cursor-pointer dark:bg-neutral-700 w-36 ${disabled ? 'opacity-50' : 'hover:bg-gray-100 dark:hover:bg-neutral-800'}`}
				onClick={() => (disabled ? null : setShowModal(true))}
			>
				<div className="flex items-center justify-center h-full gap-3 p-2 rounded-lg">
					<h3 className="font-medium dark:text-gray-200">
						{loading ? <AiOutlineLoading className="animate-spin" /> : <TiPlus />}
					</h3>
				</div>
			</div>
			<SelectCurrencyModal
				show={showModal}
				setShow={setShowModal}
				supportCurrencies={supportCurrencies}
			/>
		</>
	)
}

interface AddCurrencyModalProps {
	show: boolean
	setShow: (show: boolean) => void
	supportCurrencies: SupportedCurrencies
}

export function SelectCurrencyModal({
	setShow,
	show,
	supportCurrencies,
}: AddCurrencyModalProps) {
	const { selectedCurrencies, setSelectedCurrencies } = useContext(storeContext)

	const onClose = () => setShow(false)

	function onCurrencyChange(values: string[]) {
		setSelectedCurrencies([])
		setSelectedCurrencies(values)
	}

	return show ? (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center p-2 bg-black/60 backdrop-blur-sm"
			dir="rtl"
		>
			<div className="w-full max-w-sm p-4   rounded shadow-xl bg-[#f2f2f2] dark:bg-[#262626]">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						افزودن ارز
					</h2>
				</div>
				<div>
					<MultiSelectDropdown
						options={getCurrencyOptions(supportCurrencies) as any}
						values={getSelectedCurrencies(selectedCurrencies, supportCurrencies)}
						isMultiple={true}
						onChange={(values) => onCurrencyChange(values)}
						color={'blue'}
					/>
				</div>

				<div className="flex justify-center w-full mt-3">
					<button
						onClick={onClose}
						type="button"
						className="p-2 text-white transition-colors duration-300 bg-green-600 rounded cursor-pointer hover:bg-green-700 active:bg-green-800 dark:text-gray-100 dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900 w-60"
					>
						تایید
					</button>
				</div>
			</div>
		</div>
	) : null
}

interface Option {
	label: string
	options: {
		value: string
		label: string
	}[]
}
function getCurrencyOptions(supported: SupportedCurrencies): Option[] {
	const keys = Object.keys(supported)

	const isCrypto = keys
		.map((key) => Number(key))
		.filter((index) => supported[index].type === 'crypto')
	const isCurrency = keys
		.map((key) => Number(key))
		.filter((index) => supported[index].type === 'currency')
	const supportedCoins = keys
		.map((key) => Number(key))
		.filter((index) => supported[index].type === 'coin')

	const options = [
		{
			label: '🪙 ارزهای دیجیتال',
			options: isCrypto.map((indx) => ({
				value: supported[indx].key,
				label: supported[indx].label.fa,
			})),
		},
		{
			label: '💵 ارزها',
			options: isCurrency.map((key) => ({
				value: supported[key].key,
				label: supported[key].label.fa,
			})),
		},
		{
			label: '🥇 طلا و سکه',
			options: supportedCoins.map((indx) => ({
				value: supported[indx].key,
				label: supported[indx].label.fa,
			})),
		},
	]

	return options
}

function getSelectedCurrencies(
	selected: string[],
	list: SupportedCurrencies,
): { value: string; label: string }[] {
	return selected.map((key) => ({
		value: key,
		// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
		label: list.find((item) => item.key == key)?.label?.fa || '',
	}))
}
