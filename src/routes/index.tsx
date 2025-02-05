import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/home'
import { PageWrapper } from '../pages/wrapper'

export const AppRoutes = createBrowserRouter([
	{
		path: '/',

		element: (
			<PageWrapper>
				<HomePage />
			</PageWrapper>
		),
	},
])
