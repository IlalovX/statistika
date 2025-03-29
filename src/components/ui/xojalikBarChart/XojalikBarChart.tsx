import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Box,
	Button,
	Menu,
	MenuItem,
	Typography,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts'
import { monthsOfYear } from '../../../const/monthsOfYear'

const years = ['2022', '2023', '2024', '2025']
const data = monthsOfYear.map((item, index) => ({
	id: index,
	name: item,
	uv: Math.floor(Math.random() * 1000),
}))

function XojalikBarChart() {
	const theme = useTheme()
	const [year, setYear] = useState('2025')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (item: string) => {
		setYear(item)
		setAnchorEl(null)
	}

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div className='flex justify-between items-center pr-5'>
				<div className='flex gap-5'>
					<Typography variant='h6' className='text-[#355CBF]'>
						Экспорт
					</Typography>
					<Typography variant='h6' className='text-[#93A3AB]'>
						Внутренний рынок
					</Typography>
				</div>
				<div>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					>
						{year}
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={() => setAnchorEl(null)}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
						PaperProps={{
							sx: {
								backgroundColor: theme.palette.background.default,
								boxShadow: 3,
							},
						}}
					>
						{years.map(item => (
							<MenuItem onClick={() => handleClose(item)} key={item}>
								{item}
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>
			<ResponsiveContainer width='100%' height={300}>
				<BarChart
					data={data}
					barCategoryGap={'50%'}
					margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
				>
					<XAxis
						dataKey='name'
						scale='band'
						tick={{ dy: 5, textAnchor: 'middle' }}
						interval={0}
						textAnchor='middle'
					/>
					<YAxis />
					{/* <Bar dataKey='uv' label={{ position: 'top' }} barSize={40}> */}
					<Bar dataKey='uv' barSize={40}>
						{data.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill='#ff9800'
								radius={5}
								width={15}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default XojalikBarChart
