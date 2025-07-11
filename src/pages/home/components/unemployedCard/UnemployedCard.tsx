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
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import {
	CustomizedAxisTick,
	CustomizedLabel,
} from '../../../../components/ui/ChartComponents'
import { useGetUnemployment } from '../../../../hooks/useHome'

function getYearRangesFromEnd(years: number[], chunkSize = 4): number[][] {
	const sortedYears = [...years].sort((a, b) => a - b)
	const result: number[][] = []

	for (let i = sortedYears.length; i > 0; i -= chunkSize) {
		const start = Math.max(i - chunkSize, 0)
		const chunk = sortedYears.slice(start, i)
		if (chunk.length > 1) {
			result.unshift(chunk)
		}
	}

	return result
}

function UnemployedCard() {
	const theme = useTheme()
	const { data } = useGetUnemployment()
	const values = useMemo(() => data?.values ?? {}, [data])

	const allYears = useMemo(
		() =>
			Object.keys(values)
				.map(Number)
				.sort((a, b) => a - b),
		[values]
	)

	const yearChunks = useMemo(
		() => getYearRangesFromEnd(allYears, 4),
		[allYears]
	)

	const rangeLabels = useMemo(
		() => yearChunks.map(chunk => `${chunk[0]}–${chunk.slice(-1)[0]}`),
		[yearChunks]
	)

	const [selectedRange, setSelectedRange] = useState<string>(
		rangeLabels.slice(-1)[0] || ''
	)

	useEffect(() => {
		if (rangeLabels.length && !selectedRange) {
			setSelectedRange(rangeLabels.slice(-1)[0])
		}
	}, [rangeLabels, selectedRange])

	const selectedYears = useMemo(() => {
		return (
			yearChunks.find(
				chunk => `${chunk[0]}–${chunk.slice(-1)[0]}` === selectedRange
			) ?? []
		)
	}, [selectedRange, yearChunks])

	const chartData = useMemo(
		() =>
			selectedYears.map(year => ({
				name: String(year),
				безработные: values[year] ?? null,
			})),
		[selectedYears, values]
	)

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
				<Typography variant='body2' fontWeight='bold'>
					Ишсизлар сони
				</Typography>

				<Button
					variant='outlined'
					onClick={e => setAnchorEl(e.currentTarget)}
					disableFocusRipple
					disableRipple
					sx={{
						border: 'none',
						padding: 0,
						textTransform: 'none',
						gap: 0,
						whiteSpace: 'nowrap',
					}}
				>
					<Box display='flex' alignItems='center' gap={0}>
						{selectedRange}
						{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</Box>
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
					{rangeLabels.map(range => (
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
					margin={{ top: 30, right: 30, left: -30, bottom: 10 }}
				>
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
						dataKey='безработные'
						stroke='#00BAD1'
						dot={{ r: 5 }}
						label={<CustomizedLabel />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default UnemployedCard
