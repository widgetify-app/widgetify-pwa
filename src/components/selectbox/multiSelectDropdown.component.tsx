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
}

export const MultiSelectDropdown = ({
	options,
	values,
	color,
	isMultiple,
	limit,
	onChange,
	isClearable,
}: MultiSelectDropdownProps) => {
	const handleChange = (selectedValue: any) => {
		if (!selectedValue) return []
		if (limit && selectedValue?.length > limit) return values
		const selectedValuesMapped = selectedValue.map((value: { value: any }) => value.value)
		return onChange(selectedValuesMapped)
	}

	return (
		<div className="relative custom-select-box">
			<Select
				onChange={handleChange}
				value={values}
				isMultiple={isMultiple}
				primaryColor={color}
				options={options as any}
				classNames={{
					// Search box styles - Updated dark mode background
					searchBox:
						'w-full h-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-primary-500 bg-white dark:bg-[#3f3f3f] border-gray-200 dark:border-gray-600 dark:text-gray-100 transition-all duration-200 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:placeholder-gray-400',
					searchIcon: 'hidden',
					searchContainer: 'w-full px-1 my-2 relative',

					// Tag styles
					tagItem: (value) =>
						'rounded-md flex p-1.5 m-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-gray-500',
					tagItemText: 'text-primary-700 dark:text-primary-300',
					tagItemIconContainer:
						'flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-500/50 hover:text-red-500',

					listItem: ({ isSelected }) =>
						`p-2.5 rounded-md cursor-pointer select-none list-none transition-colors duration-150 
			${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-transparent'} 
			hover:bg-gray-100/20 dark:hover:bg-black/20
			hover:text-gray-700 dark:hover:text-gray-400
			text-gray-700 dark:text-gray-300`,

					listGroupLabel:
						'p-2 bg-transparent text-gray-600 dark:text-gray-100 font-extrabold font-bold mt-1 w-full text-center',

					menu: 'w-full bg-white dark:bg-[#3f3f3f] shadow-lg border border-gray-200 dark:border-gray-700  mt-1',

					list: `max-h-60 overflow-y-auto absolute w-full bg-white dark:bg-[#3f3f3f] z-50
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-track]:rounded-lg
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-thumb]:border-solid
            dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500
            [&::-webkit-scrollbar-thumb]:transition-colors
            [&::-webkit-scrollbar-thumb]:duration-200`,

					// Selected item
					menuButton: (state) =>
						'flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20 dark:bg-[#3f3f3f] dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20',
					// Clear button
				}}
				searchInputPlaceholder="جستجو ..."
				placeholder="انتخاب کنید"
				isSearchable={true}
				isClearable={isClearable}
			/>
		</div>
	)
}
