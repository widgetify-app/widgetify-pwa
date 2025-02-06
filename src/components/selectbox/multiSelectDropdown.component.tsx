import Select from 'react-tailwindcss-select'

interface Option {
	label: string
	options: {
		value: string
		label: string
	}[]
}

interface MultiSelectDropdownProps {
	options:
		| {
				value: string
				label: string
		  }[]
		| Option
	values: {
		value: string
		label: string
	}[]
	color: string
	isMultiple: boolean
	limit?: number
	isClearable?: boolean
	onChange: (values: string[]) => void
	onClose:any
}

export const MultiSelectDropdown = ({
	options,
	values,
	color,
	isMultiple,
	limit,
	onChange,
	onClose,
	isClearable,
}: MultiSelectDropdownProps) => {
	const handleChange = (selectedValue: any) => {
		if (!selectedValue) return []
		if (limit && selectedValue?.length > limit) return values
		const selectedValuesMapped = selectedValue.map((value: { value: any }) => value.value)
		return onChange(selectedValuesMapped)
	}

	return (
		<>
			<Select
				onChange={handleChange}
				value={values}
				isMultiple={isMultiple}
				primaryColor={color}
				options={options as any}
				classNames={{
					searchBox:
						'w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
					searchIcon: 'hidden',
				}}
				searchInputPlaceholder='جستجو'
				isSearchable={true}
				isClearable={isClearable}
			/>
			
			<div className='flex justify-end mt-3'>
				<button onClick={onClose} type='button' className='bg-green-600 cursor-pointer hover:bg-green-700 transition-colors flex px-3.5 py-1.5 rounded-2xl'>Save</button>
			</div>
		</>
	)
}
