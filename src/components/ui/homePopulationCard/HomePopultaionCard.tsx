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
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useRegionPopulationStat } from '../../../hooks/useStat'
import { CustomizedAxisTick, CustomizedLabel } from '../../ChartComponents'

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

function HomePopulationCard() {
	const theme = useTheme()
	const { yearMap, years } = useRegionPopulationStat(
		'Qoraqalpog‘iston Respublikasi'
	)
	const [selectedRange, setSelectedRange] = useState<string>('')

	const { ranges } = useMemo(() => {
		const chunks = getYearRangesFromEnd(years, 5)
		const ranges = chunks.map(
			(chunk) => `${chunk[0]}–${chunk[chunk.length - 1]}`
		)
		return { ranges }
	}, [years])

	useEffect(() => {
		if (ranges.length > 0 && !selectedRange) {
			setSelectedRange(ranges[ranges.length - 1])
		}
	}, [ranges, selectedRange])

	const chartData = useMemo(() => {
		if (!selectedRange) return []
		const [start, end] = selectedRange.split('–')
		const selectedYears = years.filter((y) => y >= start && y <= end)
		return selectedYears.map((year) => ({
			name: year,
			население: yearMap[year],
		}))
	}, [selectedRange, yearMap, years])

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center mb-2'>
				<Typography variant='h6' fontWeight='bold'>
					Аҳоли сони ўсиши
				</Typography>
				<Button
					variant='outlined'
					onClick={(e) => setAnchorEl(e.currentTarget)}
					disableFocusRipple
					disableRipple
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{ border: 'none', padding: 0, textTransform: 'none' }}
				>
					{selectedRange}
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
					sx={{
						'& .MuiPaper-root': {
							bgcolor: theme.palette.background.default,
						},
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

			<ResponsiveContainer width='100%' height={130}>
				<LineChart
					data={chartData}
					margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
				>
					<Tooltip
						contentStyle={{
							backgroundColor: theme.palette.background.default,
							borderColor: theme.palette.divider,
							color: theme.palette.text.primary,
						}}
						formatter={(value) => `${value} тыс.`}
						labelStyle={{ color: theme.palette.text.secondary }}
					/>
					<XAxis
						dataKey='name'
						tick={<CustomizedAxisTick />}
						type='category'
						axisLine={false}
						tickLine={false}
						interval={0}
					/>
					<YAxis
						type='number'
						domain={['auto', 'dataMax']}
						axisLine={false}
						tickLine={false}
						tick={false}
					/>
					<Line
						strokeWidth={4}
						type='monotone'
						dataKey='население'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={<CustomizedLabel />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default HomePopulationCard
