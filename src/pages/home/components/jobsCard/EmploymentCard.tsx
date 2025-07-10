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
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { useGetWorkingDetail } from '../../../../hooks/useHome'

// 🔧 Разделить массив по n элементов, начиная с конца
function chunkArrayFromEnd<T>(arr: T[], size: number): T[][] {
	const sorted = [...arr].sort((a, b) => +a - +b)
	const result: T[][] = []

	let i = sorted.length
	while (i > 0) {
		const start = Math.max(i - size, 0)
		result.unshift(sorted.slice(start, i))
		i = start
	}

	return result
}

function EmploymentCard() {
	const theme = useTheme()
	const { data } = useGetWorkingDetail()

	const employmentValues = useMemo(
		() => data?.employment?.data?.values ?? {},
		[data]
	)

	const workingAgeValues = useMemo(
		() => data?.working_age_population?.data?.values ?? {},
		[data]
	)

	const allYears = useMemo(() => {
		const years = new Set<number>([
			...Object.keys(employmentValues).map(Number),
			...Object.keys(workingAgeValues).map(Number),
		])
		return Array.from(years).sort((a, b) => a - b)
	}, [employmentValues, workingAgeValues])

	const yearRanges = useMemo(() => chunkArrayFromEnd(allYears, 5), [allYears])

	const rangeLabels = useMemo(
		() => yearRanges.map(range => `${range[0]}–${range[range.length - 1]}`),
		[yearRanges]
	)

	const [selectedRange, setSelectedRange] = useState<string>('')

	useEffect(() => {
		if (!selectedRange && rangeLabels.length > 0) {
			setSelectedRange(rangeLabels[rangeLabels.length - 1])
		}
	}, [rangeLabels, selectedRange])

	const selectedYears = useMemo(() => {
		const idx = rangeLabels.indexOf(selectedRange)
		return idx >= 0 ? yearRanges[idx] : []
	}, [selectedRange, rangeLabels, yearRanges])

	const chartData = useMemo(() => {
		return selectedYears.map(year => ({
			year: String(year),
			employable: employmentValues[year] ?? null,
			workers: workingAgeValues[year] ?? null,
			selfEmployed: 0,
		}))
	}, [selectedYears, employmentValues, workingAgeValues])

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 flex flex-col justify-between'
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

			<ResponsiveContainer width='100%' height={160}>
				<BarChart data={chartData} barCategoryGap='20%' margin={{ bottom: 40 }}>
					<XAxis dataKey='year' axisLine={false} tickLine={false} />
					<YAxis hide />
					<Tooltip
						formatter={(value: number) =>
							value !== null ? `${value.toLocaleString()} тыс.` : '—'
						}
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
