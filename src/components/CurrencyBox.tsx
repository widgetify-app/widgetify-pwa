import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useGetCurrencyByCode } from '../services/getMethodHooks/getCurrencyByCode.hook'

interface CurrencyBoxProps {
	code: string
}

export const CurrencyBox = ({ code }: CurrencyBoxProps) => {
	const { data, isLoading, refetch } = useGetCurrencyByCode(code)

	const priceMotion = useMotionValue(0)
	const animatedPrice = useSpring(priceMotion, { stiffness: 100, damping: 20 })

	const [displayPrice, setDisplayPrice] = useState(0)

	const prevPriceRef = useRef<number | null>(null)

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch()
		}, 60000) // every 1 minute
		return () => clearInterval(intervalId)
	}, [refetch])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (data?.price) {
			if (prevPriceRef.current !== data.price) {
				priceMotion.set(data.rialPrice)
				prevPriceRef.current = data.price
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
				<div className="flex flex-col">
					<p className="text-sm font-medium dark:text-gray-300">
						{isLoading ? '' : data?.name.en}
					</p>
					<p className="text-xs font-normal text-right text-gray-100 opacity-45">
						{code.toUpperCase()}
					</p>
				</div>
			</div>

			<div className="w-full">
				<motion.p className="text-[1.2rem] text-gray-500 dark:text-gray-200">
					{displayPrice.toLocaleString()}
					<span className="ml-1 font-mono text-xs"></span>
				</motion.p>
			</div>
		</div>
	)
}
