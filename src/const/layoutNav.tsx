import { Construction, CreditCard, Domain, Home } from '@mui/icons-material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import { type Navigation } from '@toolpad/core/AppProvider'
export const NAVIGATION: Navigation = [
	{
		segment: '',
		title: 'Главная',
		icon: <Home />,
	},
	{
		segment: 'tourism',
		title: 'Туризм',
		icon: <Domain />,
	},
	{
		segment: 'sanaat',
		title: 'Санаат',
		icon: <Construction />,
	},
	{
		segment: 'xojalik',
		title: 'Ауыл-хожалық',
		icon: <CreditCard />,
	},
	{
		segment: 'projects',
		title: 'Проекты',
		icon: <DashboardIcon />,
	},
]

export const ADMIN_NAVIGATION: Navigation = [
	{
		segment: 'admin',
		title: 'Админ-панель',
		icon: <AdminPanelSettingsIcon />,
	},
	{
		segment: 'admin/settings',
		title: 'Настройки',
		icon: <SettingsIcon />,
	},
	{
		segment: 'admin/projects',
		title: 'Проекты',
		icon: <DashboardIcon />,
	},
]
