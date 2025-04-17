import { Box, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { CustomizedAxisTick, CustomizedLabel } from '../../ChartComponents'

function HomePopulationCard() {
	// const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	// const years = [2025, 2024, 2023]
	// const [selectedYear, setSelectedYear] = useState(years[0])
	// const open = Boolean(anchorEl)

	// const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	setAnchorEl(event.currentTarget)
	// }

	// const handleClose = (year?: number) => {
	// 	if (year) setSelectedYear(year)
	// 	setAnchorEl(null)
	// }

	const theme = useTheme()
	const [chartData, setChartData] = useState<number[]>([])

	const [xLabels, setXLabels] = useState<string[]>([])

	const { data } = useQuery({
		queryKey: ['population'],
		queryFn: async () => {
			const res = await fetch('/db/population/population.json')
			if (!res.ok) throw new Error('Ошибка загрузки данных')
			return res.json()
		},
	})

	useEffect(() => {
		if (data && data['Qaraqalpaqstan Respublikası']) {
			const populationData = data['Qaraqalpaqstan Respublikası']

			const keys = Object.keys(populationData).sort()
			setXLabels(keys.slice(-4))
			const validData = keys
				.slice(-4)
				.map(year => {
					const rawValue = populationData[year]
						?.replace(/\s/g, '')
						.replace(',', '.')
					return rawValue ? Number(rawValue) : 0
				})
				.filter(value => value > 0)

			setChartData(validData)
		}
	}, [data])

	return (
		<Box
			className='shadow-xl rounded-2xl p-1.5'
			sx={{
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<Typography variant='h6' fontWeight='bold'>
				Население
			</Typography>
			{/* <div>
				<Button
					disableFocusRipple
					disableRipple
					variant='outlined'
					onClick={handleClick}
					endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					sx={{
						border: 'none',
						color: '#8D8A94',
						padding: '0',
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
					{years.map(year => (
						<MenuItem key={year} onClick={() => handleClose(year)}>
							{year}
						</MenuItem>
					))}
				</Menu>
			</div> */}
			<ResponsiveContainer width='100%' height={130}>
				<LineChart
					data={xLabels.map((label, index) => ({
						name: label,
						население: chartData[index],
					}))}
					margin={{ top: 30, right: 55, left: 0, bottom: 10 }}
				>
					<Tooltip
						contentStyle={{
							backgroundColor: theme.palette.background.default,
							borderColor: theme.palette.divider,
							color: theme.palette.text.primary,
						}}
						formatter={value => `${value} тыс.`}
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
