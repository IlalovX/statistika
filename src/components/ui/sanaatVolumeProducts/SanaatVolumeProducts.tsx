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
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import ModalVolumeProducts from '../modalVolumeProducts/ModalVolumeProducts'

const data = [
	{ name: 'Segment 1', value: 25, color: '#1A237E' },
	{ name: 'Segment 2', value: 10, color: '#E57373' },
	{ name: 'Segment 3', value: 35, color: '#1E88E5' },
	{ name: 'Segment 4', value: 10, color: '#8E244D' },
	{ name: 'Segment 5', value: 10, color: '#388E3C' },
	{ name: 'Segment 6', value: 50, color: '#E0E0E0' },
]
const industries = [
	{
		name: 'Горнодобывающая промышленность и разработка карьеров',
		value: '$ 2 млн',
		change: '+0.24%',
	},
	{
		name: 'Производственная промышленность',
		value: '$ 2 млн',
		change: '+0.24%',
	},
	{
		name: 'Производство продуктов питания',
		value: '$ 2 млн',
		change: '+0.24%',
	},
	{
		name: 'Производство напитков',
		value: '$ 2 млн',
		change: '+0.24%',
	},
]
const SanaatVolumeProducts = () => {
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

	const theme = useTheme()
	return (
		<Box
			className='shadow-xl rounded-2xl  my-5 grid grid-cols-2 grid-rows-1 p-5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Box position='relative' width={300} height={300} className='m-auto'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							data={data}
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={80}
							paddingAngle={3}
							dataKey='value'
							startAngle={90}
							endAngle={-270}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>

				<Box
					position='absolute'
					top='50%'
					left='50%'
					sx={{ transform: 'translate(-50%, -50%)' }}
					textAlign='center'
				>
					<Typography variant='h6' fontWeight='bold'>
						$10
					</Typography>
					<Typography variant='body2' fontWeight='bold'>
						МЛН
					</Typography>
				</Box>
			</Box>
			<Box>
				<div className='flex items-center justify-end'>
					<Button
						disableFocusRipple
						disableRipple
						variant='outlined'
						onClick={handleClick}
						endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
						sx={{
							bgcolor: '#A9E9C5',
							color: theme.palette.mode === 'light' ? '#355CBF' : 'white',
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
				</div>
				<List>
					{industries.map((item, index) => (
						<ListItem
							key={index}
							sx={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<ListItemText primary={item.name} />
							<Box display='flex' alignItems='center'>
								<Typography fontWeight='bold'>{item.value}</Typography>
								<Typography fontSize={14} color='green' ml={1}>
									{item.change}
								</Typography>
							</Box>
						</ListItem>
					))}
				</List>
				<ModalVolumeProducts />
			</Box>
		</Box>
	)
}

export default SanaatVolumeProducts
