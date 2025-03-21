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
import YearDropdown from '../../YearDropdown'

function HomePopulationCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState<number[]>([])
	const [xLabels, setXLabels] = useState<string[]>([
		'2022',
		'2023',
		'2024',
		'2025',
	])

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
				.slice(-6)
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
			<YearDropdown />
			<ResponsiveContainer width='100%' height={120}>
				<LineChart
					data={xLabels.map((label, index) => ({
						name: label,
						население: chartData[index],
					}))}
					margin={{ top: 20, right: 55, left: 0, bottom: 20 }}
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
