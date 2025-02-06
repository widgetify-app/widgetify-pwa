import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import { getMainColorFromImage } from '../common/color'
import type { Currency } from '../common/interface/currency.interface'
import { getFromStorage, setToStorage } from '../common/storage'
import { useGetCurrencyByCode } from '../services/getMethodHooks/getCurrencyByCode.hook'

interface CurrencyBoxProps {
	code: string
}

export const CurrencyBox = ({ code }: CurrencyBoxProps) => {
	const { data, refetch, dataUpdatedAt } = useGetCurrencyByCode(code)
	const [currency, setCurrency] = useState<Currency | null>(
		getFromStorage<Currency>(`currency:${code}`) || null,
	)

	const [imgColor, setImgColor] = useState<string>()
	const [displayPrice, setDisplayPrice] = useState(0)
	const [priceChange, setPriceChange] = useState(0)

	const prevPriceRef = useRef<number | null>(null)

	const priceMotion = useMotionValue(0)
	const defaultDamping = 20
	const [damping, setDamping] = useState(defaultDamping)

	const animatedPrice = useSpring(priceMotion, {
		stiffness: 100,
		damping,
	})

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 10000) //every 10 seconds

		return () => clearInterval(intervalId)
	}, [refetch])

	useEffect(() => {
		if (data) {
			setCurrency(data)
			setToStorage(`currency:${code}`, data)
		}
		const event = new Event('fetched-data')
		window.dispatchEvent(event)
	}, [dataUpdatedAt])

	useEffect(() => {
		if (currency?.icon) {
			getMainColorFromImage(currency.icon).then((color) => {
				setImgColor(color)
			})
		}
	}, [currency?.icon])

	useEffect(() => {
		if (currency?.price) {
			if (prevPriceRef.current !== currency.price) {
				priceMotion.set(currency.rialPrice)
				prevPriceRef.current = currency.price
				if (currency.changePercentage) {
					const changeAmount = (currency.changePercentage / 100) * currency.price
					setPriceChange(changeAmount)
				}
			}
		}
	}, [currency?.price, priceMotion])

	useEffect(() => {
		const unsubscribe = animatedPrice.on('change', (v) => {
			setDisplayPrice(Math.round(v))

			const diff = Math.abs(v - (currency?.rialPrice || 0))
			setDamping(diff < 5 ? 50 : defaultDamping)
		})
		return () => unsubscribe()
	}, [animatedPrice, currency?.rialPrice])

	return (
		<div className="flex flex-col items-center justify-between h-24 p-2 rounded-lg shadow-sm sm:w-32 dark:bg-neutral-700 w-36">
			<div className="relative flex flex-row items-center justify-between w-full">
				<>
					<img
						src={currency?.icon}
						alt={currency?.name?.en}
						className="object-cover w-4 h-4 rounded-full contrast-60"
					/>
					<div
						className={'w-5 h-5 absolute rounded-full z-0 left-1.5 blur-lg'}
						style={{
							backgroundImage: `radial-gradient(50% 50% at 50% 50%, ${imgColor} 55%, ${`${imgColor}00`} 100%)`,
						}}
					></div>
				</>
				<div className="flex flex-col w-full px-2">
					<p className="text-xs font-medium text-right truncate dark:text-gray-300">
						{currency?.name.en}
					</p>
					<p className="text-xs font-normal text-right text-gray-100 opacity-45">
						{code.toUpperCase()}
					</p>
				</div>
			</div>

			<div className="relative w-full">
				<motion.p className="text-[1.1rem] text-gray-500 dark:text-gray-200 font-[balooTamma] font-bold">
					{displayPrice !== 0 ? displayPrice.toLocaleString() : ''}
					{currency?.changePercentage ? (
						<div
							className={`absolute -top-4 -left-2 text-xs  ml-1 flex ${
								priceChange > 0 ? 'text-red-500' : 'text-green-500'
							}`}
						>
							{priceChange > 0 ? <FaArrowUpLong /> : <FaArrowDownLong />}
							<p className="">{Number(priceChange.toFixed()).toLocaleString()}</p>
						</div>
					) : null}
				</motion.p>
			</div>
		</div>
	)
}
