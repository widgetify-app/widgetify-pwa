import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	title?: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
	children: ReactNode
	direction?: 'rtl' | 'ltr'
	closeOnBackdropClick?: boolean
}

const sizeClasses = {
	sm: 'w-full max-w-sm',
	md: 'w-full max-w-md',
	lg: 'w-full max-w-lg',
	xl: 'w-full max-w-xl',
}

const Modal = ({
	isOpen,
	onClose,
	title,
	size = 'md',
	children,
	closeOnBackdropClick = true,
	direction = 'ltr',
}: ModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm "
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={closeOnBackdropClick ? onClose : undefined}
					dir={direction}
				>
					<motion.div
						className={`bg-[#f2f2f2] dark:bg-[#1f1f1f] shadow-xl rounded-2xl p-6 h-[600px]  ${sizeClasses[size]}`}
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e: any) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-4">
							{title && <h2 className="text-lg font-semibold">{title}</h2>}
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
							>
								<AiOutlineClose size={20} />
							</button>
						</div>
						<div>{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
