import { useEffect, useState } from 'react'

import { Toaster } from 'react-hot-toast'
import { NavbarLayout } from '../layouts/navbar/navbar.layout'

interface Props {
	children: JSX.Element
}

export function PageWrapper(props: Props) {
	const [isLogged, setIsLogged] = useState(false)
	const [isFetching, setIsFetching] = useState(false)

	return (
		<div className="h-screen overflow-auto">
			{/* <userContext.Provider value={userContextValue}> */}
			<NavbarLayout />
			{props.children}
			<Toaster />
			{/* </userContext.Provider> */}
		</div>
	)
}
