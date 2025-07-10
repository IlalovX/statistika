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
import { useGetEnterprises } from '../../../../hooks/useHome'

type CompanyData = {
	name: string
	total: number | null
	active: number | null
	new: number | null
}

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
	const { data } = useGetEnterprises()
	const theme = useTheme()
	const [selectedRange, setSelectedRange] = useState<string>('')

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const active = useMemo(() => data?.active ?? {}, [data])
	const total = useMemo(() => data?.total ?? {}, [data])
	const newlyCreated = useMemo(() => data?.new ?? {}, [data])

	const allYears = useMemo(() => {
		const years = new Set<string>([
			...Object.keys(active),
			...Object.keys(total),
			...Object.keys(newlyCreated),
		])
		return Array.from(years).sort()
	}, [active, total, newlyCreated])

	const yearChunks = useMemo(
		() => getYearRangesFromEnd(allYears, 5),
		[allYears]
	)

	const rangeLabels = useMemo(
		() => yearChunks.map(chunk => `${chunk[0]}–${chunk[chunk.length - 1]}`),
		[yearChunks]
	)

	useEffect(() => {
		if (rangeLabels.length && !selectedRange) {
			setSelectedRange(rangeLabels[rangeLabels.length - 1])
		}
	}, [rangeLabels, selectedRange])

	const selectedYears = useMemo(() => {
		const idx = rangeLabels.indexOf(selectedRange)
		return idx >= 0 ? yearChunks[idx] : []
	}, [rangeLabels, selectedRange, yearChunks])

	const chartData: CompanyData[] = useMemo(() => {
		return selectedYears.map(year => ({
			name: year,
			total: total[+year] ?? null,
			active: active[+year] ?? null,
			new: newlyCreated[+year] ?? null,
		}))
	}, [selectedYears, total, active, newlyCreated])

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5 flex flex-col justify-between'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<div className='flex justify-between items-center mb-2'>
				<Typography variant='body2' fontWeight='bold'>
					Предприятия и организации
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
						'& .MuiPaper-root': { bgcolor: theme.palette.background.default },
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

					<Tooltip<number, string>
						formatter={(value, name): [string, string] => {
							const nameMap: Record<string, string> = {
								total: 'Общий',
								active: 'Работают',
								new: 'Новые',
							}

							const formattedValue =
								typeof value === 'number' ? value.toLocaleString() : '—'

							return [formattedValue, nameMap[name] ?? name]
						}}
						contentStyle={{
							backgroundColor: theme.palette.background.paper,
							borderColor: theme.palette.divider,
							fontSize: 12,
						}}
					/>

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
