import { Box } from '@mui/material'
import type { Router } from '@toolpad/core/AppProvider'
import { AppProvider, type Session } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { NAVIGATION } from '../const/layoutNav'
import { demoTheme } from '../const/layoutTheme'
import { RoutesConsts } from '../const/routes'
import { RoutesEnums } from '../enums/routes'
export default function DashboardLayoutAccount() {
	const [session, setSession] = useState<Session | null>({
		user: {
			name: 'Xudayar Ilalov',
			email: 'IlalovX@outlook.com',
			image: 'https://avatars.githubusercontent.com/u/19550456',
		},
	})

	const authentication = useMemo(() => {
		return {
			signIn: () => {
				setSession({
					user: {
						name: 'Xudayar Ilalov',
						email: 'IlalovX@outlook.com',
						image: 'https://avatars.githubusercontent.com/u/19550456',
					},
				})
			},
			signOut: () => {
				setSession(null)
			},
		}
	}, [])

	const location = useLocation()
	const navigate = useNavigate()

	const router: Router = {
		navigate: url => navigate(typeof url === 'string' ? url : url.toString()),
		pathname: location.pathname,
		searchParams: new URLSearchParams(location.search),
	}

	return (
		// preview-start
		<AppProvider
			session={session}
			authentication={authentication}
			navigation={NAVIGATION}
			theme={demoTheme}
			branding={{
				logo: '',
				title: 'Statistika',
				homeUrl: RoutesConsts[RoutesEnums.HOME],
			}}
			router={router}
		>
			<DashboardLayout>
				<Box className='p-5'>
					<Outlet />
				</Box>
			</DashboardLayout>
		</AppProvider>
		// preview-end
	)
}
