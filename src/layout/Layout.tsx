import { Box } from '@mui/material'
import type { Router } from '@toolpad/core/AppProvider'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { NAVIGATION } from '../const/layoutNav'
import { demoTheme } from '../const/layoutTheme'
import { RoutesConsts } from '../const/routes'
import { RoutesEnums } from '../enums/routes'

export default function DashboardLayoutAccount() {
	const location = useLocation()
	const navigate = useNavigate()

	const router: Router = {
		navigate: url => navigate(typeof url === 'string' ? url : url.toString()),
		pathname: location.pathname,
		searchParams: new URLSearchParams(location.search),
	}

	return (
		<AppProvider
			navigation={NAVIGATION}
			router={router}
			theme={demoTheme}
			branding={{
				logo: '',
				title: 'Qaraqalpaqstannıń Ekonomikalıq hám sociyallıq kórsetkishleri',
				homeUrl: RoutesConsts[RoutesEnums.HOME],
			}}
		>
			<DashboardLayout sidebarExpandedWidth={240}>
				<Box className='p-3'>
					<Outlet />
				</Box>
			</DashboardLayout>
		</AppProvider>
	)
}
