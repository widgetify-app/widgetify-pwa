import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={AppRoutes} />
		</QueryClientProvider>
	)
}

export default App
