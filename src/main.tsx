import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.ts'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<App />
				</Provider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
