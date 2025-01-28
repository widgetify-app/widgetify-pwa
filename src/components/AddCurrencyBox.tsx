import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { TiPlus } from 'react-icons/ti'

export const AddCurrencyBox = () => {
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {}, [])
	return (
		<>
			<div
				className="flex flex-col items-center justify-between h-20 p-2 mt-2 bg-white rounded-lg shadow-sm cursor-pointer dark:bg-neutral-700 w-36 hover:bg-gray-100 dark:hover:bg-neutral-800"
				onClick={() => setShowModal(true)}
			>
				<div className="flex items-center justify-center h-full gap-3 p-2 rounded-lg">
					<h3 className="font-medium dark:text-gray-200">
						<TiPlus />
					</h3>
				</div>
			</div>
			<SelectCurrencyModal show={showModal} setShow={setShowModal} />
		</>
	)
}

interface AddCurrencyModalProps {
	show: boolean
	setShow: (show: boolean) => void
}

export function SelectCurrencyModal({ setShow, show }: AddCurrencyModalProps) {
	const handleOpen = () => setShow(!open)
	const onClose = () => setShow(false)

	return (
		<>
			<Dialog
				open={show}
				handler={onClose}
				size="xs"
				className="custom-dialog"
			>
				<DialogHeader>این مدال است.</DialogHeader>
				<DialogBody className="font-[vazir]">
					لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
					از طراحان گرافیک است.
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button variant="gradient" color="green" onClick={handleOpen}>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}
