import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import { getMainColorFromImage } from '../common/color'
import { useGetCurrencyByCode } from '../services/getMethodHooks/getCurrencyByCode.hook'

interface CurrencyBoxProps {
	code: string
}

export const CurrencyBox = ({ code }: CurrencyBoxProps) => {
	const { data, isLoading, refetch } = useGetCurrencyByCode(code)
	const [imgColor, setImgColor] = useState<string>()

	const priceMotion = useMotionValue(0)
	const animatedPrice = useSpring(priceMotion, {
		stiffness: 100,
		damping: 20,
	})

	const [displayPrice, setDisplayPrice] = useState(0)
	const [priceChange, setPriceChange] = useState(0)

	const prevPriceRef = useRef<number | null>(null)

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 60000) // every 1 minute
		return () => clearInterval(intervalId)
	}, [refetch])

	useEffect(() => {
		if (data?.icon) {
			getMainColorFromImage(data.icon).then((color) => {
				setImgColor(color)
			})
		}
	}, [data])

	useEffect(() => {
		if (data?.price) {
			if (prevPriceRef.current !== data.price) {
				priceMotion.set(data.rialPrice)
				prevPriceRef.current = data.price
				if (data.changePercentage) {
					const changeAmount = (data.changePercentage / 100) * data.price
					setPriceChange(changeAmount)
				}
			}
		}
	}, [data?.price, priceMotion])

	useEffect(() => {
		const unsubscribe = animatedPrice.on('change', (v) => {
			setDisplayPrice(Math.round(v))
		})
		return () => unsubscribe()
	}, [animatedPrice])

	return (
		<div className="flex flex-col items-center justify-between h-24 p-2 rounded-lg shadow-sm sm:w-32 dark:bg-neutral-700 w-36">
			<div className="relative flex flex-row items-center justify-between w-full">
				{isLoading ? (
					<div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
				) : (
					<>
						<img
							src={data?.icon}
							alt={data?.name?.en}
							className="object-cover w-4 h-4 rounded-full contrast-60"
						/>
						<div
							className={`
           w-5 h-5 absolute rounded-full z-0 left-1.5  blur-lg`}
							style={{
								backgroundImage: `radial-gradient(50% 50% at 50% 50%, ${imgColor} 55%, ${`${imgColor}00`} 100%)`,
							}}
						></div>
					</>
				)}
				<div className="flex flex-col w-full px-2">
					<p className="text-xs font-medium text-right truncate dark:text-gray-300">
						{isLoading ? '' : data?.name.en}
					</p>
					<p className="text-xs font-normal text-right text-gray-100 opacity-45">
						{code.toUpperCase()}
					</p>
				</div>
			</div>

			<div className="relative w-full">
				<motion.p className=" text-[1.2rem] text-gray-500 dark:text-gray-200">
					{displayPrice.toLocaleString()}
					{data?.changePercentage && (
						<span
							className={`absolute -top-4 -left-2 text-xs font-normal ml-1 flex  ${
								priceChange > 0 ? 'text-red-500' : 'text-green-500'
							}`}
						>
							{priceChange > 0 ? <FaArrowUpLong /> : <FaArrowDownLong />}
							{Number(priceChange.toFixed()).toLocaleString('fa-IR')}{' '}
						</span>
					)}
				</motion.p>
			</div>
		</div>
	)
}
