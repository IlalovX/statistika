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
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const mockDataByYear: Record<string, any[]> = {
	'2020–2024': [
		{
			year: '2020',
			employable: 1000,
			workers: 750,
			selfEmployed: 250,
		},
		{
			year: '2021',
			employable: 1100,
			workers: 800,
			selfEmployed: 300,
		},
		{
			year: '2022',
			employable: 1200,
			workers: 850,
			selfEmployed: 350,
		},
		{
			year: '2023',
			employable: 1250,
			workers: 870,
			selfEmployed: 380,
		},
		{
			year: '2024',
			employable: 1300,
			workers: 900,
			selfEmployed: 400,
		},
	],
	'2015–2019': [
		{
			year: '2015',
			employable: 950,
			workers: 700,
			selfEmployed: 250,
		},
		{
			year: '2016',
			employable: 970,
			workers: 710,
			selfEmployed: 260,
		},
		{
			year: '2017',
			employable: 980,
			workers: 720,
			selfEmployed: 260,
		},
		{
			year: '2018',
			employable: 1000,
			workers: 740,
			selfEmployed: 260,
		},
		{
			year: '2019',
			employable: 1020,
			workers: 750,
			selfEmployed: 270,
		},
	],
}

function EmploymentCard() {
	const theme = useTheme()
	const [selectedRange, setSelectedRange] = useState('2020–2024')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const open = Boolean(anchorEl)
	const chartData = mockDataByYear[selectedRange] || []

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between mb-2'>
				<Typography variant='body2' fontWeight='bold'>
					Бандлик тузилиши
				</Typography>

				<Button
					variant='outlined'
					onClick={e => setAnchorEl(e.currentTarget)}
					disableRipple
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{ border: 'none', padding: 0, textTransform: 'none' }}
				>
					{selectedRange}
				</Button>

				<Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
					{Object.keys(mockDataByYear).map(range => (
						<MenuItem
							key={range}
							selected={range === selectedRange}
							onClick={() => {
								setSelectedRange(range)
								setAnchorEl(null)
							}}
						>
							{range}
						</MenuItem>
					))}
				</Menu>
			</div>

			<ResponsiveContainer width='100%' height={128}>
				<BarChart data={chartData} barCategoryGap='20%' margin={{ bottom: 40 }}>
					<XAxis dataKey='year' axisLine={false} tickLine={false} />
					<YAxis hide />
					<Tooltip
						formatter={(value: number) => `${value.toLocaleString()} тыс.`}
						contentStyle={{
							backgroundColor: theme.palette.background.paper,
							borderColor: theme.palette.divider,
							fontSize: 12,
						}}
					/>
					<Legend
						verticalAlign='bottom'
						align='center'
						iconType='circle'
						wrapperStyle={{ fontSize: 12 }}
					/>
					<Bar dataKey='employable' name='Мийнетке жарамлы' fill='#2196F3' />
					<Bar dataKey='workers' name='Жумыс ислеушилер' fill='#00C49F' />
					<Bar dataKey='selfEmployed' name='Самозанятость' fill='#FFBB28' />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default EmploymentCard
