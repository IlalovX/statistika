import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import YearDropdown from '../../YearDropdown'
import ModalProjectsTable from '../modalProjectsTable/ModalProjectsTable'

const institutions = [
	{ id: 1, name: 'IT компании', icon: '💻' },
	{ id: 2, name: 'Гос учреждения', icon: '🏛️' },
	{ id: 3, name: 'Банк', icon: '🏦' },
	{ id: 4, name: 'Частные компании', icon: '👔' },
	{ id: 5, name: 'Больницы', icon: '🏥' },
	{ id: 6, name: 'Клиники', icon: '🩺' },
	{ id: 7, name: 'Фермы', icon: '🚜' },
]

const professions = [
	{ id: 1, name: 'Разработчик', icon: '👨‍💻' },
	{ id: 2, name: 'Отдел кадров', icon: '🧑‍💼' },
	{ id: 3, name: 'Охранник', icon: '🛡️' },
	{ id: 4, name: 'Бизнес аналитик', icon: '📊' },
	{ id: 5, name: 'Врач', icon: '🩺' },
	{ id: 6, name: 'Медсестра', icon: '👩‍⚕️' },
	{ id: 7, name: 'Фермер', icon: '👨‍🌾' },
]
function SanaatJobsCreatedCard() {
	const theme = useTheme()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [selectedYear, setSelectedYear] = useState(2025)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (year?: number) => {
		if (year) setSelectedYear(year)
		setAnchorEl(null)
	}

	const isDarkMode = theme.palette.mode === 'dark'
	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<header className='flex justify-between items-center px-4'>
				<div>
					<Typography variant='h6' fontWeight='bold'>
						Сумма инвестиции
					</Typography>
					<YearDropdown />
				</div>
				<Button
					disableFocusRipple
					disableRipple
					variant='outlined'
					onClick={handleClick}
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{
						bgcolor: '#A9E9C5',
						color: theme.palette.mode === 'light' ? 'black' : 'white',
						border: 'black',
					}}
				>
					<span className='lowercase mr-1'>за</span> {selectedYear}
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={() => handleClose()}
					sx={{
						'& .MuiPaper-root': {
							bgcolor: theme.palette.background.paper,
						},
					}}
				>
					<MenuItem key={2025} onClick={() => handleClose(2025)}>
						2025
					</MenuItem>
					<MenuItem key={2024} onClick={() => handleClose(2024)}>
						2024
					</MenuItem>
					<MenuItem key={2023} onClick={() => handleClose(2023)}>
						2023
					</MenuItem>
				</Menu>
			</header>
			<div className='grid grid-cols-[30%_70%] grid-rows-[400px]'>
				<div className='flex items-center justify-center '>
					<div className='relative w-50 h-50 flex items-center justify-center'>
						<div className='absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 rounded-full p-4'>
							<div
								className='w-full h-full rounded-full flex flex-col items-center justify-center'
								style={{
									backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
									color: isDarkMode ? '#fff' : '#000',
								}}
							>
								<Typography variant='h5' fontWeight='bold'>
									0
								</Typography>
								<span className='text-green-500 text-xs'>Всего</span>
							</div>
						</div>
					</div>
				</div>
				<Box display='flex' justifyContent='space-between' gap={5}>
					<List sx={{ width: '50%' }}>
						<Typography variant='h6' textAlign='center'>
							Учреждения
						</Typography>
						{institutions.map(item => (
							<ListItem
								key={item.id}
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<ListItemText primary={`${item.icon} ${item.name}`} />
								<span className='font-bold'>{item.id}</span>
							</ListItem>
						))}
					</List>

					<List sx={{ width: '50%' }}>
						<Typography variant='h6' textAlign='center'>
							Профессии
						</Typography>
						{professions.map(item => (
							<ListItem
								key={item.id}
								sx={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<ListItemText primary={`${item.icon} ${item.name}`} />
								<span className='font-bold'>{item.id}</span>
							</ListItem>
						))}
					</List>
				</Box>
			</div>
			<div className='flex justify-end items-center'>
				<ModalProjectsTable />
			</div>
		</Box>
	)
}

export default SanaatJobsCreatedCard
