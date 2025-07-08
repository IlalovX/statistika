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
import { useEffect, useMemo, useState } from 'react'
import {
	Area,
	AreaChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from 'recharts'

type CompanyData = {
	name: string
	total: number
	active: number
	new: number
}

const mockData: CompanyData[] = [
	{ name: '2019', total: 22000, active: 18000, new: 3000 },
	{ name: '2020', total: 23000, active: 19000, new: 3200 },
	{ name: '2021', total: 21000, active: 17000, new: 2500 },
	{ name: '2022', total: 24000, active: 20000, new: 3300 },
	{ name: '2023', total: 26000, active: 21500, new: 3400 },
	{ name: '2024', total: 27000, active: 22500, new: 3500 },
	{ name: '2025', total: 25093, active: 21789, new: 3254 },
]

type YearRange = string

function getYearRangesFromEnd(years: string[], chunkSize = 5): string[][] {
	const sortedYears = [...years].sort()
	const result: string[][] = []

	for (let i = sortedYears.length; i > 0; i -= chunkSize) {
		const start = Math.max(i - chunkSize, 0)
		const chunk = sortedYears.slice(start, i)
		if (chunk.length > 1) {
			result.unshift(chunk)
		}
	}

	return result
}

function CompaniesCard() {
	const theme = useTheme()
	const [selectedRange, setSelectedRange] = useState<YearRange>('')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const allYears = mockData.map((item) => item.name)

	const { ranges } = useMemo(() => {
		const chunks = getYearRangesFromEnd(allYears, 5)
		const ranges = chunks.map(
			(chunk) => `${chunk[0]}–${chunk[chunk.length - 1]}`
		)
		return { ranges }
	}, [allYears])

	useEffect(() => {
		if (ranges.length > 0 && !selectedRange) {
			setSelectedRange(ranges[ranges.length - 1])
		}
	}, [ranges, selectedRange])

	const chartData = useMemo(() => {
		if (!selectedRange) return []
		const [start, end] = selectedRange.split('–')
		return mockData.filter((d) => d.name >= start && d.name <= end)
	}, [selectedRange])

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 flex flex-col justify-between'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center mb-2'>
				<Typography variant='h6' fontWeight='bold'>
					Предприятия и организации
				</Typography>

				<Button
					variant='outlined'
					onClick={(e) => setAnchorEl(e.currentTarget)}
					disableFocusRipple
					disableRipple
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{ border: 'none', padding: 0, textTransform: 'none' }}
					className='whitespace-nowrap'
				>
					{selectedRange}
				</Button>

				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
					sx={{
						'& .MuiPaper-root': { bgcolor: theme.palette.background.default },
					}}
				>
					{ranges.map((range) => (
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

			<ResponsiveContainer width='100%' height={260}>
				<AreaChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
				>
					<defs>
						<linearGradient id='totalGradient' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0.3' stopColor='#F3C500' stopOpacity={0.4} />
							<stop offset='1' stopColor='#ffffff' stopOpacity={0.01} />
						</linearGradient>
						<linearGradient id='activeGradient' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0.3' stopColor='#00BF63' stopOpacity={0.4} />
							<stop offset='1' stopColor='#ffffff' stopOpacity={0.01} />
						</linearGradient>
						<linearGradient id='newGradient' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0.3' stopColor='#0088FE' stopOpacity={0.4} />
							<stop offset='1' stopColor='#ffffff' stopOpacity={0.01} />
						</linearGradient>
					</defs>

					<XAxis dataKey='name' tickLine={false} axisLine={false} />

					<Tooltip formatter={(value: number) => value.toLocaleString()} />

					<Area
						type='monotone'
						dataKey='total'
						stroke='#F3C500'
						fill='url(#totalGradient)'
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
					<Area
						type='monotone'
						dataKey='active'
						stroke='#00BF63'
						fill='url(#activeGradient)'
						strokeWidth={2}
						dot={{ r: 3 }}
					/>
					<Area
						type='monotone'
						dataKey='new'
						stroke='#0088FE'
						fill='url(#newGradient)'
						strokeWidth={2}
						dot={{ r: 3 }}
					/>

					<Legend
						verticalAlign='bottom'
						align='center'
						wrapperStyle={{
							fontSize: 12,
							paddingTop: 10,
							paddingBottom: 10,
						}}
						formatter={(value: string) => {
							if (value === 'total') return 'Общий'
							if (value === 'active') return 'Работают'
							if (value === 'new') return 'Новые'
							return value
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default CompaniesCard
