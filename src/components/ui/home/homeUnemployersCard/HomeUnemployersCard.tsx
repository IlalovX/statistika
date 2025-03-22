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
import { CustomizedAxisTick, CustomizedLabel } from '../../../ChartComponents'

function HomeUnemployersСard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState([210, 240, 230, 250])
	const xLabels = ['2020', '2021', '2022', '2023']
	const { data } = useQuery({
		queryKey: ['unemployees'],
		queryFn: async () => {
			const res = await fetch('/db/unemployers/unemployers.json')
			if (!res.ok) {
				throw new Error('Ошибка загрузки данных')
			}
			return res.json()
		},
	})

	useEffect(() => {
		if (data?.data?.[1]) {
			setChartData([
				data.data[1]['2020'],
				data.data[1]['2021'],
				data.data[1]['2022'],
				data.data[1]['2023'],
			])
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
				Безработные
			</Typography>
			<p className='text-gray-400'>{data?.data[1]['2023']} тыс человек</p>

			<ResponsiveContainer width='100%' height={120}>
				<LineChart
					data={xLabels.map((label, index) => ({
						name: label,
						безработные: chartData[index],
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
export default HomeUnemployersСard
