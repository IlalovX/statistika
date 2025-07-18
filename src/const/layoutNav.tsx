import { Construction, CreditCard, Domain, Home } from '@mui/icons-material'
import DashboardIcon from '@mui/icons-material/Dashboard'
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
