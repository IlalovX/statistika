import { Box, Chip } from '@mui/material'
import type { Router } from '@toolpad/core/AppProvider'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { NAVIGATION } from '../const/layoutNav'
import { demoTheme } from '../const/layoutTheme'
import { RoutesConsts } from '../const/routes'
import { RoutesEnums } from '../enums/routes'
import { useAppSelector } from '../utils/helpers'

export default function DashboardLayoutAccount() {
	const location = useLocation()
	const navigate = useNavigate()
	const projectCount = useAppSelector(state => state.projects.count)

	const enhancedNav = NAVIGATION.map(item =>
		item.kind === 'page'
			? {
					...item,
					action: <Chip label={projectCount} color='primary' size='small' />,
				}
			: item
	)

	const router: Router = {
		navigate: url => navigate(typeof url === 'string' ? url : url.toString()),
		pathname: location.pathname,
		searchParams: new URLSearchParams(location.search),
	}

	return (
		<AppProvider
			navigation={enhancedNav}
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
