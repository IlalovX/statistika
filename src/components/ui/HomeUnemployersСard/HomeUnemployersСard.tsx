import { Box, Typography, useTheme } from '@mui/material'
import {
	ChartsTooltip,
	ChartsXAxis,
	LinePlot,
	MarkPlot,
	ResponsiveChartContainer,
} from '@mui/x-charts'
import { ChartsXReferenceLine } from '@mui/x-charts/ChartsReferenceLine/ChartsXReferenceLine'
import { ChartsYReferenceLine } from '@mui/x-charts/ChartsReferenceLine/ChartsYReferenceLine'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'

export default function HomeUnemployersCard() {
	const theme = useTheme()
	const [chartData, setChartData] = useState([190, 220, 210, 240, 230, 250])
	const xLabels = ['2018', '2019', '2020', '2021', '2022', '2023']
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
				data.data[1]['2018'],
				data.data[1]['2019'],
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
			{/* <Stack direction='row' sx={{ width: '100%', height: '77px' }}>
				<Box sx={{ flexGrow: 1 }}>
					<SparkLineChart
						data={chartData}
						height={77}
						showHighlight
						showTooltip
						valueFormatter={value => `${value} тыс`}
					/>
				</Box>
			</Stack>
			<div className='flex items-center justify-between text-gray-400 gap-1 text-sm'>
				<span>2020</span>
				<span>2021</span>
				<span>2022</span>
				<span>2023</span>
			</div> */}
			<ResponsiveChartContainer
				height={160}
				series={[
					{
						type: 'line',
						data: chartData,
					},
				]}
				xAxis={[
					{
						data: xLabels,
						scaleType: 'point',
						id: 'x-axis-id',
					},
				]}
				yAxis={[
					{
						id: 'y-axis-id',
						scaleType: 'linear',
					},
				]}
				sx={{
					'.MuiChartsAxis-line': {
						display: 'none',
					},
					'.MuiChartsAxis-tick': {
						display: 'none',
					},
				}}
			>
				<LinePlot />
				{/* {chartData.map((point, index) => (
					<Fragment key={index}>
						<ChartsYReferenceLine
							y={point}
							label={`${point}`}
							lineStyle={{ display: 'none' }}
							labelStyle={{ display: 'flex ' }}
						/>
						<ChartsXReferenceLine
							x={xLabels[index]}
							lineStyle={{ strokeDasharray: '10 5' }}
						/>
					</Fragment>
				))} */}

				<MarkPlot />
				<ChartsTooltip />
				<ChartsXAxis position='bottom' axisId='x-axis-id' />
			</ResponsiveChartContainer>
		</Box>
	)
}
